import React, { Component } from 'react'
import { 
    StyleSheet, 
    View,
    TouchableOpacity
} from 'react-native';

import { PlayerItem } from '_atoms';
import SwipeableFlatList from 'react-native-swipeable-list';
import IconII from "react-native-vector-icons/Ionicons";
import {CONSTANTS} from '_styles';


class swipeableList extends Component {

    _renderItem = ({ item }) => (
        <PlayerItem item={item}/>
    )

    _renderQuickActions = ({ item }) => {
        return (
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => this.props.onPress(item)}
            >
                <IconII style={{marginRight: 30}} name={"trash"} size={25} color='white'/>
            </TouchableOpacity>
          </View>
        );
    }

    render() {
        return (

            <SwipeableFlatList
                contentContainerStyle={{ paddingBottom: 20}}
                style={styles.audiolist}
                keyExtractor={(item) => item.key.toString()}
                data={this.props.list}  
                maxSwipeDistance={80}
                renderItem={this._renderItem}
                renderQuickActions={this._renderQuickActions}
            />
        )
    }
}


const styles = StyleSheet.create({
    audiolist:{
      width:"100%",
      backgroundColor: 'transparent',
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
        width: '85%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 10,
    },
});


export default swipeableList;
