/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useEffect} from 'react';
import 'react-native-gesture-handler';
import Navigator from '_navigations';

import SplashScreen from 'react-native-splash-screen'
import { StatusBar, StyleSheet, Dimensions } from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';


class App extends Component {
  
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content"/>
        <Navigator/>
      </>
    );
  }
};

export default App;