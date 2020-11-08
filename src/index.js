/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component} from 'react';
import SplashScreen from 'react-native-splash-screen'

import { StatusBar } from 'react-native';
import Navigator from '_navigations';

import { Provider as ReduxProvider} from 'react-redux';
import store from '_redux_store';

import FlashMessage from "react-native-flash-message";

import { MenuProvider } from 'react-native-popup-menu';
import { COLORS } from '_styles';


class App extends Component {
  
  componentDidMount() {
    // Una vez cargado este componente
    // se esconde la pantalla SplashScreen
    SplashScreen.hide();
  }

  render() {
    return (
      <ReduxProvider store={store}>

        <StatusBar barStyle="dark-content"/>
        
        <FlashMessage position="top" />

        <MenuProvider>
          <Navigator/>
        </MenuProvider>
      </ReduxProvider>
    );
  }
};

export default App;