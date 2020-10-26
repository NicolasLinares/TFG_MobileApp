import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet, 
  Dimensions
} from 'react-native';

import { ButtonAuth, Picker, TextInput } from '_atoms';
import { COLORS } from '_styles';
import * as DATA from '_data';
import { URL } from '_data';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import { showMessage } from "react-native-flash-message";


class SignInScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      email: '',
      password: '',
      country: '',
      speciality: '',
    };
  }

  handleRegister = async () => {
    // Comprobación de campos escritos
    if (this.state.name === '' ||
        this.state.surname === '' || 
        this.state.email === '' || 
        this.state.password === '' || 
        this.state.speciality === '' || 
        this.state.country === ''
      ) {
        showMessage({
          message: 'Rellena todos los campos para registrarte',
          type: "danger",
          duration: 3000,
          titleStyle: [styles.topMessage, { fontSize: 18}],
        });
      return;
    }

    // Envío de datos al servidor.
    // Se prepara el cuerpo del mensaje y se envía
    data = JSON.stringify(this.state);

    fetch(URL.register, 
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method : "POST",
        body: data,
      })
      .then((response) => {
        if (response.status === 201){ // OK - Resource Created
          return response.json();
        } else if (response.status === 400){ // BAD REQUEST
          showMessage({
            message: 'Se ha producido un error',
            description: 'El email ' + this.state.email + ' ya se encuentra registrado',
            type: "danger",
            duration: 5000,
            titleStyle: [styles.topMessage, {fontWeight: 'bold', fontSize: 18}],
            textStyle: styles.topMessage,
          });
          return null;
        }
      })
      .then((data) => {

        if (data != null) {
          setTimeout(() => this.props.navigation.state.params.onGoBack(this.state.email), 500);

          showMessage({
            message: 'Usuario registrado correctamente',
            type: "success",
            duration: 2000,
            titleStyle: [styles.topMessage, {fontWeight: 'bold', fontSize: 18}],
          });

          this.props.navigation.goBack();
          
        }
      })
      .catch((error) => {
        showMessage({
          message: 'Se ha producido un error en el servidor',
          description: 'Inténtelo de nuevo más tarde',
          type: "danger",
          duration: 5000,
          titleStyle: [styles.topMessage, {fontWeight: 'bold', fontSize: 18}],
          textStyle: styles.topMessage,
        });

      });
    
  }

  _renderInputs() {
    return (
      <>
        <TextInput 
          onChangeText={(value) => this.setState({name: value})}
          icon='person' 
          placeholder='Nombre'
        />

        <TextInput 
          onChangeText={(value) => this.setState({surname: value})}
          marginTop={5} 
          icon='person' 
          placeholder='Apellidos'
        />

        {/* zIndex (altura) para superponer un Picker sobre otro y sobre los demás componentes*/}
        <View style={{...(Platform.OS !== 'android' && {zIndex: 2})}}>  
          <Picker 
            onValueChange={(value) => this.setState({speciality: value})}
            data={DATA.speciality_list} 
            marginTop={5} 
            icon='md-medkit' 
            placeholder='Especialidad médica'
          />
        </View>

        {/* se pone a una altura menor que el picker de arriba pero por encima del resto de componentes*/}
        <View style={{...(Platform.OS !== 'android' && {zIndex: 1})}}>  
          <Picker 
            onValueChange={(value) => this.setState({country: value})}
            data={DATA.country_list} 
            marginTop={5} 
            icon='location-sharp' 
            placeholder='País en el que trabaja'
          />
        </View>

        <TextInput 
          onChangeText={(value) => this.setState({email: value})}
          marginTop={5} 
          icon='mail' 
          placeholder='Correo electrónico'
        />

        <TextInput 
          onChangeText={(value) => this.setState({password: value})}
          secureTextEntry={true} 
          marginTop={5} 
          icon='lock-closed' 
          placeholder='Contraseña'
        />

      </>
    );
  }

  _renderButtons() {
    return (
      <>
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
                onPress={() => this.handleRegister()}
                text='Registrarse'
                color={COLORS.green}
                marginTop={30}
        />
      </>
    );
  }

  render() {
    return (
      <>

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
      </>
      
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
    width: 130, 
    height: 90, 
    marginBottom: 30,
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


export default SignInScreen;

