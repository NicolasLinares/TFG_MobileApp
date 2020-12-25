/**
* @fileoverview Animación del botón de grabación
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react';
import { Animated } from 'react-native';


// Círculo
const maxSize = 58;
const maxRadius = 30;

// Cuadrado
const minSize = 30;
const minRadius = 10;

class RecordAnimation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sizeButtonAnimated: new Animated.Value(58),
            radiusButtonAnimated: new Animated.Value(30),
        };
    }

    animate(pressed) {
        let size;
        let radius;

        if (pressed) {
            // Circulo (parado)
            radius = maxRadius;
            size = maxSize;
        } else {
            // Cuadrado (grabando)
            radius = minRadius;
            size = minSize;
        }


        Animated.parallel([
            Animated.timing(this.state.sizeButtonAnimated, {
                toValue: size,
                duration: 200,
                useNativeDriver: true,
            }).start(),

            Animated.timing(this.state.radiusButtonAnimated, {
                toValue: radius,
                duration: 200,
                useNativeDriver: true,
            }).start()
        ]);
    }

    render() {

        const sizeButtonValue = this.state.sizeButtonAnimated.interpolate({
            inputRange: [30, 58],
            outputRange: [0.5, 1],
        });

        return (
            <Animated.View
                style={{
                    height: 58,
                    width: 58,
                    backgroundColor: 'red',
                    borderRadius: this.state.radiusButtonAnimated,
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
                }}
            />
        )
    }
}

export default RecordAnimation;
