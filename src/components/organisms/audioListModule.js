import React, { Component } from 'react'
import {
    Alert,
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { SwipeableAudioList } from '_molecules';

import { connect } from 'react-redux';
import { deleteAudio, addAudioTag, addAudioHistory } from '_redux_actions';

import RNFS from 'react-native-fs';

import IconII from "react-native-vector-icons/Ionicons";
import { COLORS, CONSTANTS }  from '_styles';

import { showMessage } from "react-native-flash-message";
import { URL } from '_data';

class audioListModule extends Component {

    deleteItem = (item) => {

        Alert.alert(
            'Eliminar nota de voz',
            'La nota de voz "' + item.name + '" se va a eliminar de forma permanente',
            [
              {
                text: 'Cancelar',
                style: 'cancel',
              },
              { text: 'Eliminar', 
                onPress: () => {
                  
                  // Se borra en el filesystem porque el recorder
                  // crea un fichero por cada grabación
                  RNFS.unlink(`${item.localpath}`).then(res => {
                      // Se actualiza el estado
                      this.props.delete(item.key);
                  }).catch(err => {
                      alert("Error al borrar el audio");
                  });
                }
              }
            ],
            { cancelable: false }
          );
    }

    send = async (audio) => {
      data = JSON.stringify(audio);
      return await fetch('http://localhost/API_Medcorder/public/v1/audio', 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.token
          },
          method : "POST",
          body: data,
        })
        .then((response) => {

          return Promise.all([response.json(), response.status]);
        })
        .then(([body, status]) => {
          if (status == 201) {
            return body;
          } else {
            showMessage({
              message: 'Error',
              description: body.error,
              type: "danger",
              duration: 3000,
              titleStyle: {textAlign: 'center', fontWeight: 'bold', fontSize: 18},
              textStyle: {textAlign: 'center'},
            });
            return null;
          }
        })
        .catch((error) => {
          showMessage({
            message: 'Error',
            description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
            type: "danger",
            duration: 3000,
            titleStyle: {textAlign: 'center', fontWeight: 'bold', fontSize: 18},
            textStyle: {textAlign: 'center'},
          });
        });
    }


    handleSendAudios = async () => {

      if (this.props.patientTag !== '') {

        // Se asigna el código de paciente a todos los audios
        await this.props.addTag(this.props.patientTag);

        // Por cada audio grabado se envía y se elimina de la lista para añadirla
        N = this.props.list.length;
        list = this.props.list;
        for (let i = 0; i < N; i++) {
          audio = list[i];
          audio = await this.send(audio);
          if (audio != null) {

            // Se envía el fichero de audio para almacenarlo en el servidor
            //this.sendFile(audio);

            // Se elimina de la lista de grabaciones para que no se vuelva a enviar
            this.props.delete(this.props.list[i].key);

            // Se añade al historial de audios del médico
            this.props.addAudioHistory(audio);

            console.log(this.props.history);
          } else {
            // el audio no se ha enviado
            // problema de red o formato inválido (más bien el primer caso)
            // o token caducado
          }
        }

      } else {
        Alert.alert(
          'Código de paciente',
          'Asigna un código para identificar a qué paciente van dirigidas las notas de voz',
          {
            text: 'Aceptar',
          }
        );
      }
    }


    _renderSendButton() {
      return (
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={() => this.handleSendAudios()}
          >
              <Text style={{fontSize:17, marginRight: 4, color: COLORS.electric_blue}}>
                  Transcribir
              </Text>
              <IconII style={{fontSize:20, marginLeft: 4, color: COLORS.electric_blue}} name={'md-cloud-upload-outline'}/>
          </TouchableOpacity>
      );
    }

    render() {
        return (
          <>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Notas de voz
                </Text>
                {this.props.list.length > 0 ? this._renderSendButton() : null}
            </View>
            
            <SwipeableAudioList
                list={this.props.list}
                onPress={this.deleteItem}
            />
          </>
        )
    }
}


const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  title: {
    fontSize: 25,
    marginVertical: 20,
    marginLeft: 40,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },

  text: {
      fontWeight: 'bold',
      marginBottom: 20,
      fontSize: 18
  },
  sendButton: {
    height: 30,
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 20,
    flexDirection: 'row',
    backgroundColor: COLORS.light_grey,
    paddingHorizontal: 10
  },
  topMessage: {
    textAlign: 'center',
  }
});


const mapStateToProps = (state) => {
  return {
      list: state.audioListReducer.audiolist,
      patientTag: state.patientCodeReducer.tag,
      token: state.userReducer.token,
      history: state.historyReducer.history
    }
}


const mapDispatchToProps = (dispatch) => {
  return {
    delete: (key) => dispatch(deleteAudio(key)),
    addTag: (tag) => dispatch(addAudioTag(tag)),
    setPatientTag: (tag) => dispatch(setPatientTag(tag)),
    addAudioHistory: (audio) => dispatch(addAudioHistory(audio)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(audioListModule);
