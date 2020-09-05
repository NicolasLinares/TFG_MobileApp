import React, { Component } from 'react';
import {
    View,
    Alert
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';


class QRScanner extends Component {

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
            onPress: () => this.props.navigation.replace('Notas de voz') 
          }
        ],
        { cancelable: false }
      );
    
    };


    render() {

      return (

          <QRCodeScanner
            onRead={this.onScanSuccess}
            showMarker
            reactivate={true}
          />

      )
    };
  
  }

  export default QRScanner;