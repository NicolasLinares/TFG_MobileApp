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
import { deleteAudio } from '_redux_actions';

import RNFS from 'react-native-fs';

import IconII from "react-native-vector-icons/Ionicons";
import { COLORS, CONSTANTS }  from '_styles';

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
                  RNFS.unlink(`${item.path}`).then(res => {
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

    _renderSendButton() {
      return (
          <TouchableOpacity style={styles.sendButton}>
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

});


const mapStateToProps = (state) => {
  return {
      list: state.audioListReducer.audiolist,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    delete: (key) => dispatch(deleteAudio(key))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(audioListModule);
