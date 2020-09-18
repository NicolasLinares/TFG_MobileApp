import React, { Component } from 'react';
import {
    TextInput, 
    View
} from 'react-native';
import { Card } from '_atoms';
import IconII from "react-native-vector-icons/Ionicons";
import { COLORS } from '_styles';

class myTextInput extends Component {

    constructor(props) {
        super(props);
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
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <IconII name={this.props.icon} size={20} color={COLORS.grey}/>
                    
                    <TextInput
                        style={{marginLeft:15, backgroundColor:'transparent', fontSize: 15}}
                        height={50}                         
                        width='80%'
                        placeholder={this.props.placeholder}
                        placeholderTextColor={COLORS.grey}
                        color='black'
                        secureTextEntry={this.props.secureTextEntry}
                    />
                </View>
            </Card>
        )
    }
}


export default myTextInput;