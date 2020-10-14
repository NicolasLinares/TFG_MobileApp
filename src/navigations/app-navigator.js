import React from 'react';
import {View} from 'react-native';

import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '_scenes/home';
import ScannerScreen from '_scenes/scanner';
import RecorderScreen from '_scenes/recorder';
import HistoryScreen from '_scenes/history';
import AudioScreen from '_scenes/audio';
import SettingsScreen from '_scenes/settings';

import moment from 'moment';

const TabNavigatorConfig = {
  initialRouteName: 'Home',
  mode: 'modal'
};

const RouteConfigs = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {headerShown: false, title: ' '},
  },
  Scanner: {
    screen: ScannerScreen,
    navigationOptions: {headerShown: false, title: ' '},
  },
  Recorder: {
    screen: RecorderScreen,
    navigationOptions: {
      headerBackTitle: ' ',
      headerRight: () => <View />,
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
  History: {
    screen: HistoryScreen,
    navigationOptions: {
      headerBackTitle: ' ',
      headerRight: () => <View />,
      title: 'Historial',
      headerStyle: {
        // para esconder la línea inferior en el header
        shadowOpacity: 0, // iOS
        elevation: 0, // Android
        backgroundColor: 'white',
      },
      headerTitleStyle: {
        textAlign: 'center', // Android -  alinear título
      },
    },
  },
  Audio: {
    screen: AudioScreen,
    navigationOptions: {
      headerBackTitle: ' ',
      title: 'Nota de voz',
      headerStyle: {
        // para esconder la línea inferior en el header
        shadowOpacity: 0, // iOS
        elevation: 0, // Android
      },
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Ajustes',
      headerTitleStyle: {
        textAlign: 'center', // Android -  alinear título
      },
    },
  },
};

const AppNavigator = createStackNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;
