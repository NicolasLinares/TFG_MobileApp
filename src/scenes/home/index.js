import React, { Component } from 'react';
import {
  View, 
  StyleSheet
} from 'react-native';

import { Switch } from '_atoms';
import { COLORS } from '_styles';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <>
        <View style={styles.switchContainer}>
          <Switch/>
        </View>

        <View style={styles.audiolistContainer}>
        
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  switchContainer:{
    height: 80, 
    backgroundColor: 'white', 
    alignItems:'center', 
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey
  },
  audiolistContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white', 
    alignItems:'center', 
    justifyContent: 'center'
  },

});

export default HomeScreen;
