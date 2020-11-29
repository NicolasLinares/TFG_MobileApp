import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Alert,
    Platform
} from 'react-native';
import { SearchBar, Header } from 'react-native-elements';

import { SectionList } from '_molecules';
import RNFetchBlob from 'rn-fetch-blob';

import { audioRequestService } from '_services';

class SearchBarController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            loading: false,
            data: []
        }
    }

    async searchWord() {
        if (this.state.searchText != '') {
            // Se borra de la base de datos del servidor
            let response = await audioRequestService.searchAudio(this.state.searchText);
            if (response !== null) {
                this.setState({data: response});
            }
        }
    }

    onChangeText = (value) => {
        this.setState({ searchText: value, data: [] });

        // Cada N letras se realiza la búsqueda para no saturar
        let N = 3;
        if (value != '' && value.length % N == 0) {
            this.searchWord();
        }
    }

    _renderSearchBar = () => {

        return (
            <View style={{ width: Dimensions.get('window').width, paddingHorizontal: Platform.OS === 'android' ? 10 : 0 }}>
                <SearchBar
                    platform={Platform.OS}
                    lightTheme
                    style={{ width: '100%' }}
                    inputContainerStyle={{ backgroundColor: 'rgb(220,220,225)', borderRadius: 15, height: 40 }}
                    cancelButtonTitle={'Cancelar'}
                    showLoading={this.state.searchText != ''}
                    placeholder={"Buscar..."}
                    onChangeText={(searchText) => this.onChangeText(searchText)}
                    onBlur={() => this.searchWord()}
                    value={this.state.searchText}
                />

            </View>
        );
    }

    render() {
        return (
            <View style={{flex:1}}>

                <Header
                    centerComponent={this._renderSearchBar}
                    containerStyle={{
                        backgroundColor: 'white',
                    }}
                />


            </View>

        )
    }
}

export default SearchBarController;
