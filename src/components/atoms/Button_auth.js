import React, { Component } from 'react'
import {
    Text,
    TouchableOpacity,
} from 'react-native';

import { Card } from '_atoms';

class Button_auth extends Component {

    constructor(props) {
        super(props);
    }

    handleClick() {
        this.props.onPress();
    }

    render() {
        return (
            <TouchableOpacity 
                style={{width: "100%", 
                        alignItems:'center', 
                        marginTop: this.props.marginTop, 
                        marginBottom: this.props.marginBottom
                    }}
                onPress={() => this.handleClick()}>

                <Card
                    height={70}
                    width="100%"
                    borderColor={this.props.color}
                    borderWidth={3}
                    backgroundColor={this.props.color}
                    alignItems="center"
                    justifyContent="center"
                    shadow={true}
                >
                    <Text style={{fontSize: 20}}>{this.props.text}</Text>
                </Card>
          </TouchableOpacity>
        )
    }
}


export default Button_auth;