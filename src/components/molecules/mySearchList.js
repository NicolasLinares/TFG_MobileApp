import React, { Component } from 'react'
import { 
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import AlertAsync from "react-native-alert-async";

import { SwipeListView } from 'react-native-swipe-list-view';

import IconII from "react-native-vector-icons/Ionicons";
import {CONSTANTS} from '_styles';

import {SimpleAudioItem} from '_atoms';

class mySearchList extends Component {

    constructor(props) {
        super(props);
    }

    _renderItem = (data, rowMap) => {
        return (
            <SimpleAudioItem 
                item={data.item} 
                handleAudioDelete={() => this.handleDeleteRow(rowMap, data.item)} 
                nav={this.props.nav}     
            />
        );
    }

    closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    handleDeleteRow = async (rowMap, item) => {

        return await AlertAsync(
            'Eliminar nota de voz',
            'La nota de voz "' + item.localpath + '" y su transcripción se van a eliminar de forma permanente',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                    onPress: () => {
                        this.closeRow(rowMap, item.uid);
                        return Promise.resolve(false);
                    } 
                },
                {
                    text: 'Eliminar',
                    onPress:  () => {
                        this.props.handleAudioDelete(item);
                        return Promise.resolve(true);
                    },
                },
            ],
        );
    } 

    _renderHideButtons = (data, rowMap) => {
        return (
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => this.handleDeleteRow(rowMap, data.item)}
            >
                <IconII name={"trash"} size={25} color='white' />
            </TouchableOpacity>
        );
    }

    render = () => (

        <SwipeListView
            overScrollMode={"never"}
            contentContainerStyle={{ paddingBottom: 20}}
            showsVerticalScrollIndicator={false}
            data={this.props.list}  
            keyExtractor={(item) => item.uid}
            style={styles.audiolist}
            renderItem={this._renderItem}
            renderHiddenItem={this._renderHideButtons}
            rightOpenValue={-65}
            disableRightSwipe={true}
            closeOnScroll={true}
            previewOpenValue={-40}
            previewOpenDelay={3000}
        />
    )
    
}


const styles = StyleSheet.create({
    audiolist: {
      width:"100%",
      paddingTop: 10,
    },
    actionsContainer: {
        height: 60,
        width: '100%',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: CONSTANTS.marginHorizontalItemList, 
        marginVertical: CONSTANTS.marginVerticalItemList,
    },
    deleteButton: {
        width: 65,
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 10,
        marginRight: CONSTANTS.marginHorizontalItemList,
        marginVertical: CONSTANTS.marginVerticalItemList
    },
});


export default mySearchList;
