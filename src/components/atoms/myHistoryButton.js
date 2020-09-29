import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';

import IconII from 'react-native-vector-icons/Ionicons';
import { COLORS } from '_styles';



class myHistoryButton extends Component {

    render() {
        return (
            <TouchableOpacity
                style={this.props.style}
                onPress={this.props.onPress} 
            >
                <View style={styles.card}>
                    <IconII  style={styles.icon} name={this.props.icon} color={'white'}/>
                    <Text style={styles.text}>{this.props.text}</Text>
                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    card: {
        flexDirection:'row',
        height: 40,
        borderRadius: 30,
        backgroundColor: COLORS.electric_blue,
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowRadius: 5,
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5, // Android solo funciona con elevation
    },
    text: {
        fontSize: 20, 
        marginRight: 20, 
        color: 'white'
    },
    icon: {
        marginLeft: 20,
        marginRight: 20, 
        fontSize: 20
    }
});

export default myHistoryButton;