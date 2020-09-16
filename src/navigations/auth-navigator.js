import React from 'react';

import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '_scenes/login';
import SignInScreen from '_scenes/signin';
import HomeScreen from '_scenes/home';

import { ButtonMenu } from '_atoms';

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
    navigationOptions: {title: '', 
                        headerLeft: () => (<ButtonMenu/>)}
                      }
};

const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);

export default AuthNavigator;