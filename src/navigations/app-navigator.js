import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '_scenes/login';
import HomeScreen from '_scenes/home';
import ScannerScreen from '_scenes/scanner';
import RecorderScreen from '_scenes/myAudioList';

import { ButtonMenu } from '_atoms';


const TabNavigatorConfig = {
  initialRouteName: 'Home',
};

const RouteConfigs = {
  Login: {
    screen: LoginScreen,
    navigationOptions: {headerShown: false}
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {headerShown: true, title: "", headerLeft: () => ( <ButtonMenu/>)}
  },
  Scanner:{
    screen: ScannerScreen,
    navigationOptions: {headerShown: false}
  },
  Recorder: {
    screen: RecorderScreen,
    navigationOptions: {headerBackTitle: "", title: "Mis notas de voz"}
  }
};

const AppNavigator = createStackNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;

