import React, { Component } from 'react';
import { 
    View,
    Alert,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { COLORS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";
import { URL } from '_data';
import {connect} from 'react-redux';
import { logoutUser, cleanHistory } from '_redux_actions';
import { showMessage } from "react-native-flash-message";

import {fetch} from 'react-native-ssl-pinning';


class SettingsScreen extends Component {

    handleLogout = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Seguro que desea cerrar la sesión?',
            [
              {
                text: 'Cancelar',
                style: 'cancel',
              },
              { text: 'Salir', 
                onPress: () => this.logout()
              }
            ],
            { cancelable: false }
          );
    }

    logout = () => {

        fetch(URL.logout, 
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
              },
              method : "POST",
              body: "",
              sslPinning: {
                certs: ["mycert"] // your certificates name (without extension), for example cert1.cer, cert2.cer
              },
            })
            .then((response) => {
              return Promise.all([response.json(), response.status]);
            })
            .then(([body, status]) => {
  
              if (status == 200) {
                showMessage({
                    message: body.message,
                    type: "success",
                    duration: 3000,
                    titleStyle: [styles.topMessage, {fontWeight: 'bold', fontSize: 18}],
                });
                //Se limpian los datos del usuario en Redux
                setTimeout(() => this.props.cleanUserInfo(), 500);
                
                // Se vacía el historial de audios
                this.props.cleanHistory();

                this.props.navigation.navigate('Auth');

              } else {
                showMessage({
                  message: 'Error',
                  type: "danger",
                  duration: 5000,
                  titleStyle: [styles.topMessage, {fontWeight: 'bold', fontSize: 18}],
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

    _renderItem(name, icon, onPress) {
        return (
            <View style={styles.itemContainer}>
              <TouchableOpacity
                    onPress={() => onPress()}
                    style={styles.item}
                >
                    <IconII style={styles.icon} name={icon}/>
                    <Text style={styles.name}>{name}</Text>
                </TouchableOpacity>
                <View style={styles.divider}/>
            </View>
        );
    }


    render() {
        return (
          <View style={{flex:1, backgroundColor: 'white'}}>
            <ScrollView contentContainerStyle={styles.container}>
                {this._renderItem('Perfil', 'person-circle-outline', () => this.props.navigation.navigate('Profile'))}
                {this._renderItem('Seguridad', 'shield-checkmark-outline', () => this.props.navigation.navigate('Security'))}
              
                {this._renderItem('Ayuda', 'help-circle-outline', () => {})}
                {this._renderItem('Información', 'information-circle-outline', () => {})}

                {this._renderItem('Cerrar sesión', 'log-out-outline', () => this.handleLogout() )}

            </ScrollView>
            <View style={styles.copyright}>
              <Text style={{fontSize: 15}}>
                Invox Medcorder {'\u00A9'} 2020
              </Text>
            </View>
          </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', 
      alignItems:'center', 
      justifyContent: 'flex-start'
    },
    itemContainer: {
        width: '100%',    
    },
    item: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    icon: {
        fontSize: 25,
        marginHorizontal: 20,
        color: COLORS.light_electric_blue
    },
    name: {
        fontSize: 18,
        width: '65%',
    },
    divider: {
        alignSelf: 'flex-end',
        width: '95%',
        borderWidth: 0.5,
        borderColor: COLORS.light_grey
    },
    topMessage: {
        textAlign: 'center',
    },

    copyright: {
      backgroundColor: 'white', 
      alignItems:'center', 
      justifyContent: 'center',
      paddingVertical: 50
    }
});

const mapStateToProps = (state) => {

    return {
        name: state.userReducer.name,
        token: state.userReducer.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cleanUserInfo: () => dispatch(logoutUser()),
        cleanHistory: () => dispatch(cleanHistory())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
