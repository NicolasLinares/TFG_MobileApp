import React, { Component } from 'react';
import {
    Alert,
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
        e.data, // lo que ha leido el escáner
        [
          {
            text: "Cancelar",
            style: "cancel",
            onPress: () => this.props.nav.goBack()
          },
          { text: "OK", 
            onPress: () => this.props.nav.replace('Recorder') 
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