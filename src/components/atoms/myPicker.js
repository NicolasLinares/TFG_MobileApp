import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import IconII from "react-native-vector-icons/Ionicons";
import { COLORS } from '_styles';

import RNPickerSelect from 'react-native-picker-select';


class myPicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            colorText: COLORS.grey,
            list: this.props.data
        }
    }

    handleValue(value) {
        // Gestión del color del placeholder
        if (value === null) {
            this.setState({
                colorText: COLORS.grey
            });
        } else {
            this.setState({
                colorText: 'black'
            });
        }
    }


    render() {
        return (

            <View style={[styles.card,{marginTop: this.props.marginTop, marginBottom: this.props.marginBottom}]}>
                <IconII style={{marginLeft:15}} name={this.props.icon} size={20} color={COLORS.grey}/>
                
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    placeholder={{
                        label: this.props.placeholder,
                        value: null,
                        color: COLORS.grey,
                    }}
                    textInputProps={{height:"100%", 
                                    width: "100%", 
                                    marginLeft:15, 
                                    color: this.state.colorText}}
                    onValueChange={value => this.handleValue(value)}
                    items={this.state.list}
                    style={{
                        inputAndroid: {
                            backgroundColor: 'transparent',
                            color: 'black',
                            fontSize: 15
                        },
                        inputIOS: {
                            backgroundColor: 'transparent',
                            fontSize: 15
                        },
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {        
        flexDirection: "row",
        height: 50,
        borderColor: 'grey',
        borderRadius: 30,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text: {
        fontSize: 20, 
        marginRight: 15, 
        color: COLORS.electric_blue
    },
});

export default myPicker;
