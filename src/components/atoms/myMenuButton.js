import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import IconII from "react-native-vector-icons/Ionicons";

class myMenuButton extends Component {

    handleClick() {
        alert("go Login");
        this.props.onPress();
    }

    render() {
        return (
            <TouchableOpacity
                style={{ alignSelf: "flex-start" }}
                onPress={() => this.handleClick()} 
            >
                <IconII style={{marginLeft: 10}} name={"menu-outline"} size={35} color='black'/>
            </TouchableOpacity>
        )
    }
}

export default myMenuButton;