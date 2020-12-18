import React, { Component } from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';

import { COLORS } from '_styles';


class myAuthButton extends Component {

    render() {
        return (
            <TouchableOpacity
                style={[styles.card, { 
                    backgroundColor: this.props.color,
                    marginTop: this.props.marginTop, 
                    marginBottom: this.props.marginBottom
                }]}
                onPress={this.props.onPress}
            >
                <Text style={{ fontSize: 20 }}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        height: 70,
        width: "100%",
        borderRadius: 30,
        borderColor: COLORS.grey,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        shadowRadius: 5,
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5, // Android solo funciona con elevation
    }
});

export default myAuthButton;