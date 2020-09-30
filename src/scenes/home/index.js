import React, { Component } from 'react';
import {
  View, 
  StyleSheet,
} from 'react-native';


import { ButtonScanner } from '_atoms';
import {UserInfo} from '_organisms';

class HomeScreen extends Component {


  render() {

    return (
      <View style={styles.container}>

        <View  style={styles.container}>
          <UserInfo />
        </View>

        <View style={styles.scannerContainer}>
          <ButtonScanner onPress={() => this.props.navigation.navigate('Scanner')}/>
        </View>
        
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    alignItems:'center',
  },
  scannerContainer: {
    height: 120,
    width:"100%",
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0, 0.2)',
    justifyContent: 'flex-start',
    alignItems:'center',
    backgroundColor:'white',
  },

});

export default HomeScreen;
