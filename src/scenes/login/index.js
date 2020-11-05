import React, { Component } from 'react';
import {
  Text,
  Platform, 
  View,
  Image,
  TouchableOpacity,
  Switch,
  Linking,
  Dimensions,
  StyleSheet
} from 'react-native';

import { ButtonAuth, TextInput} from '_atoms';
import { COLORS } from '_styles';
import { URL } from '_data';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {connect} from 'react-redux';
import { authUser } from '_redux_actions';
import { showMessage } from "react-native-flash-message";


class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      savePssw: false,
      email: 'felipe@gmail.com',
      password: '1234',
    };
  }

  handlerPasswordManager(value) {
    this.setState({
      savePssw: value,
    });
  }

  refresh = (email) => {
    this.setState({
      email: email
    });
  }

  handleLogin = () => {

    // Comprobación de campos escritos
    if (this.state.email === '' || this.state.password === '') {
      showMessage({
        message: 'Introduce un email y una contraseña para iniciar sesión',
        type: "danger",
        duration: 3000,
        titleStyle: [styles.topMessage, { fontSize: 18}],
      });
      return;
    }

    // Envío de datos al servidor.
    // Se prepara el cuerpo del mensaje y se envía
    json = {
      email: this.state.email,
      password: this.state.password
    }
    data = JSON.stringify(json);

    fetch(URL.login, 
          {
            headers: {
              'Content-Type': 'application/json'
            },
            method : "POST",
            body: data,
          })
          .then((response) => {
            return Promise.all([response.json(), response.status]);
          })
          .then(([body, status]) => {
            
            if (status == 200){ // OK
              this.props.setUser(
                body.user.name,
                body.user.surname,
                body.user.email,
                body.user.speciality,
                body.user.country,
                body.access_token
              );
              this.props.navigation.navigate('App');
              
            } else { // ERROR
              showMessage({
                message: 'Error',
                description: body.error,
                type: "danger",
                duration: 3000,
                titleStyle: {textAlign: 'center', fontWeight: 'bold', fontSize: 18},
                textStyle: {textAlign: 'center'},
              });
            }
          })
          .catch((error) => {
            showMessage({
              message: 'Error',
              description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
              type: "danger",
              duration: 3000,
              titleStyle: {textAlign: 'center', fontWeight: 'bold', fontSize: 18},
              textStyle: {textAlign: 'center'},
            });
          });

  }

  _renderInputs() {
    return (
      <>
        <TextInput
          value={this.state.email}
          onChangeText={(value) => this.setState({email: value})}
          marginTop={10} 
          icon='mail' 
          placeholder='Correo electrónico'
        />
        
        <TextInput
          onChangeText={(value) => this.setState({password: value})}
          secureTextEntry={true} 
          marginTop={10} 
          icon='lock-closed' 
          placeholder='Contraseña'
        />

        <View style={{flexDirection: "row", alignSelf: 'flex-start', marginTop:20}}>
          <Switch
            onValueChange={(value) => this.handlerPasswordManager(value)}
            value={this.state.savePssw}
          />
          <Text style={{
            fontSize: 15, 
            marginLeft: Platform.OS === 'ios' ? 10 : 8, // Tienen distinto desplazamiento y es necesario ajustarlos por separado
            marginTop: Platform.OS === 'ios' ? 5 : 3}}
          > 
            Recordar contraseña
          </Text>
        </View>
      </>
    );
  }

  _renderButtons(){
    return (
      <>
        <TouchableOpacity 
          style={{marginTop: 30, marginBottom:40}}
          onPress={() => Linking.openURL("https://invoxmedical.com/rememberpassword/")}>
          <Text style={[styles.link_text, {textAlign: 'center'}]}>
            ¿Ha olvidado el nombre de usuario {'\n'}o la contraseña?
          </Text>
        </TouchableOpacity>

        <ButtonAuth 
          onPress={() => this.handleLogin()}
          text='Iniciar sesión'
          color={COLORS.blue}
        />
        

        <View style={{flexDirection: "row", justifyContent:'center', marginTop: 20, alignItems: 'center'}}>
          <Text style={{fontSize: 15}}>¿No tiene cuenta?</Text>
          <TouchableOpacity
            style={{height: 40, justifyContent: 'center'}}
            onPress={() => this.props.navigation.navigate('SignIn',{onGoBack: (email) => this.refresh(email)})}>
              <Text style={[styles.link_text, {marginLeft: 6}]}>
                Regístrese
              </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  render() {
    return (

      <KeyboardAwareScrollView        
        style={styles.scrollview}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
      >
        <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require('_assets/logo_invox_medical.jpg')}
            />
            
            <View width="80%">
              {this._renderInputs()}
              {this._renderButtons()}
            </View>
        </View>
      </KeyboardAwareScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: 'white', 
    alignItems:'center', 
    justifyContent: 'center'
  },
  scrollview : {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: 'white', 
  },
  logo: {
    width: 170, 
    height: 120, 
    marginBottom: 40
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
  },
  topMessage: {
    textAlign: 'center',
  }
});


const mapStateToProps = (state) => {
  return {
      email: state.userReducer.email,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (name, surname, email, speciality, country, token) => dispatch(authUser(name, surname, email, speciality, country, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (LoginScreen);

