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
import { COLORS } from '_styles';

class myBasicList extends Component {

    constructor(props) {
        super(props);
    }

    _renderItem = data => (
        <ComplexAudioItem item={data.item}/>
    )

    _renderHideButtons = (data, rowMap) => (
        
        <View style={styles.actionsContainer}>
            <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => this.props.onPress(data.item)}
            >
                <IconII name={"trash"} size={25} color='white'/>
            </TouchableOpacity>
        </View>
    )

    render =() => (

        <SwipeListView
            overScrollMode={"never"}
            contentContainerStyle={{ paddingBottom: 20}}
            showsVerticalScrollIndicator={false}
            data={this.props.list}  
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


const styles = StyleSheet.create({
    audiolist: {
      width:"100%",
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


export default myBasicList;
