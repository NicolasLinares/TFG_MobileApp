import React, { Component } from 'react';
import {
  Text,
  Platform, 
  View,
  Image,
  TouchableOpacity,
  Switch,
  Linking,
  StyleSheet
} from 'react-native';

import { ButtonLogin } from '_atoms';
import { MyTextInput } from '_molecules';
import { COLORS } from '_styles';





class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        save: false
    };
  }

  handlerPasswordManager(value) {
    this.setState({
      save: value
    });
  }

  render() {

    return (
      
        <View style={styles.container}>

              <Image
                style={styles.logo}
                source={require('_assets/logo_invox_medical.jpg')}
              />
              
              <View width="80%">

                <MyTextInput icon='mail' placeholder='Correo electrónico'></MyTextInput>
                <MyTextInput icon='lock-closed' placeholder='Contraseña'></MyTextInput>

                <View style={{flexDirection: "row", alignSelf: 'flex-start'}}>
                  <Switch
                    
                    onValueChange={(value) => this.handlerPasswordManager(value)}
                    value={this.state.save}
                  />
                  <Text style={{
                    fontSize: 15, 
                    marginLeft: Platform.OS === 'ios' ? 10 : 8, // Para centrar el texto
                    marginTop: Platform.OS === 'ios' ? 5 : 3}}
                  > 
                    Recordar contraseña
                  </Text>
                </View>

                <ButtonLogin 
                  onPress={() => this.props.navigation.replace('Home')}
                  text='Iniciar sesión'
                  color={COLORS.blue}
                />
              </View>


              <TouchableOpacity 
                style={{marginTop: 30}}
                onPress={() => Linking.openURL("https://invoxmedical.com/rememberpassword/")}>
                <Text style={[styles.link_text, {textAlign: 'center'}]}>
                  ¿Ha olvidado el nombre de usuario {'\n'}o la contraseña?
                </Text>
              </TouchableOpacity>

              <View style={{flexDirection: "row", marginTop: 30}}>
                <Text style={{fontSize: 15}}>¿No tiene cuenta?</Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Register')}>
                  <Text style={[styles.link_text, {marginLeft: 6}]}>
                    Regístrese
                  </Text>
                </TouchableOpacity>
              </View>

        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor: 'white', 
    alignItems:'center', 
    justifyContent: 'center'
  },
  logo: {
    width: 170, 
    height: 120, 
    marginBottom: 70
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


export default LoginScreen;


// this.props.navigation.navigate('Register')
// this.props.navigation.replace('Home')


