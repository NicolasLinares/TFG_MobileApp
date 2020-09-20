import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import IconII from 'react-native-vector-icons/Ionicons';
import { COLORS } from '_styles';

import { Card } from '_atoms';


class myBackButton extends Component {

    render() {
        return (
            <TouchableOpacity
                style={styles.button_back}
                onPress={this.props.onPress} 
            >

                <Card
                    flexDirection='row'
                    height={40}
                    width={130}
                    marginLeft={15}
                    backgroundColor='rgba(100,100,100,0.7)'
                    alignItems='center'
                    justifyContent='space-around'
                    shadow={false}
                >
                    <IconII  name={"chevron-back"} size={30} color={COLORS.electric_blue}/>
                    <Text style={{fontSize: 20, marginRight: 15, color: COLORS.electric_blue}}>Cancelar</Text>
                </Card>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button_back: { 
        position: "absolute",
        left: 30,
        bottom: 90,
        borderRadius: 35,
    },
});

export default myBackButton;