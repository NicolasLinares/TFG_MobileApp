import React, { Component } from 'react'
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import { ComplexAudioItem, AnimatedItem } from '_atoms';

import IconII from "react-native-vector-icons/Ionicons";
import { CONSTANTS } from '_styles';


import { connect } from 'react-redux';
import { deleteAudio } from '_redux_actions';

import * as FS from '_constants';
import { storageService } from '_services';


class recordedList extends Component {


    _renderItem = data => (
        <ComplexAudioItem item={data.item} />
    )

    closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    deleteRow = async (rowMap, item) => {
        await this.handleAudioDelete(item, rowMap);
    };

    _renderHideButtons = (data, rowMap) => (

        <AnimatedItem style={styles.actionsContainer}>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => this.deleteRow(rowMap, data.item)}
            >
                <IconII name={"trash"} size={25} color='white' />
            </TouchableOpacity>
        </AnimatedItem>
    )

	handleAudioDelete = (item, rowMap) => {
		Alert.alert(
			'Eliminar nota de voz',
			'La nota de voz "' + item.name + '.' + item.extension + '" se va a eliminar de forma permanente',
			[
				{
					text: 'Cancelar',
					style: 'cancel',
					onPress: () => this.closeRow(rowMap, item.key)
				},
				{
					text: 'Eliminar',
					onPress: () => {

						// Se borra en el filesystem porque el recorder
						// crea un fichero por cada grabación
						let localpath = FS.DIRECTORY + '/' + item.localpath;

						storageService.deleteFile(localpath);
						this.props.delete(item.key);
					}
				}
			]
		);
	}

	render() {
		return (
			<SwipeListView
            overScrollMode={"never"}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            data={this.props.list.slice().reverse()}
            keyExtractor={(item) => item.key.toString()}
            style={styles.audiolist}
            renderItem={this._renderItem}
            renderHiddenItem={this._renderHideButtons}
            rightOpenValue={-85}
            disableRightSwipe={true}
            closeOnScroll={true}
            previewOpenValue={-40}
            previewOpenDelay={3000}
        />
		)
	}
}

const styles = StyleSheet.create({
    audiolist: {
        width: "100%",
        paddingTop: 10,
    },
    actionsContainer: {
        height: 85,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: CONSTANTS.marginHorizontalItemList,
        marginVertical: CONSTANTS.marginVerticalItemList,
    },
    descriptionButton: {
        height: 85,
        width: 85,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(150,220,150)',
        borderRadius: 10,
    },
    deleteButton: {
        height: 85,
        width: 85,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 10,
    },
});

const mapStateToProps = (state) => {
	return {
		list: state.audioListReducer.audiolist,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		delete: (key) => dispatch(deleteAudio(key)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(recordedList);