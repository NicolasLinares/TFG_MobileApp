import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';

import IconII from 'react-native-vector-icons/Ionicons';
import { COLORS } from '_styles';



class myBackButton extends Component {

    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={this.props.onPress} 
            >
                <View style={styles.card}>
                    <IconII  name={"chevron-back"} size={30} color={COLORS.electric_blue}/>
                    <Text style={styles.text}>Cancelar</Text>
                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: { 
        position: "absolute",
        left: 30,
        bottom: 90,
        borderRadius: 35,
    },
    card: {
        flexDirection:'row',
        height: 40,
        width: 130,
        borderRadius: 30,
        marginLeft: 15,
        backgroundColor:'rgba(100,100,100,0.7)',
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowRadius: 5,
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5, // Android solo funciona con elevation
    },
    text: {
        fontSize: 20, 
        marginRight: 15, 
        color: COLORS.electric_blue
    }
});

export default myBackButton;