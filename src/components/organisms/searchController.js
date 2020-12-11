import React, { Component } from 'react';
import {
    Platform,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import { audioRequestService, checkInputService } from '_services';

import { connect } from 'react-redux';
import { setHistory, cleanHistory} from '_redux_actions';
import { COLORS } from '_styles';


class searchController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            showNullResponse: false,
            loading: false,
        }
    }

    async searchWord() {
        if (this.state.searchText != '')
            if (!checkInputService.withBlankSpaces(this.state.searchText)) {
                
                this.setState({ loading: true });

                // Se borra de la base de datos del servidor
                let response = await audioRequestService.searchAudio(this.state.searchText);
                if (response !== null && response.data.length > 0) {
                    this.setState({ showNullResponse: false, loading: false });

                    // Se vacía el historial de audios grabados 
                    // para que no se dupliquen en caso de haber 
                    // hecho la consulta antes        
                    this.props.cleanHistory();
                    this.props.setNextURL(response.next_page_url)

                    let list = response.data;
                    N = list.length;
                    for (let i = 0; i < N; i++) {
                        // Se añade cada audio al historial de audios 
                        // grabados por el médico
                        this.props.setHistory(list[i]);
                    }

                } else {
                    this.setState({ showNullResponse: true, loading: false });
                }
            } else {
                this.setState({ showNullResponse: true, loading: false });
            }
    }

    onChangeText = (value) => {
        this.setState({ searchText: value });
    }

    render() {
        return (
            <SearchBar
                platform={Platform.OS}
                lightTheme
                containerStyle={{ width: '95%', alignSelf: 'center' }}
                inputContainerStyle={{ backgroundColor: this.state.showNullResponse ? 'rgba(255,0,0,0.3)' : COLORS.light_grey, borderRadius: 15, height: 35 }}
                inputStyle={{fontSize: 16}}
                cancelButtonTitle={'Cancelar'}
                showLoading={this.state.loading}
                placeholder={"Buscar..."}
                onChangeText={(searchText) => this.onChangeText(searchText)}
                onBlur={() => this.searchWord()}
                onFocus={() => this.setState({ showNullResponse: false })}
                onCancel={() => {
                    this.setState({showNullResponse: false,loading: false });
                    this.props.resetHistory();
                }
                }
                onClear={() => {
                    this.setState({showNullResponse: false, loading: false });
                    this.props.resetHistory();
                }
                }
                value={this.state.searchText}
            />
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setHistory: (audio) => dispatch(setHistory(audio)),
        cleanHistory: () => dispatch(cleanHistory()),

    }
}

export default connect(null, mapDispatchToProps)(searchController);
