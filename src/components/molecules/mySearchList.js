import React, { Component } from 'react'
import { 
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

import IconII from "react-native-vector-icons/Ionicons";
import {CONSTANTS} from '_styles';

import {SimpleAudioItem} from '_atoms';

class mySearchList extends Component {

    constructor(props) {
        super(props);
    }

    _renderItem = data => {
        return (
            <SimpleAudioItem item={data.item} nav={this.props.nav} />
        );
    }

    closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    deleteRow = async (rowMap, item) => {
        await this.props.handleAudioDelete(item, () => this.closeRow(rowMap, item.uid));
    };

    _renderHideButtons = (data, rowMap) => {
        return (
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => this.deleteRow(rowMap, data.item)}
            >
                <IconII name={"trash"} size={25} color='white' />
            </TouchableOpacity>
        );
    }

    render =() => (

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
