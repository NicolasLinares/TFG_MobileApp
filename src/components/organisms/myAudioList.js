import React, { Component } from 'react'
import { 
    StyleSheet, 
    FlatList,
    Alert, 
    ActivityIndicator,
    View
} from 'react-native'

import { AudioContainer } from '_molecules';


class myAudioList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    keyExtractor = (item, index) => index.toString();

    _renderItem = ({ item }) => (
        <AudioContainer item={item}/>
    )

    render() {
        return (
            <FlatList
                style={styles.audiolist}
                keyExtractor={this.keyExtractor}
                data={this.state.list}  
                extraData={this.state}
                renderItem={this._renderItem}
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
    }
});

export default myAudioList;
