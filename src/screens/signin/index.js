import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	Linking,
	StyleSheet,
	Dimensions
} from 'react-native';

import { ButtonAuth, Picker, TextInput } from '_atoms';
import { COLORS } from '_styles';
import * as FORMDATA from '_constants';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { showMessage } from "react-native-flash-message";

import { authRequestService, checkInputService } from '_services';

import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';


class SignInScreen extends Component {


	constructor(props) {
		super(props);
		this.state = {
			name: '',
			surname: '',
			email: '',
			password: '',
			country: '',
			specialty: '',
		};
	}

	handleRegister = async () => {

		// Comprobación de campos escritos
		if (this.state.name === '' ||
			this.state.surname === '' ||
			this.state.email === '' ||
			this.state.password === '' ||
			this.state.specialty === '' ||
			this.state.country === ''
		) {
			showMessage({
				message: 'Rellena todos los campos para registrarte',
				type: "danger",
				duration: 3000,
				titleStyle: { textAlign: 'center', fontSize: 18 },
			});
			return;
		}

		if (!checkInputService.validatePassword(this.state.password))
			console.log('Contraseña no válida');
			return;

		// Petición al servidor
		let response = await authRequestService.signin(
			this.state.name,
			this.state.surname,
			this.state.email,
			this.state.password,
			this.state.specialty,
			this.state.country
		);

		if (response !== null) {
			// Se escribe en el input del Login el email para que pueda iniciar sesión en esa cuenta
			this.props.navigation.state.params.onGoBack(this.state.email);
			this.props.navigation.goBack();
		}

	}


	_renderInputs() {
		return (
			<>
				<TextInput
					onChangeText={(value) => this.setState({ name: value })}
					icon='person'
					placeholder='Nombre'
				/>

				<TextInput
					onChangeText={(value) => this.setState({ surname: value })}
					marginTop={5}
					icon='person'
					placeholder='Apellidos'
				/>

				{/* zIndex (altura) para superponer un Picker sobre otro y sobre los demás componentes*/}
				<View style={{ ...(Platform.OS !== 'android' && { zIndex: 2 }) }}>
					<Picker
						onValueChange={(value) => this.setState({ specialty: value })}
						data={FORMDATA.SPECIALTIES}
						marginTop={5}
						icon='md-medkit'
						placeholder='Especialidad médica'
					/>
				</View>

				{/* se pone a una altura menor que el picker de arriba pero por encima del resto de componentes*/}
				<View style={{ ...(Platform.OS !== 'android' && { zIndex: 1 }) }}>
					<Picker
						onValueChange={(value) => this.setState({ country: value })}
						data={FORMDATA.COUNTRIES}
						marginTop={5}
						icon='location-sharp'
						placeholder='País en el que trabaja'
					/>
				</View>

				<TextInput
					onChangeText={(value) => this.setState({ email: value })}
					marginTop={5}
					icon='mail'
					placeholder='Correo electrónico'
				/>

				<TextInput
					value={this.state.password}
					onChangeText={(value) => this.setState({ password: value })}
					secureTextEntry={true}
					keyboardType={'default'}
					textContentType={'none'}
					marginTop={10}
					icon={'lock-closed'}
					placeholder={'Contraseña'}
				/>

				<BarPasswordStrengthDisplay
					password={this.state.password}
					minLength={1}
					labelVisible={false}
					width={Dimensions.get('window').width - 100}
					barContainerStyle={{marginTop: 5, alignSelf: 'center'}}
				/>

			</>
		);
	}

	_renderButtons() {
		return (
			<>
				<View style={{ flexDirection: "column", alignItems: 'center', marginTop: 30 }}>
					<Text style={{ fontSize: 15 }}>Al hacer click en "Registrarse" acepta</Text>
					<TouchableOpacity
						style={{ flexDirection: "row" }}
						onPress={() => Linking.openURL("https://invoxmedical.com/terms-of-use/")}
					>
						<Text>las </Text>
						<Text style={styles.link_text}>condiciones de uso y la {'\n'}política de privacidad</Text>
					</TouchableOpacity>
				</View>

				<ButtonAuth
					onPress={() => this.handleRegister()}
					text='Registrarse'
					color={COLORS.green}
					marginTop={30}
				/>
			</>
		);
	}

	render() {
		return (

				<KeyboardAwareScrollView
					style={styles.scrollview}
					enableOnAndroid={true}
					extraHeight={100}
					keyboardShouldPersistTaps={'handle'} // Permite mantener el teclado aunque se haga un click fuera de él
				>

					<View style={styles.container}>

						<Image
							style={styles.logo}
							source={require('_assets/logo_invox_medical.jpg')}
						/>

						<View width="85%">
							{this._renderInputs()}
							{this._renderButtons()}
						</View>

					</View>

				</KeyboardAwareScrollView>
	

		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: Dimensions.get("window").height,
		width: Dimensions.get("window").width,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center'
	},
	scrollview: {
		height: Dimensions.get("window").height,
		width: Dimensions.get("window").width,
		backgroundColor: 'white',
	},
	logo: {
		width: 130,
		height: 90,
		marginBottom: 30,
	},
	link_text: {
		fontSize: 15,
		color: '#1f8d99',
		shadowRadius: 1,
		shadowColor: 'rgb(230, 230, 230)',
		shadowOpacity: 1,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		elevation: 5, // Android solo funciona con elevation
	}
});


export default SignInScreen;
