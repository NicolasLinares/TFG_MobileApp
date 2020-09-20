import React, { Component } from 'react';
import { 
  Text, 
} from 'react-native';

import { Scanner } from '_organisms';
import { ButtonBack, Card } from '_atoms';
import { COLORS } from '_styles';

class ScannerScreen extends Component {

  render() {
    return (
      <>

        <Scanner/>

        <Card 
          style= {{position: 'absolute', top: 120, alignSelf: 'center' }}
          height={40}
          backgroundColor={COLORS.dark_grey}
          alignItems= 'center'
          justifyContent= 'center' 
          borderRadius= {30}
        >
          <Text style={{color: 'white', fontSize: 16, marginLeft: 20, marginRight: 20,}}>
            Encuentra un código para escanearlo
          </Text>
        </Card>

        <ButtonBack onPress={ () => { this.props.navigation.goBack() }}/>
      </>
    );
  }
}

export default ScannerScreen;
