import React, { Component } from 'react'
import {
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import IconII from "react-native-vector-icons/Ionicons";

class Button_recorder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            icon: 'mic',
            pressed: false
        };
    }

    handleClick() {
        var ic = '';
        if (!this.state.pressed)
            ic  = 'square';
        else
            ic  = 'mic';

        this.setState({
            icon: ic,
            pressed: !this.state.pressed
        });

        this.props.onPress();
    }

    render() {
        return (
            <TouchableOpacity 
                style={styles.button_record}
                onPress={() => this.handleClick()}
            >
                <IconII name={this.state.icon} size={35} color='rgb(255,70,70)'/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button_record: {
      borderWidth:3,
      borderColor:'black',
      alignItems:'center',
      justifyContent:'center',
      width:70,
      height:70,
      borderRadius:35,
      marginBottom: 40 
    },
});

export default Button_recorder;