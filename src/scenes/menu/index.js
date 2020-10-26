import React, { Component } from 'react';
import { 
    View,
    Alert,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking
} from 'react-native';

import { COLORS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";
import { URL } from '_data';
import {connect} from 'react-redux';
import { logoutUser } from '_redux_actions';
import { showMessage } from "react-native-flash-message";

class MenuScreen extends Component {

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
            })
            .then((response) => {
              if (response.status === 200){ // OK
                return response.json();
              }
            })
            .then((data) => {
  
              if (data != null) {
                showMessage({
                    message: data.message,
                    type: "success",
                    duration: 3000,
                    titleStyle: [styles.topMessage, {fontWeight: 'bold', fontSize: 18}],
                });
                //Se limpian los datos del usuario en Redux
                setTimeout(() => this.props.cleanUserInfo(), 500);
                // TODO limpiar las listas de audio
                this.props.navigation.navigate('Auth');
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
            <ScrollView contentContainerStyle={styles.container}>
                {this._renderItem('Perfil', 'person-circle-outline', () => this.props.navigation.navigate('Profile'))}
                {this._renderItem('Ajustes', 'settings-outline', () => this.props.navigation.navigate('Settings'))}
              
                {this._renderItem('Términos y condiciones', 'information-circle-outline', () => Linking.openURL("https://invoxmedical.com/terms-of-use/"))}
                {this._renderItem('Cerrar sesión', 'log-out-outline', () => this.handleLogout() )}

            </ScrollView>
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
        cleanUserInfo: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
