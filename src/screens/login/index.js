import React, { Component } from 'react';
import {
	Text,
	Platform,
	View,
	Image,
	TouchableOpacity,
	Linking,
	Dimensions,
	StyleSheet
} from 'react-native';

import { AuthButton as LoginButton } from '_buttons';
import { TextInputForm } from '_forms';

import { Switch } from 'react-native-switch';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { COLORS } from '_styles';

import { connect } from 'react-redux';
import { authUser } from '_redux_actions';
import { showMessage } from "react-native-flash-message";

import { httpService } from '_services';
import * as Keychain from 'react-native-keychain';

import Spinner from 'react-native-loading-spinner-overlay';


class LoginScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			savePssw: false,
			email: '',
			password: '',

			checkCredentials: false
		};
	}

	componentWillUnmount() {
		this.setState({
			checkCredentials: false
		});
	}

	componentDidMount = async () => {

		try {
			// Retrieve the credentials
			const credentials = await Keychain.getGenericPassword();
			if (credentials) {

				this.setState({
					checkCredentials: true
				});
				console.log('Credenciales cargadas correctamente');

				// Petición al servidor para refrescar y obetener los datos del usuario
				let response = await httpService.refresh(credentials.password);

				if (response !== null) {
					this.props.setUser(
						response.user.name,
						response.user.surname,
						response.user.email,
						response.user.specialty,
						response.user.country,
						response.access_token,
					);

					await Keychain.setGenericPassword(response.user.email, response.access_token);
					console.log('Credenciales guardadas correctamente');

					this.props.navigation.navigate('App');
				} else {
					this.setState({
						checkCredentials: false
					});
				}

			} else {
				console.log('Las credenciales no se encuentran almacenadas');

			}
		} catch (error) {
			console.log("Keychain Error: ", error);
		}
	}

	rememberMe = async (remember) => {

		const options = { enableVibrateFallback: true, ignoreAndroidSystemSettings: false };
		ReactNativeHapticFeedback.trigger('impactMedium', options);

		this.setState({
			savePssw: remember
		});

		if (!remember) {
			await Keychain.resetGenericPassword();
			console.log('Credenciales eliminadas correctamente');
		}
	}


	setInputEmail = async (email) => {
		this.setState({
			email: email,
			password: '',
			savePssw: false
		});

		await Keychain.resetGenericPassword();
	}

	handleLogin = async () => {


		// Comprobación de campos escritos
		if (this.state.email === '' || this.state.password === '') {
			showMessage({
				message: 'Introduce un email y una contraseña para iniciar sesión',
				type: "danger",
				duration: 3000,
				titleStyle: [styles.topMessage, { fontSize: 18 }],
			});
			return;
		}


		// Petición al servidor
		let response = await httpService.login(this.state.email, this.state.password);

		if (response !== null) {
			this.props.setUser(
				response.user.name,
				response.user.surname,
				response.user.email,
				response.user.specialty,
				response.user.country,
				response.access_token,
				response.expires_in
			);

			if (this.state.savePssw) {
				await Keychain.setGenericPassword(this.state.email, response.access_token);
				console.log('Credenciales guardadas correctamente');
			}

			this.props.navigation.navigate('App');
		}

	}

	_renderInputs() {
		return (
			<>
				<TextInputForm
					value={this.state.email}
					onChangeText={(value) => this.setState({ email: value })}
					autoCapitalize={'none'}
					marginTop={10}
					keyboardType={'email-address'}
					textContentType={'emailAddress'}
					icon={'mail'}
					placeholder={'Correo electrónico'}
				/>

				<TextInputForm
					value={this.state.password}
					onChangeText={(value) => this.setState({ password: value })}
					autoCapitalize={'none'}
					secureTextEntry={true}
					keyboardType={'default'}
					textContentType={'none'}
					marginTop={10}
					icon={'lock-closed'}
					placeholder={'Contraseña'}
				/>

				<View style={{ flexDirection: "row", alignSelf: 'flex-start', marginTop: 20, marginLeft: 10 }}>
					<Switch
						renderActiveText={false}
						renderInActiveText={false}
						backgroundActive={'#6dcf9b'}
						circleActiveBorderColor={'#6dcf9b'}
						backgroundInactive={COLORS.grey}
						circleInactiveBorderColor={COLORS.grey}
						circleBorderWidth={1.5}
						circleSize={20}
						onValueChange={(value) => this.rememberMe(value)}
						value={this.state.savePssw}

					/>
					<Text style={{
						fontSize: 13,
						marginLeft: Platform.OS === 'ios' ? 10 : 8,
						marginTop: 3
					}}
					>
						Recordar contraseña
          			</Text>
				</View>
			</>
		);
	}

	_renderButtons() {
		return (
			<>
				<TouchableOpacity
					style={{ marginTop: 30, marginBottom: 40 }}
					onPress={() => Linking.openURL("https://invoxmedical.com/rememberpassword/")}>
					<Text style={[styles.link_text, { textAlign: 'center' }]}>
						¿Ha olvidado el nombre de usuario {'\n'}o la contraseña?
          			</Text>
				</TouchableOpacity>

				<LoginButton
					onPress={() => this.handleLogin()} //this.props.navigation.navigate('App')} 
					text='Iniciar sesión'
					color={COLORS.blue}
				/>

				<View style={{ flexDirection: "row", justifyContent: 'center', marginTop: 20, alignItems: 'center' }}>
					<Text style={{ fontSize: 15 }}>¿No tiene cuenta?</Text>
					<TouchableOpacity
						style={{ height: 40, justifyContent: 'center' }}
						onPress={() => this.props.navigation.navigate('SignIn', { onGoBack: (email) => this.setInputEmail(email) })}>
						<Text style={[styles.link_text, { marginLeft: 6 }]}>
							Regístrese
             			</Text>
					</TouchableOpacity>
				</View>
			</>
		);
	}

	render() {
		return (

			this.state.checkCredentials ?

				<Spinner
					visible={this.state.checkCredentials}
					textContent={'Cargando...'}
					textStyle={{ color: 'grey' }}
					color={'grey'}
				/>

				:

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

						<View width="80%">
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
		width: 170,
		height: 120,
		marginBottom: 40
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
	},
	topMessage: {
		textAlign: 'center',
	}
});


const mapStateToProps = (state) => {
	return {
		email: state.userReducer.email,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setUser: (name, surname, email, specialty, country, token) => dispatch(authUser(name, surname, email, specialty, country, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

