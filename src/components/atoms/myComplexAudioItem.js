import React, { Component } from 'react';

import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

import { CONSTANTS } from '_styles';

import {default as Player} from './myPlayer';


class myComplexAudioItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item
        }
    }

    render = () => (
        <View style={styles.item}>
            <View style={styles.info}>
                <Text style={styles.name}>{this.state.item.name}</Text>
                <Text style={styles.date}>
                    {this.state.item.ctime}
                </Text>
            </View>
            <Player item={this.state.item} stream={false}/>
        </View>
    )
    
}



const styles = StyleSheet.create({
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


  export default myComplexAudioItem;
  





