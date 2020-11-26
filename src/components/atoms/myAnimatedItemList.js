import React, { Component } from 'react'
import {
    Animated,
    Dimensions,
    Easing,
} from 'react-native';

class myAnimatedItemList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            positionX: new Animated.Value(1),
        }
    }

    componentDidMount = () => {
            Animated.timing(this.state.positionX, {
                duration: 300,
                toValue: 0,
                easing: Easing.cubic,
                useNativeDriver: true,
            }).start();
    }

    render() {
        const positionStyle = this.state.positionX.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -Dimensions.get('window').width],
        });


        return (

                <Animated.View style={
                    {
                        ...this.props.style,
                        transform: [
                            {
                                translateX: positionStyle
                            },
                        ],
                    }
                }>
                    {this.props.children}
                </Animated.View>
        )
    }
}

export default myAnimatedItemList;