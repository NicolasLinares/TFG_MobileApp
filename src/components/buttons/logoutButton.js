/**
* @fileoverview Diseño del botón de cerrar sesión usado en el menú desplegable
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react';
import {
    Alert,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';

import IconII from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import { logoutUser, cleanHistory } from '_redux_actions';

import { httpService } from '_services';
import * as Keychain from 'react-native-keychain';

class LogoutButton extends Component {


    handleLogout = async () => {
        await Alert.alert(
            'Cerrar sesión',
            '¿Seguro que desea cerrar la sesión?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Salir',
                    onPress: async () => {
                        await this.props.nav.closeDrawer();

                        let response = await httpService.logout();

                        if (response !== null) {
                            //Se limpian los datos del usuario en Redux
                            this.props.cleanUserInfo();
                            // Se vacía el historial de audios
                            this.props.cleanHistory();
                            // Se eliminan las credenciales almacenadas
                            await Keychain.resetGenericPassword();
                            
                            // Se vuelve al espacio de autenticación
                            this.props.nav.navigate('Auth');
                        }
                    }
                }
            ]
        );
    }



    render() {
        return (
            <TouchableOpacity
                onPress={() => this.handleLogout()}
                style={styles.container}
            >
                <IconII style={styles.icon} name={'log-out-outline'} />
                <Text style={styles.name}>Cerrar sesión</Text>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: Platform.OS === 'ios' ? 50 : 20,
    },
    icon: {
        fontSize: 20,
        color: 'red'
    },
    name: {
        fontSize: 14,
        marginHorizontal: 10,
        color: 'red'
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
