import React, { Component } from 'react'
import { 
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';

import {COLORS, CONSTANTS} from '_styles';


class filterList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [
                {key: '0', filter: '12345'},
                {key: '1', filter: 'Planta2Hab14'},
                {key: '2', filter: 'PepePlanta3'},
                {key: '3', filter: 'AntonioRadiología'},
                {key: '4', filter: 'Planta1Hab6'},
                {key: '5', filter: '123'},
            ]
        }
    }

    _renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item}>
            <Text style={styles.name}> {item.filter}</Text>
        </TouchableOpacity>
    )


    render() {
        return (
            <View style={{height: 50}}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.audiolist}
                    contentContainerStyle={{ paddingRight: 60}}
                    keyExtractor={(item) => item.key}
                    data={this.state.list}  
                    extraData={this.state}
                    renderItem={this._renderItem}
                />
            </View>

        )
    }
}


const styles = StyleSheet.create({
    audiolist:{
        width:"100%",
        height: 50,
        paddingVertical: 10,
        paddingHorizontal: 30,

    },
    item: {
        backgroundColor: COLORS.light_green,
        height: 30,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        borderRadius: 10,
        marginHorizontal: 5,
    },
    name: {
        textAlign: 'center',
        fontSize: 14,
        marginHorizontal: 10,
        marginRight: 15,
    }
});


export default filterList;
