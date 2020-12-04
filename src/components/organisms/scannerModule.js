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

import { connect } from 'react-redux';
import { setPatientTag, openCodeEditor } from '_redux_actions';


class Scanner extends Component {

    constructor(props) {
      super(props);
      this.state = {
        flashMode: false,
      };
    }


    onScanSuccess = e => {
      this.props.setCode(e.data);
      this.props.nav.goBack('Recorder');     
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
          
          <ButtonBack onPress={ () => { this.props.nav.goBack()}}/>
        </>
      )
    };
  

    _renderMessage() {
      return (
        <View style={styles.card}>
          <Text style={styles.message}>
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
        borderRadius: 12
    },
    message: {
      textAlign: 'center', 
      color: 'white', 
      fontSize: 14, 
      marginLeft: 20, 
      marginRight: 20
    }
  });

  const mapDispatchToProps = (dispatch) => {
    return {
      setCode: (code) => dispatch(setPatientTag(code)),
      openCodeEditor: () => dispatch(openCodeEditor()),
    }
  }
  
  export default connect(null, mapDispatchToProps) (Scanner);
  