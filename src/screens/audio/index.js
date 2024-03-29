import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Alert,
	TouchableOpacity,
	ScrollView,
	TextInput,
	Keyboard,
	Platform
} from 'react-native';

import { UIActivityIndicator } from 'react-native-indicators';

import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
} from 'react-native-popup-menu';

import { TagButton as TagView } from '_buttons';
import { DialogPrompt } from '_alerts';
import { Player } from '_controllers';


import { COLORS } from '_styles';
import IconII from 'react-native-vector-icons/Ionicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import moment from 'moment';
import * as FS from '_constants';

import { connect } from 'react-redux';
import { deleteAudioHistory, updateDescription, updateName, updateTranscription} from '_redux_actions';

import { httpService, checkInputService } from '_services';


import Share from 'react-native-share';


class AudioScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			uid: this.props.navigation.state.params.item.uid,
			name: this.props.navigation.state.params.item.name,
			extension: this.props.navigation.state.params.item.extension,
			tag: this.props.navigation.state.params.item.tag,
			date: this.getDate(this.props.navigation.state.params.item.created_at),
			hour: this.getHour(this.props.navigation.state.params.item.created_at),
			uname: this.props.navigation.state.params.item.uname,
			description: this.props.navigation.state.params.item.description,
			transcription: this.props.navigation.state.params.item.transcription, 
			status: this.props.navigation.state.params.item.status,

			editing: false,
			showDialog: false,
			errorDialog: false,
			// Función del componente HistoryItem para actualizar la lista después de borrar el audio
			updateNameHistoryItem: this.props.navigation.state.params.updateNameHistoryItem,
			updateStatusHistoryItem: this.props.navigation.state.params.updateStatusHistoryItem

		};

		this.interval = null;
	}

	async componentDidMount() {
		this.props.navigation.setParams({
			title: this.state.name,
			headerTitleStyle: {
				textAlign: 'center', // Android -  alinear título
				fontSize: 16
			},
			headerRight: () => this._renderOptionsButton(),
		});

		
		if (this.state.status !== 'Completada')
			this.interval = setInterval(() => this.checkTranscript(), 15*1000);
			
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	async checkTranscript() {
		let response = await httpService.getTranscript(this.state.uid);

		if (response !== null) {
			console.log('Estado: ' + response.status);

			if (response.status === 'Completada') {
				clearInterval(this.interval);

				// Se actualiza la transcripción
				this.setState({ transcription: response.text, status: response.status });
				// añadir a redux para no volver a hacer la petición si ya está
				this.props.updateTranscription(this.state.date, this.state.uid, response.text); 
				// Se actualiza en la vista del historial
				this.state.updateStatusHistoryItem(response.status); // en la vista del historial
			}
		}
	}


	getDate(timestamp) {
		m = moment(timestamp);
		return m.format('LL');
	}

	getHour(timestamp) {
		m = moment(timestamp);
		return m.format('HH:mm');
	}

	handleAudioDelete = async () => {
		const deleted = await this.props.navigation.state.params.handleAudioDelete();
		if (deleted)
			this.props.navigation.goBack();
	}

	handleUpdateName = async () => {
		let name = this.state.name;
		if (name == "" || checkInputService.withBlankSpaces(name)) {
			this.setState({ errorDialog: true });
		} else {
			let response = await httpService.updateName(this.state.uid, name);

			if (response !== null) {
				// Se actualiza el nombre del audio en todas sus referencias
				this.props.navigation.setParams({ title: name }); // en la cabecera del screen
				this.state.updateNameHistoryItem(name); // en la vista del historial
				this.props.updateName(this.state.date, this.state.uid, name); // Se actualiza localmente en el historial
				this.setState({ showDialog: false });
			}
		}
	}


	handleUpdateDescription = async () => {
		Keyboard.dismiss();

		let response = await httpService.updateDescription(this.state.uid, this.state.description);

		if (response !== null) {
			this.setState({ editing: false });
			this.props.navigation.state.params.item.description = this.state.description;
			this.props.updateDescription(this.state.date, this.state.uid, this.state.description); // Se actualiza localmente en el historial
		}
	}

	handleCancelUpdateDescription = () => {
		Keyboard.dismiss();

		this.setState({
			description: this.props.navigation.state.params.item.description,
			editing: false
		});
	}

	handleShareAudioFile() {

		let localpath = 'file://' + FS.DIRECTORY + '/' + this.state.uname;

		let options = {
			title: 'Compartir grabación de audio',
			failOnCancel: false,
			url: localpath,
			type: 'audio/' + this.state.extension
		};

		Share.open(options)
			.then((res) => { console.log(res) })
			.catch((err) => { err && console.log(err); });

	}

	handleShareTranscription() {

		if (this.state.transcription) {
			let options = {
				title: 'Compartir transcripción de audio',
				failOnCancel: false,
				message: this.state.transcription,
			};

			Share.open(options)
				.then((res) => { console.log(res) })
				.catch((err) => { err && console.log(err); });
		} else {
			Alert.alert(
				'Error al compartir',
				'Transcripción no disponible por el momento',
				[{ text: 'Aceptar' }]
			)
		}
	}


	_renderOptionsButton() {
		return (
			<Menu>
				<MenuTrigger>
					<IconII style={{ marginRight: 10 }} name={"ios-ellipsis-vertical"} size={25} color={COLORS.electric_blue} />
				</MenuTrigger>

				<MenuOptions optionsContainerStyle={{ borderRadius: 10, width: 280, marginTop: 30 }} >
					<MenuOption style={styles.sectionHeader} onSelect={() => this.setState({ showDialog: true })}>
						<Text style={{ marginLeft: 15, fontSize: 16 }}>Cambiar nombre</Text>
						<IconII style={[styles.icon, { color: 'black' }]} name={'create-outline'} />
					</MenuOption>

					<View style={{ borderColor: COLORS.light_grey, width: '100%', borderWidth: 0.5 }} />

					<MenuOption style={styles.sectionHeader} onSelect={() => this.handleShareTranscription()}>
						<Text style={{ marginLeft: 15, fontSize: 16 }}>Compartir transcripción</Text>
						<IconMCI style={[styles.icon, { color: 'black' }]} name={'share'} />
					</MenuOption>

					<View style={{ borderColor: COLORS.light_grey, width: '100%', borderWidth: 0.5 }} />

					<MenuOption style={styles.sectionHeader} onSelect={() => this.handleShareAudioFile()}>
						<Text style={{ marginLeft: 15, fontSize: 16 }}>Compartir grabación</Text>
						<IconMCI style={[styles.icon, { color: 'black' }]} name={'share'} />
					</MenuOption>

					<View style={{ borderColor: COLORS.light_grey, width: '100%', borderWidth: 0.5 }} />

					<MenuOption style={styles.sectionHeader} onSelect={() => this.handleAudioDelete()}>
						<Text style={{ marginLeft: 15, fontSize: 16, color: 'red' }}>Eliminar</Text>
						<IconII style={[styles.icon, { color: 'red' }]} name={'trash-outline'} />
					</MenuOption>
				</MenuOptions>
			</Menu>
		);
	}


	_renderActionsInputChanges = () => (
		<View style={{flexDirection: 'row', justifyContent: 'center', width: 70 }}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => this.handleCancelUpdateDescription()}
			>
				<IconII style={styles.icon} name={'close-outline'} color={COLORS.grey} />
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => this.handleUpdateDescription()}
			>
				<IconII style={styles.icon} name={'checkmark'} color={COLORS.electric_blue} />
			</TouchableOpacity>
		</View>
	);


	_renderDescription = () => (

		<View style={styles.panelContainer}>
			<View style={styles.sectionHeader}>
				<Text style={{marginVertical: 5, fontSize: 20, fontWeight: 'bold' }}>{'Descripción'}</Text>
				{this.state.editing ? this._renderActionsInputChanges() : null}
			</View>

			<View style={styles.line} />

			<View style={{ width: '90%' }}>
				<TextInput
					multiline={true}
					onFocus={() => this.setState({ editing: true })}
					underlineColorAndroid={'transparent'}
					style={[styles.text, { marginBottom: Platform.OS == 'ios' ? 10 : 0 }]}
					value={this.state.description}
					placeholder={'Escribe una descripción...'}
					placeholderTextColor={COLORS.grey}
					onChangeText={(value) => this.setState({ description: value })}
				/>
			</View>
		</View>
	);


    _renderStatus() {
        return (
			this.state.status === 'Completada' ?
				<View style={{flexDirection: 'row', marginTop: 3, alignItems: 'center'}}>
					<Text style={{fontSize: 14, color: COLORS.green_Complete, marginRight: 5 }}>{'Completada'}</Text>
                	<IconII style={{fontSize: 16, color: COLORS.green_Complete }} name={'checkmark-circle'} />
				</View>
			:
                <View style={{alignSelf: 'center'  }}>
                   <UIActivityIndicator animationDuration={1000} color={COLORS.grey} size={20} />
                </View>
        );
    }

	_renderTranscription = () => (
		<View style={styles.panelContainer}>
			<View style={styles.sectionHeader}>
				<Text style={{fontSize: 20, fontWeight: 'bold' }}>{'Transcripción'}</Text>
				{this._renderStatus()}
			</View>

			<View style={styles.line} />

			<View style={{ width: '90%' }}>
				<Text style={[styles.text, { color: this.state.status !== 'Completada' ? COLORS.grey : 'black', marginTop: 8, marginBottom: 8 }]}>
					{this.state.status !== 'Completada' ? 'Transcribiendo informe...' : this.state.transcription}
				</Text>
			</View>
		</View>
	);

	_renderDialogPrompt() {

		return (
			<DialogPrompt
				value={this.state.name}
				onChangeText={value => this.setState({ name: value })}
				visible={this.state.showDialog}
				showError={this.state.errorDialog}
				onCancel={() => this.setState({ name: this.props.navigation.state.params.item.name, showDialog: false, errorDialog: false })}
				onAccept={() => this.handleUpdateName()}
			/>
		);
	}

	render = () => (
		<View style={styles.container}>

			{this._renderDialogPrompt()}

			<ScrollView
				style={{ width: '100%', alignContent: 'center' }}
				keyboardDismissMode={'on-drag'}
				keyboardShouldPersistTaps={'handle'} // Permite mantener el teclado aunque se haga un click fuera de él
			>

				<Text style={styles.date}> {this.state.date + ', ' + this.state.hour}</Text>

				<TagView
					pressed={false}
					style={styles.tag}
					textStyle={styles.tagText}
					tag={this.state.tag}
				/>

				{this._renderDescription()}
				{this._renderTranscription()}
			</ScrollView>

			<View style={styles.playerContainer}>
				<Player
					item={this.props.navigation.state.params.item}
					complexStyle={true}
				/>
			</View>
		</View>
	);

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
	},

	date: {
		fontSize: 14,
		alignSelf: 'center',
		marginBottom: 20
	},
	tag: {
		backgroundColor: COLORS.light_green,
		height: 25,
		justifyContent: 'center',
		alignSelf: 'center',
		borderRadius: 7,
		marginVertical: 15,
		borderWidth: 1,
		borderColor: COLORS.green
	},
	tagText: {
		marginHorizontal: 13,
		fontSize: 14,
		alignSelf: 'center',
		justifyContent: 'center',
	},

	panelContainer: {
		width: '95%',
		alignSelf: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		borderRadius: 10,
		marginVertical: 5,

	},

	sectionHeader: {
		height: 50,
		width: '95%',
		backgroundColor: 'transparent',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10
	},

	line: {
		borderWidth: 0.5,
		borderColor: COLORS.light_grey,
		width: '100%',
	},

	text: {
		fontSize: 17,
		lineHeight: 25,
		textAlign: 'justify',
		color: 'black'
	},
	button: {
		height: 30,
		width: 40,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 5,
	},
	icon: {
		fontSize: 25,
		color: COLORS.electric_blue,
	},

	playerContainer: {
		height: Platform.OS == 'ios' ? 140 : 115,
		paddingTop: 10,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: 'white',
		borderTopColor: COLORS.grey,
		borderTopWidth: 0.5,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},

	dialogContainer: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});



const mapDispatchToProps = (dispatch) => {
	return {
		delete: (date, uid) => dispatch(deleteAudioHistory(date, uid)),
		updateDescription: (date, uid, description) => dispatch(updateDescription(date, uid, description)),
		updateName: (date, uid, name) => dispatch(updateName(date, uid, name)),
		updateTranscription: (date, uid, transcription) => dispatch(updateTranscription(date, uid, transcription)),
	}
}

export default connect(null, mapDispatchToProps)(AudioScreen);