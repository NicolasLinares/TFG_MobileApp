import React, { Component } from 'react'
import {
    Animated,
    Easing,
} from 'react-native';

class fadeInAnimation extends Component {

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

            <Animated.View style={
                {
                    ...this.props.style,
                    opacity: this.state.fadeIn
                }
            }>
                {this.props.children}
            </Animated.View>
        )
    }
}

export default fadeInAnimation;