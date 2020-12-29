/**
* @fileoverview Animación con efecto fade-in, usado en el los items de la lista al aparecer
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react'
import {
    Animated,
    Easing,
} from 'react-native';

/**
 * @memberof Animations
 * @class La clase FadeInAnimation define el componente que proporciona una animación con efecto fade-in 
 * @description Este componente es usado en los items de la lista al aparecer
 * 
 *  @prop duration {number} - Duración de la animación en milisegundos
 *  @prop style {styleValue} - Diseño visual del componente pasado como un style
 */
class FadeInAnimation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fadeIn: new Animated.Value(0),
        }
    }

    componentDidMount = () => {
        Animated.timing(this.state.fadeIn, {
            duration: this.props.duration,
            toValue: 1,
            easing: Easing.cubic,
            useNativeDriver: true,
        }).start();
    }

    render() {
        return (
            <Animated.View style={{ ...this.props.style, opacity: this.state.fadeIn }}>
                {this.props.children}
            </Animated.View>
        )
    }
}

export default FadeInAnimation;