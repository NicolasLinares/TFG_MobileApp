import React, { Component } from 'react';
import {
    Platform
} from 'react-native';
import Dialog from "react-native-dialog";
import { COLORS } from '_styles';


class myDialogPrompt extends Component {


    errorMessage = () => {
        return (
            <Dialog.Description style={{ color: 'red' }}>
                Los espacios en blanco no están permitidos
            </Dialog.Description>
        );
    }


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


export default myDialogPrompt;