/**
* @fileoverview Diseño de los botones de acción ocultos tras cada item de la lista
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { FadeInAnimation } from '_animations';
import { CONSTANTS } from '_styles';

import IconII from "react-native-vector-icons/Ionicons";

class HiddenItemButtons extends Component {
    render() {
        return (
            <FadeInAnimation style={{ flex: 1 }} duration={1200}>
                <TouchableOpacity
                    style={[styles.deleteButton, { width: this.props.buttonWidth }]}
                    onPress={this.props.onPressDelete}
                >
                    <IconII name={"trash"} size={25} color='white' />
                </TouchableOpacity>

                {/* Buttons ... */}

            </FadeInAnimation>
        )
    }
}

const styles = StyleSheet.create({
    deleteButton: {
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

export default HiddenItemButtons;