import React, { Component } from 'react';
import {
  View, 
  StyleSheet,
} from 'react-native';


import { ButtonNewRecord, ButtonMenu } from '_atoms';
import {UserInfo, HistoryList} from '_organisms';

class HomeScreen extends Component {

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.container}>
          <View style={styles.header}>
            <UserInfo />
            <ButtonMenu onPress={() => this.props.navigation.navigate('Menu')}/>
          </View>
          <HistoryList nav={this.props.navigation}/>
        </View>

        <View style={styles.newRecordContainer}>
          <ButtonNewRecord onPress={() => this.props.navigation.navigate('Recorder')}/>
        </View>
        
      </View>
    );
  }
}

//        headerLeft: () => <ButtonLogout onPress={() => navigation.navigate('Auth')}/>,
//        headerRight: () => <ButtonSettings onPress={() => navigation.navigate('Settings')}/>,


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    width: '100%',
  },
  newRecordContainer: {
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
