import React, { Component } from 'react';
import {
  View, 
  StyleSheet
} from 'react-native';

import { Switch } from '_atoms';
import { AudioList } from '_organisms';
import { ButtonScanner, ButtonAuth, ButtonRecorder, ButtonMenu } from '_atoms';

import { COLORS } from '_styles';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <View style={styles.container}>

<View style={styles.switchContainer}>
          <Switch/>
        </View>

        <AudioList/>

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
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems:'center',
  },
  switchContainer:{
    height: 80,
    width: '100%',
    backgroundColor: 'white', 
    alignItems:'center', 
    justifyContent: 'center',
    borderBottomWidth: 0,
    borderBottomColor: COLORS.grey
  },
  audiolistContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white', 
    alignItems:'center', 
    justifyContent: 'center'
  },
  scannerContainer: {
    height: 135,
    width:"100%",
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0, 0.2)',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'white',
  }

});

export default HomeScreen;
