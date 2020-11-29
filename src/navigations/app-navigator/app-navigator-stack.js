import React from 'react';
import { View } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';

import AudioScreen from '_scenes/home/audio';

import RecorderScreen from '_scenes/recorder';
import ScannerScreen from '_scenes/recorder/scanner';
import TabsNavigator from './app-navigator-tabs';

import SettingsScreen from '_scenes/settings';
import ProfileScreen from '_scenes/settings/profile';
import SecurityScreen from '_scenes/settings/security';
import PasswordSettingScreen from '_scenes/settings/security/password';

import moment from 'moment';

const StackNavigatorConfig = {
	initialRouteName: 'Home',
	mode: 'modal'
};

const StackRouteConfigs = {
	Home: {
		screen: TabsNavigator,
		navigationOptions: { headerShown: false, title: ' ' },
	},
	Scanner: {
		screen: ScannerScreen,
		navigationOptions: { headerShown: false, title: ' ' },
	},
	Recorder: {
		screen: RecorderScreen,
		navigationOptions: {
			headerBackTitle: ' ',
			headerRight: () => <View />, // Android -  alinear título
			title: moment().format('LL'),
			headerStyle: {
				// para esconder la línea inferior en el header
				shadowOpacity: 0, // iOS
				elevation: 0, // Android
				backgroundColor: 'white',
			},
			headerTitleStyle: {
				textAlign: 'center', // Android -  alinear título
				fontWeight: '300',
				fontSize: 15
			},
		},
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
