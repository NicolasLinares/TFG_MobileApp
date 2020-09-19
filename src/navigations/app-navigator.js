import React from 'react';
import { View } from 'react-native';

import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '_scenes/login';
import HomeScreen from '_scenes/home';
import ScannerScreen from '_scenes/scanner';
import RecorderScreen from '_scenes/recorder';

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
    navigationOptions: {title: 'Notas de voz',
                        headerLeft: () => (<ButtonMenu/>),
                        headerRight: () => (<View/>), // Android -  alinear título 
                        headerStyle: { // para esconder la línea inferior en el header
                            shadowOpacity: 0, // iOS
                            elevation: 0, // Android
                        },
                        headerTitleStyle: {
                            textAlign: 'center', // Android -  alinear título 
                        }
                      }
  },
  Scanner:{
    screen: ScannerScreen,
    navigationOptions: {headerShown: false}
  },
  Recorder: {
    screen: RecorderScreen,
    navigationOptions: {headerBackTitle: "", 
                        title: "Mis notas de voz",
                        headerStyle: { // para esconder la línea inferior en el header
                          shadowOpacity: 0, // iOS
                          elevation: 0, // Android
                      },
                      }
  }
};

const AppNavigator = createStackNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;

