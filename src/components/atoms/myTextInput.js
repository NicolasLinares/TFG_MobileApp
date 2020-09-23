import React, { Component } from 'react';
import {
    TextInput, 
    View,
    StyleSheet
} from 'react-native';
import IconII from "react-native-vector-icons/Ionicons";
import { COLORS } from '_styles';

class myTextInput extends Component {

    render() {
        return (
            <View style={[styles.card,{marginTop: this.props.marginTop, marginBottom: this.props.marginBottom}]} >
                <IconII style={{marginLeft:15}} name={this.props.icon} size={20} color={COLORS.grey}/>
                
                <TextInput
                    onChangeText={this.props.onChangeText}
                    style={styles.text}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={COLORS.grey}
                    secureTextEntry={this.props.secureTextEntry}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    card: {
        height: 50,
        borderColor: 'grey',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 30,
        flexDirection: 'row', 
        alignItems: 'center'
    },
    text: {
        width:'80%',
        marginLeft:15, 
        fontSize: 15, 
        color:'black'
    }
});

export default myTextInput;