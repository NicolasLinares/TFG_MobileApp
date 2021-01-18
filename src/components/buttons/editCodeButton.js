/**
* @fileoverview Diseño de botón usado en la pantalla de grabación que muestra y permite modificar el código de paciente
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { connect } from 'react-redux';

import { COLORS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

/**
 * @class La clase EditCodeButton define un componente botón
 * @description Este componente es usado en la pantalla de grabación que muestra y permite modificar el código de paciente
 *
 *  @prop onPress {function} - Función que se ejecuta al hacer click
 */
class EditCodeButton extends Component {

    render() {
        return (
            <TouchableWithoutFeedback
                style={styles.item}
                onPress={this.props.onPress}
                avoidKeyboardLikeIOS={true}
            >
                <View style={styles.iconContainer}>
                    <IconII style={styles.icon} name={"person"} />
                    <IconII style={[styles.icon, { marginLeft: -3 }]} name={"list"} />
                </View>

                <Text style={[styles.code, { color: this.props.patientCode !== null ? COLORS.electric_blue : 'grey' }]}>
                    {this.props.patientCode !== null ? this.props.patientCode : 'Añadir código de paciente'}
                </Text>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'rgb(230,230,230)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 18,
        marginVertical: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        width: 35,
        height: 35,
        borderRadius: 13,
        marginVertical: 5,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.light_green,
        borderWidth: 0.5,
        borderColor: COLORS.green
    },
    icon: {
        fontSize: 15,
        color: COLORS.green,
    },

    code: {
        fontSize: 17,
        backgroundColor: 'transparent',
        marginHorizontal: 20
    },

});


const mapStateToProps = (state) => {
    return {
        patientCode: state.patientCodeReducer.patientCode,
    }
}

export default connect(mapStateToProps, null)(EditCodeButton);