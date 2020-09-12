import React, { Component } from 'react';
import {
    View,
    Alert,
    StyleSheet,
    Dimensions
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';


class Scanner extends Component {

    constructor(props) {
      super(props);
      this.state = {
        flashMode: false,
      };
    }


    onScanSuccess = e => {
      Alert.alert(
        "Paciente",
        e.data,
        [
          {
            text: "Cancelar",
            style: "cancel",
            onPress: () => this.props.navigation.goBack()
          },
          { text: "OK", 
            onPress: () => this.props.navigation.replace('Mis notas de voz') 
          }
        ],
        { cancelable: false }
      );
    
    };


    render() {

      return (
          <QRCodeScanner
            onRead={this.onScanSuccess}
            reactivate={false}
            showMarker
          />
      )
    };
  
  }

  export default Scanner;