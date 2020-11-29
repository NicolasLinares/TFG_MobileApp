import React, { Component } from 'react';
import { Text, View } from 'react-native';

import {SearchBar} from '_organisms';


class SearchScreen extends Component {
    render() {
        return (
            <View style={{flex:1, backgroundColor:'white'}}>
                <SearchBar nav={this.props.navigation}/>
            </View>
        )
    }
}


export default SearchScreen;