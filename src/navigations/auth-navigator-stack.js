/**
* @fileoverview Aquí se define el stack de navegación para el inicio de sesión y el registro
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '_screens/login';
import SignInScreen from '_screens/signin';

const RouteConfigs = {
  Login: {
    screen: LoginScreen,
    navigationOptions: {headerShown: false},
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {headerShown: false},
  },
};

const AuthNavigatorConfig = {
  initialRouteName: 'Login',
};

const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);

export default AuthNavigator;
