import React, { Component } from 'react'

import { AudioListView } from '_molecules';

import { connect } from 'react-redux';
import { deleteAudio } from '_redux_actions';

class audioListModule extends Component {


    deleteItem = (key) => {
        this.props.delete(key);
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
