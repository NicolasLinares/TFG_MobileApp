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

import { Provider } from 'react-redux';
import configureStore from '_redux_store';



const store = configureStore();

class App extends Component {
  
  componentDidMount() {
    // Una vez cargado este componente
    // se esconde la pantalla SplashScreen
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>

        <StatusBar barStyle="dark-content"/>
        <Navigator/>

      </Provider>
    );
  }
};

export default App;