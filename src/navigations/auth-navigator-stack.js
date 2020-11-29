import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '_scenes/login';
import SignInScreen from '_scenes/signin';

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
