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
