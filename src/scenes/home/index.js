import React, { Component } from 'react';
import {
  View, 
  StyleSheet,
} from 'react-native';


import { ButtonNewRecord, ButtonSettings } from '_atoms';
import {UserInfo, HistoryList} from '_organisms';

class HomeScreen extends Component {


  constructor(props) {
    super(props);
  }


  send = async (audio) => {
    data = JSON.stringify(audio);
    return await fetch(URL.sendAudio, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.token
        },
        method : "POST",
        body: data,
      })
      .then((response) => {

        return Promise.all([response.json(), response.status]);
      })
      .then(([body, status]) => {
        if (status == 201) {
          return body;
        } else {
          showMessage({
            message: 'Error',
            description: body.error,
            type: "danger",
            duration: 3000,
            titleStyle: {textAlign: 'center', fontWeight: 'bold', fontSize: 18},
            textStyle: {textAlign: 'center'},
          });
          return null;
        }
      })
      .catch((error) => {
        showMessage({
          message: 'Error',
          description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
          type: "danger",
          duration: 3000,
          titleStyle: {textAlign: 'center', fontWeight: 'bold', fontSize: 18},
          textStyle: {textAlign: 'center'},
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.container}>
          <View style={styles.header}>
            <UserInfo />
            <ButtonSettings onPress={() => this.props.navigation.navigate('Settings')}/>
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