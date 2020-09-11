import React, { Component } from 'react';
import {
  Text, 
  View, 
  TouchableOpacity 
} from 'react-native';


class LoginScreen extends Component {

  render() {
    return (
      
        <View style={{flex:1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>

            <TouchableOpacity
              onPress={() => this.props.navigation.replace('Home')} 
            >
              <Text style={{ fontSize: 20}}>
                  Login
              </Text>
          </TouchableOpacity>
        </View>
      
    );
  }
}

export default LoginScreen;
