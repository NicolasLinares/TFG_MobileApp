import React, { Component } from 'react';
import { COLORS } from '_styles';

import { 
    Text, 
    StyleSheet,
    TouchableOpacity as reactTouchableOpacity
} from 'react-native';

import { TouchableOpacity as guesterTouchableOpacity } from 'react-native-gesture-handler';

const TouchableOpacity = Platform.OS ==='ios' ? reactTouchableOpacity : guesterTouchableOpacity;


class myTag extends Component {

    render() {
        return (
            <TouchableOpacity
                activeOpacity={this.props.pressed ? 0.2 : 1}
                onPress={() => this.props.pressed ? this.props.onPress(this.props.tag) : {}}
                style={[styles.item, {...this.props.style, backgroundColor: this.props.lastTagUsed === this.props.tag ? COLORS.green : COLORS.light_green }]}
            >
                <Text style={[styles.name, {...this.props.textStyle}]}> {this.props.tag}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        height: 25,
        backgroundColor: COLORS.light_green,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.green,
        marginTop: 3,
        marginRight: 10,
    },
    name: {
        textAlign: 'center',
        fontSize: 14,
        marginLeft: 5,
        marginRight: 8,
    }
});

export default myTag;