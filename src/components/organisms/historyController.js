import React, { Component } from 'react';

import { FilterBar, SearchBar } from '_organisms';
import { SectionList } from '_molecules';


import { connect } from 'react-redux';
import {
    setHistory,
    cleanHistory,
    deleteAudioHistory,
    deleteFilter
} from '_redux_actions';

import { URL } from '_data';
import RNFetchBlob from 'rn-fetch-blob';

import moment from 'moment';

import { audioRequestService } from '_services';

class historyController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            next_page_URL: URL.getHistory,
            loading: true,
        };
    }

    async componentDidMount() {
        // Se vacía el historial de audios grabados
        // para que no se dupliquen en caso de haber
        // hecho la consulta antes
        this.props.cleanHistory();

        // GET de los audios paginados de 20 en 20
        await setTimeout(() => this.handleGetHistory(), 50);

        this.state.loading = false;
    }


    getDate(timestamp) {
        m = moment(timestamp);
        return m.format('LL');
    }

    handleAudioDelete = async (item) => {

        // Se borra en el filesystem porque el recorder
        // crea un fichero por cada grabación
        let localpath = RNFetchBlob.fs.dirs.CacheDir + '/' + item.localpath;

        RNFetchBlob.fs.exists(localpath).then((exist) => {
                if (exist)
                    RNFetchBlob.fs.unlink(localpath).catch((err) => {
                        alert("Error al borrar el audio" + err);
                    });
            }
        )

        // Se borra de la base de datos del servidor
        let response = await audioRequestService.deleteAudioHistory(item.uid);
        if (response !== null) {

            // Se actualiza el historial
            let date = this.getDate(item.created_at);
            this.props.deleteAudio(date, item.uid);

            // Response.count contiene el número de audios que todavía hay
            // para el código de paciente (tag) al que pertenece el audio borrado
            if (response.count === 0) {
                // si ya no quedan audios para el identificador Response.tag
                // entonces lo borramos de la lista de filtros
                this.props.deleteFilter(response.tag);
            }
        }
    };

    async handleGetHistory() {

        // Con esta variable se controla tanto la animación del ActivityIndicator
        // así como evitar que se realicen nuevas llamadas mientras se procesa esta
        this.setState({
            loading: true,
        });

        let response = await audioRequestService.getHistory(this.state.next_page_URL);

        if (response !== null) {

            let list = response.data;
            let N = list.length;
            for (let i = 0; i < N; i++) {
                // Se añade cada audio al historial de audios
                // grabados por el médico
                this.props.setHistory(list[i]);
            }

            // Para el resto de peticiones ya se almacena la URL
            // con la siguiente página
            this.setState({
                next_page_URL: response.next_page_url,
                loading: false
            });
        }
    }


    async handleResetHistory() {
        // Se vacía el historial de audios grabados
        // para que no se dupliquen en caso de haber
        // hecho la consulta antes
        this.props.cleanHistory();

        this.setState({
            next_page_URL: URL.getHistory,
        });

        // GET de los audios paginados de 20 en 20
        await setTimeout(() => this.handleGetHistory(), 50);
    }

    render() {
        return (
            <>
                <SearchBar
                    setNextURL={(url) => this.setState({ next_page_URL: url })}
                    resetHistory={() => this.handleResetHistory()}
                />

                <FilterBar
                    setNextURL={(url) => this.setState({ next_page_URL: url })}
                    resetHistory={() => this.handleResetHistory()}
                />

                <SectionList
                    list={this.props.history}
                    refresh={() => {
                        this.state.next_page_URL != null && !this.state.loading ? this.handleGetHistory() : {};
                    }}
                    nav={this.props.nav}
                    handleAudioDelete={this.handleAudioDelete}
                    loading={this.state.loading}
                />

            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        history: state.historyReducer.history,
        token: state.userReducer.token,
        tags: state.tagsReducer.tags,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setHistory: (audio) => dispatch(setHistory(audio)),
        cleanHistory: () => dispatch(cleanHistory()),
        deleteAudio: (date, uid) => dispatch(deleteAudioHistory(date, uid)),
        deleteFilter: (tag) => dispatch(deleteFilter(tag))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(historyController);
