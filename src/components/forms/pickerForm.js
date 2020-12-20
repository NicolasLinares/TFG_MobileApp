import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import IconII from "react-native-vector-icons/Ionicons";
import { COLORS } from '_styles';

import RNPickerSelect from 'react-native-picker-select';


class PickerForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            colorText: COLORS.grey,
            list: this.props.data,
            colorSelected: COLORS.grey,
        }
    }

    // El color se simula porque no viene por defecto
    handleValue(value) {
        // Gestión del color del placeholder
        if (value === null) {
            this.setState({
                colorText: COLORS.grey
            });
        } else {
            this.props.onValueChange(value);
            this.setState({
                colorText: 'black'
            });
        }
    }


    render() {
        return (

            <View style={[styles.card, { borderColor: this.state.colorSelected, marginTop: this.props.marginTop, marginBottom: this.props.marginBottom }]} >
                <IconII style={{ marginLeft: 15 }} name={this.props.icon} size={20} color={this.state.colorSelected} />

                <RNPickerSelect
                    items={this.state.list}                    
                    onValueChange={value => this.handleValue(value)}
                    placeholder={{
                        label: this.props.placeholder,
                        value: null,
                        color: COLORS.grey,
                    }}
                    textInputProps={{
                        height: "100%",
                        width: "100%",
                        marginLeft: 15,
                        color: this.state.colorText,
                    }}
                    onOpen={() => this.setState({ colorSelected: COLORS.green })} 
                    onClose={() => this.setState({ colorSelected: COLORS.grey })} // iOS only
                    style={{
                        inputAndroid: {
                            color: 'black',
                            fontSize: 15,
                            minWidth: '85%',
                            maxWidth: "85%",
                        },
                        inputIOS: {
                            fontSize: 15,
                            minWidth: '85%',
                            maxWidth: "85%",
                        },
                    }}
                    useNativeAndroidPickerStyle={false}
                    fixAndroidTouchableBug={true}
                    doneText={'Hecho'}
                    
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        height: 50,
        borderRadius: 30,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    text: {
        fontSize: 20,
        marginRight: 15,
        color: COLORS.electric_blue
    },
});

export default PickerForm;
