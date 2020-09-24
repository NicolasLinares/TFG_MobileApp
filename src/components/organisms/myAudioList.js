import React, { Component } from 'react'
import { 
    StyleSheet, 
    FlatList,
    Text, 
    ActivityIndicator,
    View,
    TouchableOpacity
} from 'react-native';

import { AudioContainer } from '_molecules';

import SwipeableFlatList from 'react-native-swipeable-list';
import IconII from "react-native-vector-icons/Ionicons";


import {connect} from 'react-redux';
import { deleteAudio } from '_redux_actions';

class myAudioList extends Component {

    _renderItem = ({ item }) => (
        <AudioContainer
            item={item}
            onPress={() => this.props.delete(item.key)}
        />
    )

    _renderItemSeparator = () => (
        <View style={{height: 7}} />
    )

    _renderQuickActions = ({ item }) => {
        return (
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => this.props.delete(item.key)}
            >
                <IconII style={{marginRight: 30}} name={"trash"} size={25} color='white'/>
            </TouchableOpacity>
          </View>
        );
      }

    render() {
        return (
            <SwipeableFlatList
                style={styles.audiolist}
                keyExtractor={(item) => item.key.toString()}
                data={this.props.list}  
                maxSwipeDistance={80}
                renderItem={this._renderItem}
                renderQuickActions={this._renderQuickActions}
                ItemSeparatorComponent={this._renderItemSeparator}
                contentContainerStyle={{flexGrow: 1}}
                shouldBounceOnMount={true}
            />
        )
    }
}


const styles = StyleSheet.create({
    searchbar:{
      alignSelf: 'center', 
      width: '95%',
      height: 40,
      backgroundColor: 'rgba(0,0,0, 0.06)'
    },
    audiolist:{
      width:"100%",
      backgroundColor: 'white'
    },
    actionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 5
    },
    button: {
        width: '85%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 10,
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
  

export default connect(mapStateToProps, mapDispatchToProps)(myAudioList);
