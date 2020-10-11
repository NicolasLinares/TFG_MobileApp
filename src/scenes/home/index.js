import React, { Component } from 'react';
import {
  View, 
  StyleSheet,
  Alert
} from 'react-native';


import { ButtonScanner } from '_atoms';
import {UserInfo, HistoryList} from '_organisms';

class HomeScreen extends Component {

  render() {

    return (
      <View style={styles.container}>

        <View  style={styles.container}>
          <UserInfo />
          <HistoryList nav={this.props.navigation}/>
        </View>

        <View style={styles.scannerContainer}>
          <ButtonScanner onPress={() => this.props.navigation.navigate('Recorder')}/>
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
