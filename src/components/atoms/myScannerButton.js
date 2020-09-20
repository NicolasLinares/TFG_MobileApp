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
                <IconII name={"scan"} size={30} color={COLORS.electric_blue}/>
                <Text style={styles.text}>   Escanear código</Text>
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
        fontSize: 18, 
        fontWeight: 'bold', 
        color: COLORS.electric_blue
    }
});

export default myRecorderButton;