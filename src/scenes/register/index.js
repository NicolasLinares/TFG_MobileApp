import React, { Component } from 'react';

import {
  Text, 
  View, 
  TouchableOpacity 
} from 'react-native';



class RegisterScreen extends Component {

  render() {
    return (
      
        <View style={{flex:1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>

            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}>
              <Text style={{ fontSize: 20}}>
                  Register
              </Text>
          </TouchableOpacity>

        </View>
      
    );
  }
}

export default RegisterScreen;
