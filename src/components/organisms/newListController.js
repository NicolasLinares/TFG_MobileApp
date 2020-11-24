import React, { Component } from 'react'
import {
	Alert,
	Text,
	View,
	TouchableOpacity,
	StyleSheet
} from 'react-native';

import { BasicList } from '_molecules';


import { connect } from 'react-redux';
import { deleteAudio, addAudioTag, addAudioHistory, addFilterTag } from '_redux_actions';

import RNFetchBlob from 'rn-fetch-blob';


import IconII from "react-native-vector-icons/Ionicons";
import { COLORS, CONSTANTS } from '_styles';

import { audioRequestService } from '_services';


class audioListModule extends Component {

	constructor(props) {
		super(props);
		this.sendingData = false;
	}


	deleteItem = (item) => {

		Alert.alert(
			'Eliminar nota de voz',
			'La nota de voz "' + item.name + '.' + item.extension + '" se va a eliminar de forma permanente',
			[
				{
					text: 'Cancelar',
					style: 'cancel',
				},
				{
					text: 'Eliminar',
					onPress: () => {

						// Se borra en el filesystem porque el recorder
						// crea un fichero por cada grabación
						let realPath = Platform.OS === 'ios' ? item.localpath.replace('file://', '') : item.localpath;

                        RNFetchBlob.fs.unlink(realPath).then(() => {
							// Se actualiza el estado
							this.props.delete(item.key);
						}).catch((err) => {
							alert("Error al borrar el audio");
						});
					}
				}
			]
		);
	}


	handleSendAudios = async () => {

		if (this.props.patientTag !== '') {

			this.sendingData = true;

			// Se asigna el código de paciente a todos los audios
			await this.props.addAudioTag(this.props.patientTag);

			// Por cada audio grabado se envía y se elimina de la lista para añadirla
			N = this.props.list.length;
			list = this.props.list.reverse();
			for (let i = 0; i < N; i++) {
				let audio = list[i];

				audio = await audioRequestService.uploadAudio(audio);

				if (audio !== null) {

					// Se elimina de la lista de grabaciones para que no se vuelva a enviar
					this.props.delete(this.props.list[0].key);

					// Para evitar que añada el audio a la lista del filtro aplicado
					// se comprueba que no haya ningún filtro en este momento o que 
					// el filtro aplicado sea el mismo que el grabado
					if (this.props.currentTagApplied === '' || 
						this.props.currentTagApplied === audio.tag) {
						// Se añade al historial de audios del médico
						this.props.addAudioHistory(audio);
					}

					// Se añade la nueva etiqueta si no existe ya
					this.props.addFilterTag(audio.tag);

				} else {
					// el audio no se ha enviado
					// problema de red o formato inválido (más bien el primer caso)
					// o token caducado
					let audio = list[i];
					Alert.alert(
						'Error',
						'El audio ' + audio.name + '.' + audio.extension + ' no se ha guardado correctamente',
						[{ text: 'Aceptar' }]
					);
				}
			}

		} else {
			Alert.alert(
				'Código de paciente',
				'Asigna un código para identificar a qué paciente van dirigidas las notas de voz',
				[{ text: 'Aceptar' }]
			);
		}

		this.sendingData = false;

	}


	_renderSendButton() {
		return (
			<TouchableOpacity
				style={styles.sendButton}
				onPress={() => this.handleSendAudios()}
			>
				<Text style={{ fontSize: 17, marginRight: 6, color: COLORS.electric_blue }}>
					Hecho
              	</Text>
				<IconII style={{ fontSize: 20, color: COLORS.electric_blue }} name={'checkmark'} />
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<>
				<View style={styles.header}>
					<Text style={styles.title}>
						Notas de voz
                </Text>
					{this.props.list.length > 0 && !this.sendingData ? this._renderSendButton() : null}
				</View>

				<BasicList
					list={this.props.list}
					onPress={this.deleteItem}
				/>
			</>
		)
	}
}


const styles = StyleSheet.create({
	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontSize: 25,
		marginVertical: 20,
		marginLeft: 40,
		fontWeight: 'bold',
		alignSelf: 'flex-start',
	},

	text: {
		fontWeight: 'bold',
		marginBottom: 20,
		fontSize: 18
	},
	sendButton: {
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 20,
		marginTop: 5,
		marginRight: 20,
		flexDirection: 'row',
		backgroundColor: COLORS.light_grey,
		paddingHorizontal: 10
	},
	topMessage: {
		textAlign: 'center',
	}
});


const mapStateToProps = (state) => {
	return {
		list: state.audioListReducer.audiolist,
		patientTag: state.patientCodeReducer.tag,
		token: state.userReducer.token,
		history: state.historyReducer.history,
		currentTagApplied: state.tagsReducer.currentTagApplied,
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		delete: (key) => dispatch(deleteAudio(key)),
		addAudioTag: (tag) => dispatch(addAudioTag(tag)),
		addFilterTag: (tag) => dispatch(addFilterTag(tag)),
		addAudioHistory: (audio) => dispatch(addAudioHistory(audio)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(audioListModule);