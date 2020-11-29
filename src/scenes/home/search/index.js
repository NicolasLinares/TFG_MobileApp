import React, { Component } from 'react';
import { Text, View } from 'react-native';

import {SearchBar} from '_organisms';


class SearchScreen extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <SearchBar/>
            </View>
        )
    }
}


export default SearchScreen;