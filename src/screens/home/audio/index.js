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
	Platform,
	ActivityIndicator
} from 'react-native';

import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
} from 'react-native-popup-menu';

import Dialog from "react-native-dialog";

import { Player, Tag } from '_atoms';

import { COLORS } from '_styles';
import IconII from 'react-native-vector-icons/Ionicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import moment from 'moment';
import * as FS from '_constants';

import { connect } from 'react-redux';
import { deleteAudioHistory, updateDescription, updateName } from '_redux_actions';

import { audioRequestService } from '_services';


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
			localpath: this.props.navigation.state.params.item.localpath,
			transcription: this.props.navigation.state.params.item.transcription, //"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.",
			description: this.props.navigation.state.params.item.description, //"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",

			editing: false,
			showDialog: false,
			errorDialog: false,
			// Función del componente HistoryItem para actualizar la lista después de borrar el audio
			updateHistoryItem: this.props.navigation.state.params.updateHistoryItem
		};
	}

	componentDidMount() {
		this.props.navigation.setParams({
			title: this.state.name,
			headerTitleStyle: {
				textAlign: 'center', // Android -  alinear título
				fontSize: 16
			},
			headerRight: () => this._renderOptionsButton(),
		});
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
		if (name == "" || /\s/.test(name)) {
			this.setState({ errorDialog: true });
		} else {

			let response = await audioRequestService.updateName(this.state.uid, name);

			if (response !== null) {
				// Se actualiza el nombre del audio en todas sus referencias
				this.props.navigation.setParams({ title: name }); // en la cabecera del screen
				this.state.updateHistoryItem(name); // en la vista del historial
				this.props.updateName(this.state.date, this.state.uid, name); // Se actualiza localmente en el historial
				this.setState({ showDialog: false });
			}
		}
	}


	handleUpdateDescription = async () => {
		Keyboard.dismiss();

		let response = await audioRequestService.updateDescription(this.state.uid, this.state.description);

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

		let localpath = 'file://' + FS.DIRECTORY + '/' + this.state.localpath;

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
		<View style={styles.actions}>
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


	// Si es editable devuelve su respectivo botón, y si es compartible lo mismo
	_renderSectionActions = (editable) => (
		<View style={{ flexDirection: 'row' }}>
			{
				this.state.editing && editable
					?
					this._renderActionsInputChanges()
					:
					null
			}
		</View>

	);

	// Si se ha presionado el botón de editar se transforma en un textinput
	_renderTextOrInput = (editable, text, placeholder) => (

		editable

			?

			<TextInput
				multiline={true}
				onFocus={() => this.setState({ editing: true })}
				underlineColorAndroid={'transparent'}
				style={[styles.text, { marginBottom: Platform.OS == 'ios' ? 10 : 0 }]}
				value={this.state.description}
				placeholder={placeholder}
				placeholderTextColor={COLORS.grey}
				onChangeText={(value) => this.setState({ description: value })}
			/>

			:

			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

				<Text style={[styles.text, { color: text === null ? COLORS.grey : 'black', marginTop: 8, marginBottom: 8 }]}>
					{
						text === null
							? placeholder
							: text
					}
				</Text>
				<ActivityIndicator size="small" color={COLORS.grey} />
			</View>
	);


	_renderSection = (title, text, placeholder, editable) => (
		<View style={styles.sectionContainer}>
			<View style={styles.sectionHeader}>
				<Text style={styles.titleHeader}>{title}</Text>
				{this._renderSectionActions(editable)}
			</View>

			<View style={styles.line} />

			<View style={styles.textContainer}>
				{this._renderTextOrInput(editable, text, placeholder)}
			</View>
		</View>
	);


	_renderDialogPrompt() {

		const errorMessage = () => {
			return (
				<Dialog.Description style={{ color: 'red' }}>
					Los espacios en blanco no están permitidos
				</Dialog.Description>
			);
		}

		return this.state.showDialog ? (

			<Dialog.Container contentStyle={{ marginBottom: 200 }} visible={this.state.showDialog} statusBarTranslucent>
				<Dialog.Title>Nuevo nombre</Dialog.Title>

				{this.state.errorDialog ? errorMessage() : null}

				<Dialog.Input 
					style={{ color: 'black', borderBottomWidth: Platform.OS == 'ios' ? 0 : 0.5, borderBottomColor: COLORS.grey }} 
					value={this.state.name} 
					onChangeText={value => this.setState({ name: value })} 
					selectTextOnFocus={true}
					focusable={true}
					autoFocus={true}
				/>

				<Dialog.Button label="Cancelar" onPress={() => this.setState({ name: this.props.navigation.state.params.item.name, showDialog: false, errorDialog: false })} />
				<Dialog.Button label="Aceptar" onPress={() => this.handleUpdateName()} />
			</Dialog.Container>
		)
			: null;
	}


	render = () => (
		<View style={styles.container}>

			{this._renderDialogPrompt()}

			<ScrollView
				style={styles.scrollContainer}
				keyboardDismissMode={'on-drag'}
				keyboardShouldPersistTaps={'handle'} // Permite mantener el teclado aunque se haga un click fuera de él
			>

				<Text style={styles.date}> {this.state.date + ', ' + this.state.hour}</Text>


				<Tag
					pressed={false}
					style={styles.tag}
					textStyle={styles.tagText}
					tag={this.state.tag}
				/>
				

				{this._renderSection('Descripción', this.state.description, 'Escribe una descripción del audio...', true)}
				{this._renderSection('Transcripción', this.state.transcription, 'Transcribiendo nota de voz...', false)}
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

	scrollContainer: {
		width: '100%',
		alignContent: 'center',
	},
	sectionContainer: {
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
	},

	actions: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	line: {
		borderWidth: 0.5,
		borderColor: COLORS.light_grey,
		width: '100%',
	},
	textContainer: {
		width: '90%',
	},
	titleHeader: {
		marginVertical: 5,
		marginHorizontal: 10,
		fontSize: 20,
		fontWeight: 'bold'
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


const mapStateToProps = (state) => {
	return {
		token: state.userReducer.token,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		delete: (date, uid) => dispatch(deleteAudioHistory(date, uid)),
		updateDescription: (date, uid, description) => dispatch(updateDescription(date, uid, description)),
		updateName: (date, uid, name) => dispatch(updateName(date, uid, name)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioScreen);