import React, { Component } from 'react';
import {
  View, 
  StyleSheet
} from 'react-native';


import { AudioList } from '_organisms';
import { ButtonScanner } from '_atoms';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
  }


  render() {

    return (
      <View style={styles.container}>



        <View  style={styles.container}>
        {
        } 
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
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems:'center',
  },
  audiolistContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white', 
    alignItems:'center', 
    justifyContent: 'center'
  },
  scannerContainer: {
    height: 120,
    width:"100%",
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0, 0.2)',
    justifyContent: 'flex-start',
    alignItems:'center',
    backgroundColor:'white',
  }

});

export default HomeScreen;
