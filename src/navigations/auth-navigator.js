import React from 'react';

import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '_scenes/login';
import RegisterScreen from '_scenes/register';
import HomeScreen from '_scenes/home';

import { ButtonMenu } from '_molecules';

const AuthNavigatorConfig = {
  initialRouteName: 'Login',
};

const RouteConfigs = {
  Login:{
    screen: LoginScreen,
    navigationOptions: {headerShown: false}
  },
  Register:{
    screen: RegisterScreen,
    navigationOptions: {headerShown: true, title: ""}
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {headerShown: true, title: "", headerLeft: () => (<ButtonMenu/>)}
  },
};


const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);

export default AuthNavigator;