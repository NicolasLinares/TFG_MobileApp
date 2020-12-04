import React, { Component } from 'react';
import {
    TextInput,
    View,
    StyleSheet,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import IconII from "react-native-vector-icons/Ionicons";
import { COLORS } from '_styles';

class myTextInput extends Component {

    constructor(props) {
        super(props);

        this.state={
            hidePassword: true,
            value: '',
            colorSelected: COLORS.grey,
            focus: false
        }
    }

    handleValueChange(value) {
        this.setState({value: value});
        this.props.onChangeText(value);
    }

    render() {
        return (
            <View style={[styles.card, {borderColor: this.state.colorSelected, marginTop: this.props.marginTop, marginBottom: this.props.marginBottom }]} >
                <IconII style={{ marginLeft: 15 }} name={this.props.icon} size={20} color={this.state.colorSelected} />

                <TextInput
                    value={this.props.value}
                    onChangeText={value => this.handleValueChange(value)}
                    style={styles.text}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={COLORS.grey}
                    autoCapitalize={'none'}
                    keyboardType={this.props.keyboardType}
                    underlineColorAndroid={"transparent"}
                    textContentType={this.props.textContentType}
                    secureTextEntry={this.props.secureTextEntry ? this.state.hidePassword : false}
                    onBlur={() => this.setState({colorSelected: COLORS.grey, focus: false})}
                    onFocus={() => this.setState({colorSelected: COLORS.green, focus: true})}
                />

                {
                    this.props.secureTextEntry  && this.state.focus && this.props.value.length > 0
                        ?
                        <TouchableWithoutFeedback
                            style={styles.eyeButton}
                            onPress={() => this.setState({hidePassword: !this.state.hidePassword})}
                        >
                            <IconII name={this.state.hidePassword ? 'eye-off' : 'eye'} size={20} color={this.state.colorSelected} />
                        </TouchableWithoutFeedback>
                        :
                        null
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    card: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 30,
        borderWidth: 1.5,
    },
    text: {
        flex:1,
        marginLeft: 15,        
        marginRight: 10,
        fontSize: 15,
        color: 'black',
    },
    eyeButton: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        marginRight: 10,
    }
});

export default myTextInput;