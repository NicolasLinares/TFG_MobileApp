import React, { Component } from 'react'
import {
    Alert,
    View,
    Text,
    StyleSheet
} from 'react-native';

import { AudioListView } from '_molecules';

import { connect } from 'react-redux';
import { deleteAudio } from '_redux_actions';
import { COLORS } from '_styles';

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
                onPress: () => this.props.delete(item.key) 
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
