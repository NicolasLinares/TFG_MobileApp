import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    Platform,
    Alert
} from 'react-native';
import { SearchBar, Header } from 'react-native-elements';

import { audioRequestService } from '_services';

import { SearchList } from '_molecules';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';

import { connect } from 'react-redux';
import {
    deleteAudioHistory,
} from '_redux_actions';

import {HeaderButtons} from '_atoms';
import IconII from "react-native-vector-icons/Ionicons";
import { COLORS } from '_styles';


class SearchBarController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            showNullResponse: false,
            loading: false,
            data: []
        }
    }

    async searchWord() {
        if (this.state.searchText != '')
            if (!/\s/.test(this.state.searchText)) {
                this.setState({ loading: true });

                // Se borra de la base de datos del servidor
                let response = await audioRequestService.searchAudio(this.state.searchText);
                if (response !== null && response.length > 0) {
                    this.setState({ data: response, loading: false });
                } else {
                    this.setState({ showNullResponse: true, loading: false });
                }
            } else {
                this.setState({ showNullResponse: true, loading: false });
            }
    }

    onChangeText = (value) => {
        this.setState({ searchText: value, data: [] });
    }


    getDate(timestamp) {
        m = moment(timestamp);
        return m.format('LL');
    }

    handleAudioDelete = async (item, closeRow) => {
        await Alert.alert(
            'Eliminar nota de voz',
            'La nota de voz "' + item.localpath + '" y su transcripción se van a eliminar de forma permanente',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                    onPress: closeRow
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {

                        // Se borra en el filesystem porque el recorder
                        // crea un fichero por cada grabación
                        let localpath = RNFetchBlob.fs.dirs.CacheDir + '/' + item.localpath;

                        RNFetchBlob.fs.unlink(localpath).catch((err) => {
                            alert("Error al borrar el audio" + err);
                        });

                        // Se borra de la base de datos del servidor
                        let response = await audioRequestService.deleteAudioHistory(item.uid);
                        if (response !== null) {

                            // Se actualiza el historial
                            let date = this.getDate(item.created_at);
                            this.props.delete(date, item.uid);

                            this.setState({
                                data: this.state.data.filter((it) => it.uid !== item.uid)
                            });
                        }
                    },
                },
            ],
        );
    };

    _renderNullMessage = () => {
        return (
            <View style={
                {
                    height: 35,
                    backgroundColor: 'rgba(255,0,0,0.3)',
                    width: 300,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    marginTop: 20
                }
            }>
                <Text>No se han encontrado coincidencias</Text>
            </View>
        );
    }

    _renderSearchBar = () => {

        return (
            <View style={{width: Dimensions.get('window').width - 30, marginLeft: 30 }}>
                <SearchBar
                    platform={Platform.OS}
                    lightTheme
                    style={{ width: '100%' }}
                    inputContainerStyle={{ backgroundColor: 'rgb(220,220,225)', borderRadius: 15, height: 40 }}
                    cancelButtonTitle={'Cancelar'}
                    showLoading={this.state.loading}
                    placeholder={"Buscar..."}
                    onChangeText={(searchText) => this.onChangeText(searchText)}
                    onBlur={() => this.searchWord()}
                    onFocus={() => this.setState({ showNullResponse: false })}
                    onCancel={() => this.setState({ loading: false })}
                    onClear={() => this.setState({ data: [] })}
                    value={this.state.searchText}
                />
            </View>
        );
    }


    render() {
        return (
            <View style={{ flex: 1 }}>

                <Header
                    leftComponent={HeaderButtons.BackButton(this.props.nav)}
                    leftContainerStyle={{left: -10}}
                    centerComponent={this._renderSearchBar}
                    containerStyle={{
                        backgroundColor: 'white',
                    }}
                />

                {
                    this.state.showNullResponse
                        ?
                        this._renderNullMessage()
                        :
                        <SearchList
                            list={this.state.data}
                            nav={this.props.nav}
                            handleAudioDelete={this.handleAudioDelete}
                        />
                }
            </View>

        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        delete: (date, uid) => dispatch(deleteAudioHistory(date, uid))
    };
};

export default connect(null, mapDispatchToProps)(SearchBarController);
