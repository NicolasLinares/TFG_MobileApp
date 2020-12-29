/**
* @fileoverview Diseño de botón usado en la pantalla principal (home) como botón de añadir más audios
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react'
import {
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import IconMI from "react-native-vector-icons/MaterialIcons";


/**
 * @class La clase FloatingButton define un componente botón
 * @description Este componente es usado en la pantalla principal (home) como botón de añadir más audios
 * 
 *  @prop onPress {function} - Función que se ejecuta al hacer click
 */
class FloatingButton extends Component {

    render() {
        return (

            <TouchableOpacity
                style={styles.button}
                onPress={this.props.onPress}
            >
                <IconMI style={{marginTop: 5}} name={'add'} size={40} color={'white'} />
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        height: 70,
        width: 70,
        backgroundColor: 'rgba(255, 30, 60, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        bottom: 30,
        right: 30
    },
});

export default FloatingButton;