/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';


import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';

import IconII from "react-native-vector-icons/Ionicons";

import Scanner from './components/scanner.js';
import Recorder from './components/recorder.js';

const Stack = createStackNavigator();


const App: () => React$Node = () => {

  return (

    <NavigationContainer>
      <Stack.Navigator >

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{headerShown: false}}
        />
        
        <Stack.Screen
          name="Mis notas de voz"       
          component={Recorder}
          options={{headerBackTitle: " " }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "blue",
    height: "100%",
    width: "100%",
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.red,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: "black",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

/*
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Lector de QR"
              component={HomeScreen}
            />
            
            <Stack.Screen
              name="Notas de voz"
              component={Recorder}
            />
          </Stack.Navigator>
        </NavigationContainer>

*/




/*
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          
          <Recorder/>
        </ScrollView>


*/