import React, { Component } from 'react';

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet
} from 'react-native';

import { ButtonAuth, Picker } from '_atoms';
import { MyTextInput } from '_molecules';

import { COLORS } from '_styles';


class SignInScreen extends Component {


  render() {
    return (
      
      <View style={styles.container}>
            

            <Image
              style={styles.logo}
              source={require('_assets/logo_invox_medical.jpg')}
            />

            <View width="85%">

              <MyTextInput icon='person' placeholder='Nombre y apellidos'/>

              {/* zIndex (altura) para superponer un Picker sobre otro y sobre los demás componentes*/}
              <View style={{...(Platform.OS !== 'android' && {zIndex: 2})}}>  
                <Picker marginTop={10} icon='md-medkit' placeholder='Especialidad médica'/>
              </View>

              {/* se pone a una altura menor que el picker de arriba pero por encima del resto de componentes*/}
              <View style={{...(Platform.OS !== 'android' && {zIndex: 1})}}>  
                <Picker marginTop={10} icon='location-sharp' placeholder='País en el que trabaja'/>
              </View>

              <MyTextInput marginTop={10} icon='mail' placeholder='Correo electrónico'/>

              <MyTextInput  marginTop={10} icon='lock-closed' placeholder='Contraseña'/>

              <View style={{flexDirection: "column", alignItems:'center', marginTop: 30}}>
                <Text style={{fontSize: 15}}>Al hacer click en "Registrarse" acepta</Text>
                <TouchableOpacity 
                  style={{flexDirection: "row"}}
                  onPress={() => Linking.openURL("https://invoxmedical.com/terms-of-use/")}
                  >
                  <Text>las </Text>
                  <Text style={styles.link_text}>condiciones de uso y la {'\n'}política de privacidad</Text>
                </TouchableOpacity>
              </View>


              <ButtonAuth
                onPress={() => this.props.navigation.goBack()}
                text='Registrarse'
                color={COLORS.green}
                marginTop={30}
              />

            </View>

      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    alignItems:'center', 
    justifyContent: 'center'
  },
  logo: {
    width: 170, 
    height: 120, 
    marginBottom: 20,
  },
  link_text: {
    fontSize: 15, 
    color: '#1f8d99',
    shadowRadius: 1,
    shadowColor: 'rgb(230, 230, 230)',
    shadowOpacity: 1,
    shadowOffset: {
        width: 0,
        height: 1,
    },
    elevation: 5, // Android solo funciona con elevation
  }
});

export default SignInScreen;
