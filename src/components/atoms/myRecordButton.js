import React, { Component } from 'react'
import {
    Animated,
    StyleSheet,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

class myRecordButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            heightAnimated: new Animated.Value(58),
            radiusAnimated: new Animated.Value(30),
        };
    }


    animation(height, radius, duration) {
        Animated.parallel([
            Animated.timing(this.state.heightAnimated, {
                toValue: height,
                duration: duration,
                useNativeDriver: false,
            }).start(),

            Animated.timing(this.state.radiusAnimated, {
                toValue: radius,
                duration: duration,
                useNativeDriver: false,
            }).start()
        ]).start();
    }

    handleClick() {
        // Animación del botón
        if (!this.state.pressed)
            this.animation(30, 5, 300);
        else
            this.animation(58, 30, 300);
        
        this.setState({
            pressed: !this.state.pressed
        });

        this.props.onPress();
    }

    render() {
        return (
            <TouchableWithoutFeedback
                style={styles.button}
                onPress={() => this.handleClick()}
            >
                <Animated.View 
                    style={[
                        styles.recorderContainer, 
                        {
                            height: this.state.heightAnimated,
                            width: this.state.heightAnimated,
                            borderRadius: this.state.radiusAnimated
                        }
                    ]}
                />
            </TouchableWithoutFeedback>
        )
    }
}


const styles = StyleSheet.create({
    recorderContainer: {
        position: 'absolute',
        borderRadius: 30,
        backgroundColor: 'red'
    },
    button: {
      borderWidth:3,
      borderColor:'grey',
      alignItems:'center',
      justifyContent:'center',
      width:70,
      height:70,
      borderRadius:35,
      marginBottom: 40 
    },
});

export default myRecordButton;