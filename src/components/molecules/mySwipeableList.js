import React, { Component } from 'react'
import { 
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

import { Player } from '_atoms';
import SwipeableFlatList from 'react-native-swipeable-list';
import IconII from "react-native-vector-icons/Ionicons";
import {COLORS, CONSTANTS} from '_styles';


class swipeableList extends Component {

    _renderItem =  ({ item }) => (
        <View style={styles.item}>
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.date}>
                    {item.creation_time}
                </Text>
            </View>

            <Player item={item} stream={false}/>

        </View>
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
    item: {
        backgroundColor: 'white',
        height: 85,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        marginHorizontal: CONSTANTS.marginHorizontalItemList,
        marginVertical: CONSTANTS.marginVerticalItemList,
    },
    info: {
        flexDirection: 'row',
        height: 30,
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: 'white',
        marginBottom: 5,
        marginHorizontal: 20,
    },
    name: {
        fontSize: 14
    },
    date: {
        fontSize: 14
    },
});


export default swipeableList;
