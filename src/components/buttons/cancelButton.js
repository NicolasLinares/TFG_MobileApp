/**
* @fileoverview Diseño de botón usado en la pantalla escáner para volver atrás
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';

import IconII from 'react-native-vector-icons/Ionicons';
import { COLORS } from '_styles';


/**
 * @class La clase CancelButton define un componente botón
 * @description Este componente es usado en la pantalla escáner para volver atrás
 * 
 *  @prop onPress {function} - Función que se ejecuta al hacer click
 */
class CancelButton extends Component {

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
        backgroundColor: COLORS.transparent_black,
        alignItems: 'center',
        justifyContent: 'center'
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

export default CancelButton;