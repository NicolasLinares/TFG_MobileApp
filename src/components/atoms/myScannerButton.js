import React, { Component } from 'react'
import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';
import IconII from "react-native-vector-icons/Ionicons";
import { COLORS } from '_styles';

class myRecorderButton extends Component {

    render() {
        return (

            <TouchableOpacity
                style={styles.button}
                onPress={this.props.onPress} 
            >
                <IconII name={"mic"} size={30} color={'red'}/>
                <Text style={styles.text}> Nueva nota de voz</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 30
    },
    text: {
        fontSize: 22, 
        color: 'black',
        marginLeft: 10
    }
});

export default myRecorderButton;