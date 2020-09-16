import React, { Component } from 'react'
import { Text, Platform, View, StyleSheet } from 'react-native'

import DropDownPicker from 'react-native-dropdown-picker';
import RNPickerSelect from 'react-native-picker-select';

import { Card } from '_atoms';

import IconII from "react-native-vector-icons/Ionicons";
import { COLORS } from '_styles';


class Picker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            country: null,
            colorText: COLORS.grey,
            list: [
                {label: 'Argentina', value: 'Argentina', color: 'black'},
                {label: 'Bolivia', value: 'Bolivia', color: 'black'},
                {label: 'Chile', value: 'Chile', color: 'black'},
                {label: 'Colombia', value: 'Colombia', color: 'black'},
                {label: 'Costa Rica', value: 'Costa Rica', color: 'black'},
                {label: 'Cuba', value: 'Cuba'},
                {label: 'Ecuador', value: 'Ecuador', color: 'black'},
                {label: 'El Salvador', value: 'El Salvador', color: 'black'},
                {label: 'España', value: 'España', color: 'black'},
                {label: 'Estados Unidos', value: 'Estados Unidos', color: 'black'},
                {label: 'Guatemala', value: 'Guatemala', color: 'black'},
                {label: 'Honduras', value: 'Honduras', color: 'black'},
                {label: 'México', value: 'México', color: 'black'},
                {label: 'Nicaragua', value: 'Nicaragua', color: 'black'},
                {label: 'Panamá', value: 'Panamá', color: 'black'},
                {label: 'Paraguay', value: 'Paraguay', color: 'black'},
                {label: 'Perú', value: 'Perú', color: 'black'},
                {label: 'Puerto Rico', value: 'Puerto Rico', color: 'black'},
                {label: 'República Dominicana', value: 'República Dominicana', color: 'black'},
                {label: 'Uruguay', value: 'Uruguay', color: 'black'},
                {label: 'Venezuela', value: 'Venezuela', color: 'black'},
            ]
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

            <Card
                height={50}
                marginTop={this.props.marginTop}
                marginBottom={this.props.marginBottom}
                borderWidth={0.5}
                borderColor='grey'
                alignItems="center"
                justifyContent="center"
                shadow={false}
            >

                <View style={{  flexDirection: "row",
                                alignItems: 'center',
                                width: "91%"
                            }}>
                    
                    <IconII name={this.props.icon} size={20} color={COLORS.grey}/>
                    
                    {/* Este view con width:"80%" es necesario para poder hacer click en cualquier 
                        parte del componente y que lo detecte sino solo detecta encima del texto */}
                    <View style={{width:"80%"}}>

                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            placeholder={{
                                label: this.props.placeholder,
                                value: null,
                                color: this.state.colorText,
                            }}
                            
                            textInputProps={{height:"100%", width: "100%", marginLeft:15, color: this.state.colorText}}
                            onValueChange={value => this.handleValue(value)}
                            items={this.state.list}
                            style={{
                                inputAndroid: {
                                    backgroundColor: 'transparent',
                                },
                                inputIOS: {
                                    backgroundColor: 'transparent',
                                },
                            }}
                        />

                    </View>


                </View>
            </Card>
        )
    }
}

export default Picker;
