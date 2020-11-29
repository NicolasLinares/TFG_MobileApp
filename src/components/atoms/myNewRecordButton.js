import React, { Component } from 'react'
import {
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import IconMI from "react-native-vector-icons/MaterialIcons";

class myNewRecordButton extends Component {

    render() {
        return (

            <TouchableOpacity
                style={styles.button}
                onPress={this.props.onPress}
            >
                <IconMI style={{marginTop: 5}} name={'mic'} size={40} color={'white'} />
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        height: 70,
        width: 70,
        backgroundColor: 'rgba(255, 30, 60, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        bottom: 30,
        right: 30
    },
});

export default myNewRecordButton;