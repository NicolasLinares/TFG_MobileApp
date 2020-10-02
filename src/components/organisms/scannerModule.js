import React, { Component } from 'react';
import {
    Alert,
    Text, 
    StyleSheet,
    View
} from 'react-native';

import { ButtonBack } from '_atoms';
import { COLORS } from '_styles';
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
        <>
          <QRCodeScanner
            onRead={this.onScanSuccess}
            reactivate={false}
            showMarker
          />

          {this._renderMessage()}

          <ButtonBack onPress={ () => { this.props.nav.replace('Recorder') }}/>
        </>
      )
    };
  

    _renderMessage() {
      return (
        <View style={styles.card}>
          <Text style={{color: 'white', fontSize: 16, marginLeft: 20, marginRight: 20,}}>
            Encuentra un código para escanearlo
          </Text>
        </View>
      );
    }

  }


  const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        top: 120, 
        alignSelf: 'center',
        backgroundColor: COLORS.dark_grey,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30
    }
  });

  export default Scanner;