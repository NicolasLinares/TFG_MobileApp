import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import IconII from 'react-native-vector-icons/Ionicons';
import { COLORS } from '_styles';


class LinkButton extends Component {

    render() {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => this.props.navigate()}
            >
                <IconII style={styles.icon} name={this.props.icon} />
                <Text style={styles.title}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 25,
        marginHorizontal: 20,
        color: COLORS.light_electric_blue
    },
    title: {
        fontSize: 16,
        width: '65%',
    },
});

export default LinkButton;