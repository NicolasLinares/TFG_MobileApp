import React, { Component } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import IconMI from "react-native-vector-icons/MaterialIcons";
import { COLORS } from '_styles';

class myMenuButton extends Component {

    handleButton = () => {
        Alert.alert(
          'Cerrar sesión',
          '¿Seguro que desea cerrar sesión?', // lo que ha leido el escáner
          [
            {
              text: "Cancelar",
              style: "cancel",
            },
            { text: "Cerrar sesión", 
              onPress: () => this.props.onPress()
            }
          ],
          { cancelable: false }
        );
      
      };

    render() {
        return (
            <TouchableOpacity
                style={{ alignSelf: "flex-start" }}
                onPress={this.handleButton} 
            >
                <IconMI style={{marginLeft: 10, transform: [{rotateY: '180deg'}]}} name={"logout"} size={25} color={COLORS.electric_blue}/>
            </TouchableOpacity>
        )
    }
}


export default myMenuButton;