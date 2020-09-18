import React, { Component } from 'react'
import { View } from 'react-native'
import { Card } from '_atoms';
import IconII from "react-native-vector-icons/Ionicons";
import { COLORS } from '_styles';

import RNPickerSelect from 'react-native-picker-select';


class myPicker extends Component {

    constructor(props) {
        super(props);

        this.state = {
            country: null,
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
                    <View style={{width:"85%"}}>

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


                </View>
            </Card>
        )
    }
}

export default myPicker;
