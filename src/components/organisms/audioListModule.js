import React, { Component } from 'react'
import {
    Alert,
} from 'react-native';

import { AudioListView } from '_molecules';

import { connect } from 'react-redux';
import { deleteAudio } from '_redux_actions';

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
            <AudioListView
                list={this.props.list}
                onPress={this.deleteItem}
            />
        )
    }
}

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
