import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

class myCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shadow: this.props.shadow,
            styleShadow: null
        };
      }

    componentDidMount() {
        if (this.state.shadow) {
            this.setState({
                styleShadow: styles.shadow
            });
        }
    }

    render() {
        return (
            <View style={[{
                height: this.props.height,
                width: this.props.width, 
                marginTop: this.props.marginTop,
                marginBottom: this.props.marginBottom,
                backgroundColor: this.props.backgroundColor,
                alignItems: this.props.alignItems,
                justifyContent: this.props.justifyContent,
                borderRadius: 30,
                borderWidth: this.props.borderWidth,
                borderColor: this.props.borderColor,
            },
                this.state.styleShadow
            ]}>

                {this.props.children}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    shadow: {
        shadowRadius: 5,
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5, // Android solo funciona con elevation
    }
  });

export default myCard;