import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Alert,
	TouchableOpacity,
	ScrollView,
	TextInput,
	Keyboard
} from 'react-native';

import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger,
} from 'react-native-popup-menu';

import { Player } from '_atoms';
import { COLORS } from '_styles';
import IconII from 'react-native-vector-icons/Ionicons';

import moment from 'moment';
import RNFS from 'react-native-fs';


import { showMessage } from "react-native-flash-message";
import { URL } from '_data';
import { connect } from 'react-redux';
import { deleteAudioHistory, updateDescription, updateName } from '_redux_actions';


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

			// Función del componente HistoryItem
			updateHistoryItem: this.props.navigation.state.params.updateHistoryItem
		};
	}

	componentDidMount() {
		this.props.navigation.setParams({
			title: this.state.name,
			headerTitleStyle: { fontSize: 18 },
			headerRight: () => this._renderOptionsButton(),
		});
	}

	sendDelete = async () => {

		return await fetch(URL.deleteAudio + this.state.uid,
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.props.token
				},
				method: "DELETE",
			})
			.then((response) => {
				return Promise.all([response.json(), response.status]);
			})
			.then(([body, status]) => {
				if (status == 200) {

					// Se actualiza el historial
					this.props.delete(this.state.date, this.state.uid);
					// Volvemos a home
					showMessage({
						message: body.message,
						type: "success",
						duration: 2000,
						titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
					});
				} else {
					showMessage({
						message: 'Error',
						description: body.error,
						type: "danger",
						duration: 3000,
						titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
						textStyle: { textAlign: 'center' },
					});
					return null;
				}
			})
			.catch((error) => {
				showMessage({
					message: 'Error',
					description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
					type: "danger",
					duration: 3000,
					titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
					textStyle: { textAlign: 'center' },
				});
			});
	}


	handleAudioDelete = () => {
		Alert.alert(
			'Eliminar nota de voz',
			'La nota de voz "' + this.state.name + '" se va a eliminar de forma permanente',
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
						RNFS.unlink(`${this.state.localpath}`).then(res => {
							// Se borra de la base de datos del servidor
							this.sendDelete();
							this.props.navigation.goBack();

						}).catch(err => {
							alert("Error al borrar el audio");
						});

					}
				}
			],
			{ cancelable: false }
		);
	}

	sendName = async (name) => {

		name = name + '.' + this.state.extension;
		data = JSON.stringify({ name: name });

		return await fetch(URL.updateAudioName + this.state.uid,
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.props.token
				},
				method: "PUT",
				body: data
			})
			.then((response) => {
				return Promise.all([response.json(), response.status]);
			})
			.then(([body, status]) => {
				if (status == 201) {

					this.setState({
						name: name
					});

					this.props.navigation.setParams({
						title: name,
					});

					this.state.updateHistoryItem(name);
					// Se actualiza localmente en el historial
					this.props.updateName(this.state.date, this.state.uid, this.state.name);

					showMessage({
						message: body.message,
						type: "success",
						duration: 2000,
						titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
					});
				} else {
					showMessage({
						message: 'Error',
						description: body.error,
						type: "danger",
						duration: 3000,
						titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
						textStyle: { textAlign: 'center' },
					});
					return null;
				}
			})
			.catch((error) => {
				showMessage({
					message: 'Error',
					description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde' + error,
					type: "danger",
					duration: 3000,
					titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
					textStyle: { textAlign: 'center' },
				});
			});
	}

	handleNameChange = () => {
		Alert.prompt(
			"Escribe un nuevo nombre",
			"",
			[
				{
					text: "Cancelar",
					style: "cancel"
				},
				{
					text: "Aceptar",
					style: "accept",
					onPress: (name) => this.sendName(name)
				}
			],
			"plain-text",
			this.state.name.slice(0, this.state.name.length - 4), // quito la extensión
		);
	}

	_renderOptionsButton() {
		return (
			<Menu>
				<MenuTrigger>
					<IconII style={{ marginRight: 10 }} name={"ios-ellipsis-vertical"} size={25} color={COLORS.electric_blue} />
				</MenuTrigger>

				<MenuOptions optionsContainerStyle={{ borderRadius: 10 }} >
					<MenuOption style={styles.sectionHeader} onSelect={() => this.handleNameChange()}>
						<Text style={{ marginLeft: 15, fontSize: 16 }}>Cambiar nombre</Text>
						<IconII style={[styles.icon, { color: 'black' }]} name={'create-outline'} />
					</MenuOption>

					<MenuOption style={styles.sectionHeader} onSelect={() => this.handleAudioDelete()}>
						<Text style={{ marginLeft: 15, fontSize: 16, color: 'red' }}>Eliminar audio</Text>
						<IconII style={[styles.icon, { color: 'red' }]} name={'trash-outline'} />
					</MenuOption>
				</MenuOptions>
			</Menu>
		);
	}

	getDate(timestamp) {
		m = moment(timestamp);
		return m.format('LL');
	}

	getHour(timestamp) {
		m = moment(timestamp);
		return m.format('HH:mm');
	}


	handleCancel = () => {
		Keyboard.dismiss();

		this.setState({
			description: this.props.navigation.state.params.item.description,
			editing: false
		});
	}



	sendDescription = async () => {
		Keyboard.dismiss();

		data = JSON.stringify({ description: this.state.description });
		return await fetch(URL.updateDescription + this.state.uid,
			{
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.props.token
				},
				method: "PUT",
				body: data,

			})
			.then((response) => {
				return Promise.all([response.json(), response.status]);
			})
			.then(([body, status]) => {
				if (status == 201) {
					this.setState({
						editing: false
					});

					this.props.navigation.state.params.item.description = this.state.description;
					// Se actualiza localmente en el historial
					this.props.updateDescription(this.state.date, this.state.uid, this.state.description);

					showMessage({
						message: body.message,
						type: "success",
						duration: 2000,
						titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
					});
				} else {
					showMessage({
						message: 'Error',
						description: body.error,
						type: "danger",
						duration: 3000,
						titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
						textStyle: { textAlign: 'center' },
					});
					return null;
				}
			})
			.catch((error) => {
				showMessage({
					message: 'Error',
					description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
					type: "danger",
					duration: 3000,
					titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
					textStyle: { textAlign: 'center' },
				});
			});
	}


	_renderActionsInputChanges = () => (
		<View style={styles.actions}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => this.handleCancel()}
			>
				<IconII style={styles.icon} name={'close-outline'} color={COLORS.grey} />
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => this.sendDescription()}
			>
				<IconII style={styles.icon} name={'checkmark'} color={COLORS.electric_blue} />
			</TouchableOpacity>
		</View>
	);


	// Si es editable devuelve su respectivo botón, y si es compartible lo mismo
	_renderSectionActions = (editable, share) => (

		this.state.editing && editable

			? <View style={{ flexDirection: 'row' }}>
				{this._renderActionsInputChanges()}
			</View>

			: <View style={styles.actions}>
				{
					share
						? <TouchableOpacity
							style={styles.button}
							onPress={() => { }}
						>
							<IconII style={styles.icon} name={'share-social-outline'} />
						</TouchableOpacity>

						: null
				}
			</View>

	);

	// Si se ha presionado el botón de editar se transforma en un textinput
	_renderTextOrInput = (editable, text, placeholder) => (

		editable

			? <TextInput
				multiline={true}
				onFocus={() => this.setState({ editing: true })}
				style={styles.text}
				value={this.state.description}
				placeholder={placeholder}
				onChangeText={(value) => this.setState({ description: value })}
			/>

			: <Text style={styles.text}>
				{
					text === null
						? placeholder
						: text
				}
			</Text>
	);


	_renderSection = (title, text, placeholder, editable, share) => (
		<View style={styles.sectionContainer}>
			<View style={styles.sectionHeader}>
				<Text style={styles.titleHeader}>{title}</Text>
				{this._renderSectionActions(editable, share)}
			</View>

			<View style={styles.line} />

			<View style={styles.textContainer}>
				{this._renderTextOrInput(editable, text, placeholder)}
			</View>
		</View>
	);



	render = () => (
		<View style={styles.container}>
			<Text style={styles.date}> {this.state.date + ', ' + this.state.hour}</Text>

			<View style={styles.tag}>
				<Text style={styles.tagText}>
					{this.state.tag}
				</Text>
			</View>

			<ScrollView
				style={styles.scrollContainer}
				keyboardDismissMode={'on-drag'}
				keyboardShouldPersistTaps={'handle'}
			>
				{this._renderSection('Descripción', this.state.description, 'Escribe una descripción del audio...', true, false)}
				{this._renderSection('Transcripción', this.state.transcription, 'La transcripción estará disponible pronto...', false, true)}

			</ScrollView>

			<View style={styles.playerContainer}>
				<Player
					item={this.props.navigation.state.params.item}
					stream={false}
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
		borderWidth: 1,
		borderColor: COLORS.light_grey,
		width: '90%',
	},
	textContainer: {
		width: '90%',
		marginVertical: 15,
	},
	titleHeader: {
		marginVertical: 10,
		marginHorizontal: 10,
		fontSize: 23,
		fontWeight: 'bold'
	},
	text: {
		fontSize: 17,
		lineHeight: 25,
		textAlign: 'justify',
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
		height: 150,
		paddingTop: 15,
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