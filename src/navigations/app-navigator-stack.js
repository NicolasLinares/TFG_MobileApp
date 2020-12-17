import React from 'react';
import { View } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '_screens/home';
import AudioScreen from '_screens/audio';
import RecorderScreen from '_screens/recorder';
import ScannerScreen from '_screens/scanner';

import SettingsScreen from '_screens/settings';
import ProfileScreen from '_screens/settings/profile';
import SecurityScreen from '_screens/settings/security';
import PasswordSettingScreen from '_screens/settings/security/password';

import { HeaderButtons } from '_atoms';

const StackNavigatorConfig = {
	initialRouteName: 'Home',
};

const StackRouteConfigs = {
	Home: {
		screen: HomeScreen,
		navigationOptions: ({ navigation }) => ({
			headerLeft: () => HeaderButtons.MenuButton(navigation),
			headerRight: () => HeaderButtons.OptionsButton(),
			title: 'Mis notas de voz',
			headerStyle: {
				// para esconder la línea inferior en el header
				shadowOpacity: 0, // iOS
				elevation: 0, // Android
				backgroundColor: 'white',
			},
			headerTitleStyle: {
				textAlign: 'center', // Android -  alinear título
				fontWeight: 'bold',
				fontSize: 20,
			},
		}),
	},
	Scanner: {
		screen: ScannerScreen,
		navigationOptions: { headerShown: false, title: ' ' },
	},
	Recorder: {
		screen: RecorderScreen,
		navigationOptions:  { headerShown: false, title: ' ' },
	},
	Audio: {
		screen: AudioScreen,
		navigationOptions: ({ navigation }) => ({
			headerBackTitle: ' ',
			title: navigation.state.params.title,
			headerTitleStyle: navigation.state.params.headerTitleStyle,
			headerRight: navigation.state.params.headerRight,
			headerStyle: {
				// para esconder la línea inferior en el header
				shadowOpacity: 0, // iOS
				elevation: 0, // Android
			},
		}),
	},
	Settings: {
		screen: SettingsScreen,
		navigationOptions: {
			headerBackTitle: ' ',
			headerRight: () => <View />, // Android -  alinear título
			title: 'Configuración',
			headerTitleStyle: {
				textAlign: 'center', // Android -  alinear título
			},
		},
	},
	Profile: {
		screen: ProfileScreen,
		navigationOptions: {
			headerBackTitle: ' ',
			headerRight: () => <View />, // Android -  alinear título
			title: 'Perfil',
			headerTitleStyle: {
				textAlign: 'center', // Android -  alinear título
			},
		},
	},
	Security: {
		screen: SecurityScreen,
		navigationOptions: {
			headerBackTitle: ' ',
			headerRight: () => <View />, // Android -  alinear título
			title: 'Seguridad',
			headerTitleStyle: {
				textAlign: 'center', // Android -  alinear título
			},
		},
	},
	ChangePassword: {
		screen: PasswordSettingScreen,
		navigationOptions: {
			headerBackTitle: ' ',
			headerRight: () => <View />, // Android -  alinear título
			title: 'Cambiar contraseña',
			headerStyle: {
				// para esconder la línea inferior en el header
				shadowOpacity: 0, // iOS
				elevation: 0, // Android
			},
			headerTitleStyle: {
				textAlign: 'center', // Android -  alinear título
			},
		},
	}
};

const StackNavigator = createStackNavigator(StackRouteConfigs, StackNavigatorConfig);



export default StackNavigator;
