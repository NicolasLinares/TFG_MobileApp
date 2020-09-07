import React, { Component } from 'react';
import {
  Text, 
  View, 
  TouchableOpacity 
} from 'react-native';

import IconII from "react-native-vector-icons/Ionicons";


class HomeScreen extends Component {

  render() {
    return (
      <>
        <View style={{flex:1, backgroundColor: 'white', alignItems:'center', justifyContent: 'center'}}>
          <View style={{ marginBottom: 50}}>
            <Text style={{ fontSize: 20}}>
              Escanear código QR
            </Text>
          </View>


          <TouchableOpacity 
            style={{alignItems:'center', justifyContent: 'center'}} 
            onPress={() => this.props.navigation.navigate('Mis notas de voz')} 
          >
            <IconII style={{marginLeft: 3}} name={"scan-outline"} size={60} color='black'/>
            <IconII style={{position: 'absolute'}} name={"qr-code-outline"} size={29} color='black'/>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

export default HomeScreen;
