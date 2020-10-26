import React from 'react';
import {View} from 'react-native';

import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '_scenes/home';
import AudioScreen from '_scenes/home/audio';

import RecorderScreen from '_scenes/recorder';
import ScannerScreen from '_scenes/recorder/scanner';

import MenuScreen from '_scenes/menu';
import ProfileScreen from '_scenes/menu/profile';
import SettingsScreen from '_scenes/menu/settings';
import PasswordSettingScreen from '_scenes/menu/settings/password';
import ContactSettingScreen from '_scenes/menu/settings/contact';

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
  Menu: {
    screen: MenuScreen,
    navigationOptions: {
      headerBackTitle: ' ',
      title: 'Menu',
      headerTitleStyle: {
        textAlign: 'center', // Android -  alinear título
      },
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      headerBackTitle: ' ',
      title: 'Perfil',
      headerTitleStyle: {
        textAlign: 'center', // Android -  alinear título
      },
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      headerBackTitle: ' ',
      title: 'Ajustes',
      headerTitleStyle: {
        textAlign: 'center', // Android -  alinear título
      },
    },
  },
  ChangePassword: {
    screen: PasswordSettingScreen,
    navigationOptions: {
      headerBackTitle: ' ',
      title: 'Cambiar contraseña',
      headerTitleStyle: {
        textAlign: 'center', // Android -  alinear título
      },
    },
  },
  ChangeData: {
    screen: ContactSettingScreen,
    navigationOptions: {
      headerBackTitle: ' ',
      title: 'Cambiar datos de contacto',
      headerTitleStyle: {
        textAlign: 'center', // Android -  alinear título
      },
    },
  },
};

const AppNavigator = createStackNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;
