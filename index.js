/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'; // Permite el swipe del Drawer en Android

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));