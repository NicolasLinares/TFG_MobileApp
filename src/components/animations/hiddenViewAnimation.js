/**
* @fileoverview Aminación con efecto de fade-in + movimiento en eje Y, usado en los botones de acción de los items
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import { COLORS } from '_styles';

class HiddenViewAnimation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            translateY: new Animated.Value(0),
            fadeAnim: new Animated.Value(0),
        };
    }

    animate(pressed) {
        let positionContainer;
        let fade;        
        let fadeDuration;

        if (pressed) {
            // Vista escondida
            positionContainer = 0; 
            fade = 0;
            fadeDuration = 100;
        } else {
            // Vista activa
            positionContainer = -contHeight;
            fade = 1;
            fadeDuration = 300;
        }


        Animated.parallel([
            Animated.timing(this.state.translateY, {
                toValue: positionContainer,
                duration: 200,
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

    render() {
        return (
            <Animated.View style={[styles.container,
            { transform: [{ translateY: this.state.translateY }] }]} >
                <Animated.View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', opacity: this.state.fadeAnim }}>
                    {this.props.children}
                </Animated.View>
            </Animated.View>
        )
    }
}

const contHeight = 110 + 1; // +1 para que se vea el borde superior

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        borderTopWidth: 0.5,
        borderTopColor: COLORS.grey,
        width: '100%',
        height: Platform.OS === 'ios' ? contHeight + 20 : contHeight,
        bottom: 0,
        alignItems: 'center',
        backgroundColor: 'white',
    }
});


export default HiddenViewAnimation;
