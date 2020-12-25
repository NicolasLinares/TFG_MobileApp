/**
* @fileoverview Diseño del botón de grabación de notas de voz
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { PulseIndicator } from 'react-native-indicators';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { RecordAnimation, HiddenViewAnimation } from '_animations';
import { COLORS } from '_styles';

class RecordButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
        };
        this.ref_recordAnimation = React.createRef();
        this.ref_hiddenViewAnimation = React.createRef();
    }


    handleOnPress() {

        this.setState({ pressed: !this.state.pressed });

        // El valor de pressed no se actualiza hasta que handlePressed no acabe, por lo que
        // se le pasa el valor desactualizado de pressed
        this.ref_recordAnimation.current.animate(this.state.pressed);
        this.ref_hiddenViewAnimation.current.animate(this.state.pressed);

        // Espera 300 ms antes de iniciar la grabación de voz
        setTimeout(this.props.onPress, 300);
    }

    /*
        Contiene la información de la grabación actual, como el tiempo que lleva
        grabando. Esta vista se desbloquea cuando pulsamos el botón y se esconde
        cuando terminamos de grabar.
    */
    _renderHiddenInfo() {

        return (
            <HiddenViewAnimation ref={this.ref_hiddenViewAnimation}>
                <Text style={{ fontSize: 16, marginVertical: 15, }}>Grabando nota de voz</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ height: 40, width: 40 }}>
                        <PulseIndicator animationDuration={1000} color='rgba(255,0,0,0.4)' size={20} />
                    </View>
                    <Text style={styles.time_record}> {this.props.time} </Text>
                </View>
            </HiddenViewAnimation>
        );
    }


    /*
        Contiene el botón de grabación que permite iniciar la grabación del audio.
        Al pulsarlo se llama a handleClick que inicia las animaciones y comienza a grabar.
    */
    _renderRecordButton() {

        return (
            <TouchableWithoutFeedback
                style={styles.button}
                onPress={() => this.handleOnPress()}
            >
                <RecordAnimation ref={this.ref_recordAnimation} />
            </TouchableWithoutFeedback>
        );
    }

    render() {
        return (
            <>
                {this._renderHiddenInfo()}

                <View style={styles.container}>
                    {this._renderRecordButton()}
                </View>
            </>
        )
    }
}

const contHeight = 110;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Platform.OS === 'ios' ? contHeight + 20 : contHeight,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    button: {
        borderWidth: 3,
        borderColor: COLORS.dark_grey,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        borderRadius: 35,
        marginTop: 25
    },
    text: {
        fontSize: 25,
        marginTop: 30,
        marginBottom: 20
    },
    time_record: {
        width: 120,
        fontSize: 23,
        marginTop: 5,
        marginLeft: 5,
        paddingRight: 40
    },

});

export default RecordButton;