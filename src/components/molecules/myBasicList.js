import React, { Component } from 'react'
import { 
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';

import IconII from "react-native-vector-icons/Ionicons";
import {CONSTANTS} from '_styles';

import {ComplexAudioItem} from '_atoms';


class myBasicList extends Component {

    _renderItem = data => (
        <ComplexAudioItem item={data.item} />
    )

    _renderHideButtons = (data, rowMap) => (
        <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => this.props.onPress(data.item)}
        >
            <IconII name={"trash"} size={25} color='white'/>
        </TouchableOpacity>
    )

    render =() => (
        <SwipeListView
            contentContainerStyle={{ paddingBottom: 20}}
            showsVerticalScrollIndicator={false}
            data={this.props.list.reverse()}  
            keyExtractor={(item) => item.key.toString()}
            style={styles.audiolist}
            renderItem={this._renderItem}
            renderHiddenItem={this._renderHideButtons}
            rightOpenValue={-80}
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: CONSTANTS.marginHorizontalItemList,
        marginVertical: CONSTANTS.marginVerticalItemList
    },
    deleteButton: {
        width: 80,
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


export default myBasicList;
