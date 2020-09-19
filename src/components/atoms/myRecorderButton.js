import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import IconII from "react-native-vector-icons/Ionicons";

class myRecorderButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: 'red',
            pressed: false
        };
    }

    handleClick() {
        var co = '';
        if (!this.state.pressed)
            co  = 'white';
        else
            co  = 'red';

        this.setState({
            color: co,
            pressed: !this.state.pressed
        });

        this.props.onPress();
    }

    render() {
        return (
            <TouchableOpacity 
                style={styles.button}
                onPress={() => this.handleClick()}
            >
                <View
                    style={{
                        position: 'absolute',
                        height: 58,
                        width: 58,
                        borderRadius: 30,
                        backgroundColor: this.state.color
                    }}
                />

                <IconII name={'square'} size={35} color='red'/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
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

export default myRecorderButton;