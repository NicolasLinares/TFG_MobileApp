/**
* @fileoverview Diseño de botón usado en la pantalla de grabación para confirmar las notas de voz grabadas
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/


import React, { Component } from 'react'
import {
    Alert,
    Text,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { COLORS } from '_styles';

import { connect } from 'react-redux';
import { deleteAudio, addAudioTag, addFilterTag, addAudioHistory } from '_redux_actions';

import { httpService } from '_services';


/**
 * @class La clase DoneButton define un componente botón
 * @description Este componente es usado en la pantalla de grabación para confirmar y enviar las notas de voz grabadas a la base de datos
 */
class DoneButton extends Component {

    constructor(props) {
        super(props);
        this.uploadingData = false;
    }


    handleSendAudios = async () => {

        if (this.props.patientTag !== null) {

            this.uploadingData = true;

            // Se asigna el código de paciente a todos los audios
            await this.props.addAudioTag(this.props.patientTag);

            // Por cada audio grabado se envía y se elimina de la lista para añadirla
            let N = this.props.list.length;
            let list = this.props.list;
            for (let i = 0; i < N; i++) {
                let audio = list[i];
                console.log(audio.name + ' - Procesando audio...');
                let audio_resp = await httpService.uploadAudio(audio);

                if (audio_resp !== null) {

                    // Se elimina de la lista de grabaciones para que no se vuelva a enviar
                    this.props.delete(audio.key);

                    // Para evitar que añada el audio a la lista del filtro aplicado
                    // se comprueba que no haya ningún filtro en este momento o que 
                    // el filtro aplicado sea el mismo que el grabado
                    if (this.props.currentTagApplied === null ||
                        this.props.currentTagApplied === audio_resp.tag) {
                        // Se añade al historial de audios del médico
                        this.props.addAudioHistory(audio_resp);
                    }

                    // Se añade la nueva etiqueta si no existe ya
                    this.props.addFilterTag(audio_resp.tag);

                    console.log(audio.name + ' - Audio almacenado en el servidor...');

                } else {
                    console.log(audio.name + ' - Audio no guardado correctamente en el servidor...');

                    // el audio no se ha enviado
                    // problema de red o formato inválido (más bien el primer caso)
                    // o token caducado
                    Alert.alert(
                        'Error',
                        'El audio ' + audio.localpath + ' no se ha guardado correctamente',
                        [{ text: 'Aceptar' }]
                    );
                }
            }

        } else {
            Alert.alert(
                'Código de paciente',
                'Asigna un código para identificar a qué paciente van dirigidas las notas de voz',
                [{ text: 'Aceptar' }]
            );
        }

        this.uploadingData = false;

        setTimeout(() => this.props.nav.goBack(), 500);
    }

    _renderSendButton = () => {
        return (
            this.uploadingData
                ?
                <ActivityIndicator size={'small'} color={COLORS.dark_grey} />
                :
                <TouchableOpacity onPress={() => this.handleSendAudios()}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: COLORS.electric_blue }}>
                        Hecho
              	    </Text>
                </TouchableOpacity>
        )
    }

    render() {
        return (
            this.props.list.length > 0 ? this._renderSendButton() : null
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.audioListReducer.audiolist,
        patientTag: state.patientCodeReducer.patientCode,
        history: state.historyReducer.history,
        currentTagApplied: state.tagsReducer.currentTagApplied,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        delete: (key) => dispatch(deleteAudio(key)),
        addAudioTag: (tag) => dispatch(addAudioTag(tag)),
        addFilterTag: (tag) => dispatch(addFilterTag(tag)),
        addAudioHistory: (audio) => dispatch(addAudioHistory(audio)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoneButton);