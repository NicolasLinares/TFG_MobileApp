import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { COLORS, CONSTANTS } from '_styles';

import { PulseIndicator } from 'react-native-indicators';

class recorderButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            sizeButtonAnimated: new Animated.Value(58),
            radiusButtonAnimated: new Animated.Value(30),
            heightAnimated: new Animated.Value(0),
            fadeAnim: new Animated.Value(0),
        };
    }


    /*
        Animaciones del botón y la vista.
    */
    multipleAnimation(size, radius, duration, position, fadeDuration, fade) {
        Animated.parallel([
            Animated.timing(this.state.sizeButtonAnimated, {
                toValue: size,
                duration: duration,
                useNativeDriver: true,
            }).start(),

            Animated.timing(this.state.radiusButtonAnimated, {
                toValue: radius,
                duration: duration,
                useNativeDriver: true,
            }).start(),

            Animated.timing(this.state.heightAnimated, {
                toValue: position,
                duration: duration,
                useNativeDriver: true,
            }).start(),

            Animated.timing(this.state.fadeAnim, {
                toValue: fade,
                duration: fadeDuration,
                easing: Easing.cubic,
                useNativeDriver: true,
            }).start(),
        ]);
    }

    /*
        Acciones del botón grabar. El componente padre ha pasado la función
        del manejo de grabación y se accede a ella mediante this.props.onPress.
    */
    handleClick() {
        // Animación 'Close recorder'
        var duration = 200;
        var sizeButton = 58;
        var radiusButton = 30;
        var positionContainer = 0;
        // Los componentes se esconderán primero
        var fadeDuration = 100;
        var fade = 0;

        // Animación 'Open recorder'
        if (!this.state.pressed) {
            sizeButton = 30;
            radiusButton = 10;
            positionContainer = -CONSTANTS.heightRecorderModule / 1.5;
            // Los componentes aparecen después
            fadeDuration = 300;
            fade = 1;
        }

        this.setState({
            pressed: !this.state.pressed
        });

        this.multipleAnimation(sizeButton, radiusButton, duration, positionContainer, fadeDuration, fade);

        // Espera 300 ms antes de ejecutar la grabadora
        setTimeout(this.props.onPress, 300);

    }

    /*
        Contiene la información de la grabación actual, como el tiempo que lleva
        grabando. Esta vista se desbloquea cuando pulsamos el botón y se esconde
        cuando terminamos de grabar.
    */
    _renderHiddenInfo() {

        return (
            <Animated.View style={[containersStyles.animatedContainer,
            { transform: [{ translateY: this.state.heightAnimated }] }]} >
                <Animated.View style={{flex:1, alignItems: 'center', justifyContent: 'flex-start', opacity: this.state.fadeAnim }}>
                    <Text style={{fontSize: 16, marginVertical: 15,}}>Grabando nota de voz</Text>

                    <View style={{ flex: 1, flexDirection: 'row'}}>
                        <View style={{ height: 40, width: 40 }}>
                            <PulseIndicator animationDuration={1000} color='rgba(255,0,0,0.4)' size={20} />
                        </View>
                        <Text style={componentStyles.time_record}> {this.props.time} </Text>
                    </View>

                </Animated.View>
            </Animated.View>
        );
    }


    /*
        Contiene el botón de grabación que permite iniciar la grabación del audio.
        Al pulsarlo se llama a handleClick que inicia las animaciones y comienza a grabar.
    */
    _renderRecordButton() {
        const sizeButtonValue = this.state.sizeButtonAnimated.interpolate({
            inputRange: [30, 58],
            outputRange: [0.5, 1],
        });
        return (
            <TouchableWithoutFeedback
                style={componentStyles.button}
                onPress={() => this.handleClick()}
            >
                <Animated.View
                    style={[
                        componentStyles.animatedIcon,
                        {
                            // No está soportada la animación de la altura y anchura de un View
                            // por lo que se debe hacer con interpolación
                            transform: [
                                {
                                    scaleX: sizeButtonValue
                                },
                                {
                                    scaleY: sizeButtonValue
                                },
                            ],

                            borderRadius: this.state.radiusButtonAnimated
                        }
                    ]}
                />
            </TouchableWithoutFeedback>
        );
    }

    render() {
        return (
            <View style={containersStyles.staticContainer}>
                {this._renderHiddenInfo()}
                {this._renderRecordButton()}
            </View>
        )
    }
}



const containersStyles = StyleSheet.create({
    animatedContainer: {
        position: 'absolute',
        borderTopWidth: 0.5,
        borderTopColor: COLORS.grey,
        width: '100%',
        height: CONSTANTS.heightRecorderModule,
        bottom: 0,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    staticContainer: {
        width: '100%',
        height: CONSTANTS.heightRecorderModule,
        alignItems: 'center',
    }
});

const componentStyles = StyleSheet.create({
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
    animatedIcon: {
        height: 58,
        width: 58,
        borderRadius: 30,
        backgroundColor: 'red'
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

export default recorderButton;





