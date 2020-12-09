import React, { Component } from 'react';
import { 
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import { COLORS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import { showMessage } from "react-native-flash-message";

import {connect} from 'react-redux';

import { authRequestService } from '_services';
import * as Keychain from 'react-native-keychain';


class PasswordSettingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPassword: null,
            newPassword: null,
            repPassword: null,

            curr_wrong: false,
            new_wrong: false,
            rep_wrong: false,
            color: COLORS.grey
        }
    }


    handleButton = async () => {
        if (this.state.currentPassword === null ||
            this.state.newPassword === null ||
            this.state.repPassword === null) {

            showMessage({
                message: 'Rellena los campos para cambiar la contraseña',
                type: "danger",
                duration: 3000,
                titleStyle: {textAlign: 'center', fontSize: 18},
            });
            this.setState({
                curr_wrong: true,
                new_wrong: true,
                rep_wrong: true,
            });
            return;
        }

        if (this.state.newPassword != this.state.repPassword) {
            showMessage({
                message: 'Contraseñas distintas',
                description: 'Escribe la misma contraseña en los dos campos',
                type: "danger",
                duration: 3000,
                titleStyle: {textAlign: 'center', fontSize: 18},
                textStyle: {textAlign: 'center'},
            });
            this.setState({
                new_wrong: true,
                rep_wrong: true,
            });
            return;
        }

        if (this.state.currentPassword == this.state.newPassword) {
            showMessage({
                message: 'Contraseñas idénticas',
                description: 'La nueva contraseña no puede ser igual que la actual',
                type: "danger",
                duration: 3000,
                titleStyle: {textAlign: 'center', fontSize: 18},
                textStyle: {textAlign: 'center'},
            });
            this.setState({
                new_wrong: true,
                rep_wrong: true,
            });
            return;
        }

        //TODO comprobar que la contraseña cumple ciertos requisitos


        let status = await authRequestService.changePassword(this.state.currentPassword, this.state.newPassword);

        if (status !== null) {

            if (status == 200) {
                this.setState({
                    curr_wrong: false,
                    new_wrong: false,
                    rep_wrong: false,
                    color: COLORS.green
                });

                await Keychain.setGenericPassword(this.state.email, this.state.password);
				console.log('Credenciales guardadas correctamente');

            } else if (status == 400) {
                this.setState({
                    curr_wrong: true,
                    new_wrong: false,
                    rep_wrong: false
                });
            }
        }
    }


    _renderInput(icon, name, color, setValue) {
        return (
            <View style={styles.item}>
                <IconII style={[styles.icon, {color: color}]} name={icon}/>
                <TextInput
                    onChangeText={value => setValue(value)}
                    underlineColorAndroid={'transparent'}
                    style={styles.text}
                    placeholder={name}
                    textContentType={'oneTimeCode'} // evita el autorrelleno en ios
                    placeholderTextColor={COLORS.dark_grey}
                    secureTextEntry={true}
                    blurOnSubmit={false}
                />
            </View>
        );
    }

    _renderButton(onPress) {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => onPress()}
            >
                <Text style={{fontSize: 20}}>Cambiar</Text>
          </TouchableOpacity>
        )
    }

    render() {
        return (
            <KeyboardAwareScrollView
                style={styles.scrollview}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled
            >
                <View style={[styles.container, {paddingTop: 150}]}>
                    {this._renderInput('lock-open', 'Contraseña actual', this.state.curr_wrong ? 'red' : this.state.color, (value) => this.setState({currentPassword: value}))}
                    <View style={styles.divider}/>
                    {this._renderInput('lock-open', 'Nueva contraseña', this.state.new_wrong ? 'red' : this.state.color, (value) => this.setState({newPassword: value}))}
                    <View style={styles.divider}/>
                    {this._renderInput('lock-open', 'Repetir contraseña', this.state.rep_wrong ? 'red' : this.state.color,  (value) => this.setState({repPassword: value}))}
                    <View style={[styles.divider, {marginBottom: 60}]}/>

                    {this._renderButton(() => this.handleButton())}
                </View>
            </KeyboardAwareScrollView>
        )
    }
}


const styles = StyleSheet.create({
    scrollview : {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        backgroundColor: 'white', 
    },
    container: {
      flex: 1,
      backgroundColor: 'white', 
      alignItems:'center', 
      justifyContent: 'flex-start'
    },
    item: {
        flexDirection: 'row',
        width: '70%',
        marginTop: 25,
        marginBottom: 15,
        alignItems:'center', 
        justifyContent: 'space-around',
    },
    icon: {
        fontSize: 18,
        color: COLORS.blue
    },
    text: {
        fontSize: 19,
        width: '80%',
        marginLeft: 20,
        color: 'black'
    },
    divider: {
        width: '70%',
        borderWidth: 0.5,
        borderColor: COLORS.grey
    },

    button: {
        height: 50,
        width: "50%",
        borderRadius: 25,
        borderColor: COLORS.grey,
        backgroundColor: COLORS.blue,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        shadowRadius: 5,
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5, // Android solo funciona con elevation
    
    }
});

const mapStateToProps = (state) => {

    return {
        token: state.userReducer.token,
    }
}


export default connect(mapStateToProps, null)(PasswordSettingScreen);
