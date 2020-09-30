import React, { Component } from 'react'
import {
    Alert,
    Text,
    StyleSheet
} from 'react-native';

import { AudioListView } from '_molecules';

import { connect } from 'react-redux';
import { deleteAudio } from '_redux_actions';

import RNFS from 'react-native-fs';


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

    render() {
        return (
          <>
          
            <Text style={styles.text}>
                Nuevas notas de voz
            </Text>

            <AudioListView
                list={this.props.list}
                onPress={this.deleteItem}
            />
          </>
        )
    }
}


const styles = StyleSheet.create({
  text: {
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 20,
      fontSize: 18
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
