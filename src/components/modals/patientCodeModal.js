/**
* @fileoverview Define el contenedor del editor de código de paciente. Es un modal que se superpone con un efecto de sombreado y animación ascendente
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import PatientCodeEditor from './patientCodeEditor';
import { Modalize } from 'react-native-modalize';
import { EditCodeButton } from '_buttons';


class PatientCodeModal extends Component {

    constructor(props) {
        super(props);
        this.ref_modal = React.createRef();
    }

    onOpen = () => {
        this.ref_modal.current.open();
    };

    onClose = () => {
        this.ref_modal.current.close();
    };

    _renderModal() {
        return (
            <Modalize
                ref={this.ref_modal}
                modalStyle={{borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
                handlePosition={'inside'}
            >
                <StatusBar backgroundColor={'rgba(0,0,0,0.01)'} barStyle={'dark-content'} />

                <PatientCodeEditor
                    closeEditor={() => this.onClose()}
                    nav={this.props.nav}
                />
            </Modalize>
        )
    }

    render() {
        return (
            <>
                <EditCodeButton onPress={() => this.onOpen()} />

                { this._renderModal()}
            </>
        )
    }
}


export default PatientCodeModal;