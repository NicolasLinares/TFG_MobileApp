import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet
} from 'react-native';

import IconII from 'react-native-vector-icons/Ionicons';
import { COLORS } from '_styles';



class myForwardButton extends Component {

    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={this.props.onPress} 
            >
                <View style={styles.card}>
                    <Text style={styles.text}>
                        Introducir manualmente
                    </Text>
                    <IconII style={styles.icon} name={'chevron-forward'}/>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: { 
        position: "absolute",
        alignSelf: 'center',
        bottom: 180,
        borderRadius: 35,
    },
    card: {
        flexDirection:'row',
        height: 40,
        borderRadius: 30,
        backgroundColor:'rgba(100,100,100,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
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
        marginLeft: 20,
        marginRight: 10, 
        color: COLORS.electric_blue
    },
    icon: {
        fontSize: 20,
        marginRight: 5,
        color: COLORS.electric_blue

    }
});

export default myForwardButton;