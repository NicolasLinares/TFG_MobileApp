import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from '_scenes/home';
import ScannerScreen from '_scenes/scanner';
import RecorderScreen from '_scenes/myAudioList';


const TabNavigatorConfig = {
  initialRouteName: 'Home',
};

const RouteConfigs = {
  Home:{
    screen: HomeScreen,
    navigationOptions: {headerShown: false}

  },
  Scanner:{
    screen: ScannerScreen,
    navigationOptions: {headerShown: false}
  },
  Recorder: {
    screen: RecorderScreen,
    navigationOptions: {headerBackTitle: " "}
  }
};

const AppNavigator = createStackNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;

