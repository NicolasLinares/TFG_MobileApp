import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import IconII from "react-native-vector-icons/Ionicons";
import { COLORS } from '_styles';

class myMenuButton extends Component {

    render() {
        return (
            <TouchableOpacity
                style={{ alignSelf: "flex-start", marginTop: 15 }}
                onPress={this.props.onPress} 
            >
                <IconII style={{marginRight: 10}} name={"menu"} size={30} color={COLORS.electric_blue}/>
            </TouchableOpacity>
        )
    }
}

export default myMenuButton;