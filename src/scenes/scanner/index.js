import React, { Component } from 'react';
import { 
  Text, 
  StyleSheet,
  View
} from 'react-native';

import { Scanner } from '_organisms';
import { ButtonBack } from '_atoms';
import { COLORS } from '_styles';

class ScannerScreen extends Component {

  render() {
    return (
      <>

        <Scanner/>

        <View style={styles.card}>
          <Text style={{color: 'white', fontSize: 16, marginLeft: 20, marginRight: 20,}}>
            Encuentra un código para escanearlo
          </Text>
        </View>

        <ButtonBack onPress={ () => { this.props.navigation.goBack() }}/>
      </>
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

export default ScannerScreen;
