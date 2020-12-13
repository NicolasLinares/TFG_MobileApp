import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';

import IconII from 'react-native-vector-icons/Ionicons';
import { COLORS } from '_styles';



class myCancelButton extends Component {

    render() {
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={this.props.onPress} 
            >
                    <IconII style={styles.icon} name={"chevron-back"}/>
                    <Text style={styles.text}>Cancelar</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        left: 60,
        bottom: 90,
        flexDirection:'row',
        height: 35,
        borderRadius: 30,
        backgroundColor: 'rgba(100,100,100,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5, // Android solo funciona con elevation
    },
    text: {
        fontSize: 20,
        marginLeft: 5, 
        marginRight: 15, 
        color: COLORS.electric_blue
    },
    icon: {
        fontSize: 20,
        marginLeft: 5, 
        color: COLORS.electric_blue
    }
});

export default myCancelButton;