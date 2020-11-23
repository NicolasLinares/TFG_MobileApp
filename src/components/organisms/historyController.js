import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';

import { FilterList } from '_organisms';
import { SectionList } from '_molecules';

import { COLORS } from '_styles';

import { connect } from 'react-redux';
import {
    setHistory,
    cleanHistory,
    deleteAudioHistory,
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


    handleAudioDelete = async (item, closeRow) => {
        await Alert.alert(
            'Eliminar nota de voz',
            'La nota de voz "' + item.name + '.' + item.extension + '" y su transcripción se van a eliminar de forma permanente',
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
                        let realPath = Platform.OS === 'ios' ? item.localpath.replace('file://', '') : item.localpath;

                        RNFetchBlob.fs.unlink(realPath).then(() => {
                            // Se actualiza el estado
                            this.props.delete(item.key);
                        }).catch((err) => {
                            alert("Error al borrar el audio" + err);
                        });

                        // Se borra de la base de datos del servidor
                        let response = await audioRequestService.deleteAudioHistory(item.uid);

                        if (response !== null) {
                            // Se actualiza el historial
                            date = this.getDate(item.date);
                            this.props.delete(date, item.uid);
                        }
                    },
                },
            ],
        );
    };

    async handleGetHistory() {
        let response = await audioRequestService.getHistory(this.state.next_page_URL);

        if (response !== null) {
            // Para el resto de peticiones ya se almacena la URL
            // con la siguiente página
            this.setState({
                next_page_URL: response.next_page_url,
            });

            let list = response.data;
            let N = list.length;
            for (let i = 0; i < N; i++) {
                // Se añade cada audio al historial de audios
                // grabados por el médico
                this.props.setHistory(list[i]);
            }
        }
    }


    async handleRemoveFilter() {
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
                
                <Text style={styles.title}>Mis notas de voz</Text>

                <FilterList
                    setNextURL={(url) => this.setState({ next_page_URL: url })}
                    handleRemoveFilter={() => this.handleRemoveFilter()}
                />

                {this.state.loading === true ? (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size="small" color={COLORS.grey} />
                    </View>
                ) : (
                        <SectionList
                            list={this.props.history}
                            refresh={() => {
                                this.state.next_page_URL != null ? this.handleGetHistory() : {};
                            }}
                            nav={this.props.nav}
                            handleAudioDelete={this.handleAudioDelete}
                            showLoading={this.state.next_page_URL != null ? true : false}
                        />
                    )}
            </>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        marginVertical: 20,
        marginLeft: 40,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: 15,
        color: COLORS.electric_blue,
    },
    icon: {
        fontSize: 16,
        color: COLORS.electric_blue,
    },
});

const mapStateToProps = (state) => {
    return {
        history: state.historyReducer.history,
        token: state.userReducer.token,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setHistory: (audio) => dispatch(setHistory(audio)),
        cleanHistory: () => dispatch(cleanHistory()),
        delete: (date, uid) => dispatch(deleteAudioHistory(date, uid))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(historyController);
