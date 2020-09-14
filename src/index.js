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

class App extends Component {
  
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Navigator />
    );
  }
};

export default App;