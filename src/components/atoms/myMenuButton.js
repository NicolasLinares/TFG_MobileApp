import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import IconII from "react-native-vector-icons/Ionicons";
import { COLORS } from '_styles';

class myMenuButton extends Component {

    render() {
        return (
            <TouchableOpacity
                style={{ alignSelf: "flex-start" }}
                onPress={this.props.onPress} 
            >
                <IconII style={{marginLeft: 10}} name={"menu-outline"} size={35} color={COLORS.electric_blue}/>
            </TouchableOpacity>
        )
    }
}

export default myMenuButton;