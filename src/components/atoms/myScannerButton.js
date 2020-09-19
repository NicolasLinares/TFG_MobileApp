import React, { Component } from 'react'
import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';
import IconII from "react-native-vector-icons/Ionicons";
import { COLORS } from '_styles';

class myRecorderButton extends Component {

    constructor(props) {
        super(props);
    }

    handleClick() {
        this.props.onPress();
    }

    render() {
        return (

            <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleClick()} 
            >
                <IconII name={"barcode-outline"} size={40} color='black'/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgba(210,210,210, 0.6)',
        alignItems:'center',
        justifyContent:'center',
        width:120,
        height:70,
        borderRadius:45,
    },
});

export default myRecorderButton;