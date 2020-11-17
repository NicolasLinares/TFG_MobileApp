import React, { Component } from 'react';
import {
	View,
	Alert,
	ScrollView,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

import { COLORS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import { logoutUser, cleanHistory } from '_redux_actions';

import { authRequestService } from '_services';


class SettingsScreen extends Component {

	handleLogout = async () => {
		await Alert.alert(
			'Cerrar sesión',
			'¿Seguro que desea cerrar la sesión?',
			[
				{
					text: 'Cancelar',
					style: 'cancel',
				},
				{
					text: 'Salir',
					onPress: async () => {

						let response = await authRequestService.logout();

						if (response !== null) {
							//Se limpian los datos del usuario en Redux
							this.props.cleanUserInfo();
							// Se vacía el historial de audios
							this.props.cleanHistory();
							this.props.navigation.navigate('Auth');
						}
					}
				}
			]
		);
	}

	_renderItem(name, icon, onPress) {
		return (
			<View style={styles.itemContainer}>
				<TouchableOpacity
					onPress={() => onPress()}
					style={styles.item}
				>
					<IconII style={styles.icon} name={icon} />
					<Text style={styles.name}>{name}</Text>
				</TouchableOpacity>
				<View style={styles.divider} />
			</View>
		);
	}


	render() {
		return (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<ScrollView contentContainerStyle={styles.container}>
					{this._renderItem('Perfil', 'person-circle-outline', () => this.props.navigation.navigate('Profile'))}
					{this._renderItem('Seguridad', 'shield-checkmark-outline', () => this.props.navigation.navigate('Security'))}

					{this._renderItem('Ayuda', 'help-circle-outline', () => { })}
					{this._renderItem('Información', 'information-circle-outline', () => { })}

					{this._renderItem('Cerrar sesión', 'log-out-outline', () => this.handleLogout())}

				</ScrollView>
				<View style={styles.copyright}>
					<Text style={{ fontSize: 15 }}>
						Invox Medcorder {'\u00A9'} 2020
              </Text>
				</View>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	itemContainer: {
		width: '100%',
	},
	item: {
		height: 60,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	icon: {
		fontSize: 25,
		marginHorizontal: 20,
		color: COLORS.light_electric_blue
	},
	name: {
		fontSize: 18,
		width: '65%',
	},
	divider: {
		alignSelf: 'flex-end',
		width: '95%',
		borderWidth: 0.5,
		borderColor: COLORS.light_grey
	},

	copyright: {
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 50
	}
});

const mapStateToProps = (state) => {

	return {
		name: state.userReducer.name,
		token: state.userReducer.token,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		cleanUserInfo: () => dispatch(logoutUser()),
		cleanHistory: () => dispatch(cleanHistory())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
