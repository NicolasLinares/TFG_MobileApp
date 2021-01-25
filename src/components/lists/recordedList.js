/**
* @fileoverview Lista de notas de audio grabadas recientemente y pendientes de ser registradas en el servidor
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react'
import { Alert, StyleSheet } from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import { RecordedItem, HiddenButtons } from '_listsItems';

import { DIMENSIONS } from '_styles';

import { connect } from 'react-redux';
import { deleteAudio } from '_redux_actions';

import * as FS from '_constants';
import { storageService } from '_services';


class RecordedList extends Component {


    _renderItem = data => (
        <RecordedItem item={data.item} />
    )

    closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    deleteRow = async (rowMap, item) => {
        await this.handleAudioDelete(item, rowMap);
    };

    _renderHiddenButtons = (data, rowMap) => (
        <HiddenButtons
            buttonWidth={85}
            onPressDelete={() => this.deleteRow(rowMap, data.item)}
        />
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
						let localpath = FS.DIRECTORY + '/' + item.uname;

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
            renderHiddenItem={this._renderHiddenButtons}
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
        paddingHorizontal: DIMENSIONS.marginHorizontalItemList,
        marginVertical: DIMENSIONS.marginVerticalItemList,
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

export default connect(mapStateToProps, mapDispatchToProps)(RecordedList);