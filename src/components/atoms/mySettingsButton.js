import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import IconMI from "react-native-vector-icons/MaterialIcons";
import { COLORS } from '_styles';

class myMenuButton extends Component {

    render() {
        return (
            <TouchableOpacity
                style={{ alignSelf: "flex-start", marginTop: 15 }}
                onPress={this.props.onPress} 
            >
                <IconMI style={{marginRight: 10}} name={"settings"} size={25} color={COLORS.electric_blue}/>
            </TouchableOpacity>
        )
    }
}

export default myMenuButton;