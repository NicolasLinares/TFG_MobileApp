import React from 'react';
import { View } from 'react-native';

import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '_scenes/login';
import SignInScreen from '_scenes/signin';
import HomeScreen from '_scenes/home';

import { ButtonMenu } from '_atoms';
import { COLORS } from '_styles';

const AuthNavigatorConfig = {
  initialRouteName: 'Login',
  
};

const RouteConfigs = {
  Login:{
    screen: LoginScreen,
    navigationOptions: {headerShown: false}
  },
  SignIn:{
    screen: SignInScreen,
    navigationOptions: {headerShown: false}
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {title: ' ',
                        headerLeft: () => (<ButtonMenu/>),
                        headerRight: () => (<View/>), // Android -  alinear título 
                        headerStyle: { // para esconder la línea inferior en el header
                            shadowOpacity: 0, // iOS
                            elevation: 0, // Android
                        },
                        headerTitleStyle: {
                            textAlign: 'center', // Android -  alinear título 
                        }
                      }}
};

const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);

export default AuthNavigator;