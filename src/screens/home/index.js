import React, { Component } from 'react';
import {
	View,
	StyleSheet
} from 'react-native';


import { FilterBar, SearchBar } from '_organisms';
import { HistoryList } from '_molecules';
import { ButtonNewRecord } from '_atoms';


import { connect } from 'react-redux';
import {
	setHistory,
	cleanHistory,
	deleteAudioHistory,
	deleteFilter
} from '_redux_actions';

import { URL } from '_constants';
import * as FS from '_constants';
import moment from 'moment';

import { httpService, storageService, permissionsService } from '_services';

class HomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pressed: false,
			next_page_URL: URL.getHistory,
			loading: true,
		};
	}

	async componentDidMount() {
		permissionsService.checkAllPermissions();

		// Se vacía el historial de audios grabados
		// para que no se dupliquen en caso de haber
		// hecho la consulta antes
		this.props.cleanHistory();

		// GET de los audios paginados
		await setTimeout(() => this.handleGetHistory(), 50);

		this.state.loading = false;
	}

	async checkPerms() {
		let granted = await permissionsService.checkMicrophonePermissions();
		if (granted) {
			this.props.navigation.navigate('Recorder');
		}
	}

	handleAudioDelete = async (item) => {

        // Se borra en el filesystem porque el recorder
        // crea un fichero por cada grabación
        let localpath = FS.DIRECTORY + '/' + item.localpath;
        storageService.deleteFile(localpath);
        
        // Se borra de la base de datos del servidor
        let response = await httpService.deleteAudioHistory(item.uid);
        if (response !== null) {

            // Se actualiza el historial
            let m = moment(item.created_at);
            let date = m.format('LL');

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

        let response = await httpService.getHistory(this.state.next_page_URL);

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

        // GET de los audios paginados
		await setTimeout(() => this.handleGetHistory(), 50);
    }

	render() {
		return (
			<View style={styles.container}>
				<SearchBar
					setNextURL={(url) => this.setState({ next_page_URL: url })}
					resetHistory={() => this.handleResetHistory()}
				/>

				<FilterBar
					setNextURL={(url) => this.setState({ next_page_URL: url })}
					resetHistory={() => this.handleResetHistory()}
				/>

				<HistoryList
					list={this.props.history}
					refresh={() => {
						this.state.next_page_URL != null && !this.state.loading ? this.handleGetHistory() : {};
					}}
					nav={this.props.navigation}
					handleAudioDelete={this.handleAudioDelete}
					loading={this.state.loading}
				/>

				<ButtonNewRecord onPress={() => this.checkPerms()} />
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: 'white',
	}
});



const mapStateToProps = (state) => {
	return {
		history: state.historyReducer.history,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);