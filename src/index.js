/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen'

import { Platform, StatusBar } from 'react-native';
import Navigator from '_navigations';

import { Provider as ReduxProvider } from 'react-redux';
import store from '_redux_store';

import FlashMessage from "react-native-flash-message";

import { MenuProvider } from 'react-native-popup-menu';



class App extends Component {

	componentDidMount() {
		// Una vez cargado este componente
		// se esconde la pantalla SplashScreen
		SplashScreen.hide();

		if (Platform.os === 'android') {
			StatusBar.setBarStyle('dark-content')
			StatusBar.setBackgroundColor('white');
		}
	}

	render() {
		return (
			<ReduxProvider store={store}>

				<StatusBar backgroundColor="white" barStyle="dark-content" />

				<MenuProvider>
					<Navigator />
				</MenuProvider>

				<FlashMessage position="top" />

			</ReduxProvider>
		);
	}
};

export default App;