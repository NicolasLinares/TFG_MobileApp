/**
* @fileoverview Alert con un prompt, usado para introducir el nuevo nombre de la nota de voz 
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react';
import {
    Platform
} from 'react-native';
import Dialog from "react-native-dialog";
import { COLORS } from '_styles';


 

/**
 * @class La clase DialogPrompt define el componente que crea un dialog con un textinput
 * @memberof Alerts
 * @extends {Component}
 * @description Este componente permite introducir el nuevo nombre para una nota de voz
 * @example
 * 
 *  import { DialogPrompt } from '_alerts';
 * 
 *  ...
 * 
 *  render() {
 *      return (
 *          <DialogPrompt 
 *              value={myValue}
 *              onChangeText={value => doSomething(value)}
 *              visible={true}
 *              showError={false}
 *              onCancel={() => doSomething()}
 *              onAccept={() => doSomething()}
 *          />  
 *      )
 *  }
 * 
 *  @prop value {string} - Valor inicial
 *  @prop onChangeText {method} - Función que acepta como parámetro el nuevo valor
 *  @prop visible {boolean} - Muestra el componente o lo mantiene oculto
 *  @prop showError {boolean} - Muestra el error o lo mantiene oculto
 *  @prop onCancel {method} - Función que realiza una acción cuando presiona el botón cancelar
 *  @prop onAccept {method} - Función que realiza una acción cuando presiona el botón aceptar
 */
class DialogPrompt extends Component {

    /**
    * Esta función renderiza el error por haber introducido un nombre no válido
    */
    errorMessage = () => {
        return (
            <Dialog.Description style={{ color: 'red' }}>
                Los espacios en blanco no están permitidos
            </Dialog.Description>
        );
    }

    /**
    * Renderiza el componente
    */
    render() {
        return (

            <Dialog.Container contentStyle={{ marginBottom: 200 }} visible={this.props.visible}>
                <Dialog.Title>Nuevo nombre</Dialog.Title>

                {this.props.showError ? this.errorMessage() : null}

                <Dialog.Input
                    style={{ color: 'black', borderBottomWidth: Platform.OS == 'ios' ? 0 : 0.5, borderBottomColor: COLORS.grey }}
                    value={this.props.value}
                    onChangeText={value => this.props.onChangeText(value)}
                    selectTextOnFocus={true}
                    focusable={true}
                    autoFocus={true}
                />

                <Dialog.Button label="Cancelar" onPress={() => this.props.onCancel()} />
                <Dialog.Button label="Aceptar" onPress={() => this.props.onAccept()} />
            </Dialog.Container>
        );
    }
}


export default DialogPrompt;