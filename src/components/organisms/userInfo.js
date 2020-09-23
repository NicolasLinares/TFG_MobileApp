import React, { Component } from 'react';
import { Text, View } from 'react-native';

import {connect} from 'react-redux';


class userInfo extends Component {

    render() {
        return (
            <View>
                <Text> {this.props.email}</Text>
                <Text> {this.props.password}</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        email: state.userReducer.email,
        password: state.userReducer.password
    }
}


export default connect(mapStateToProps, null)(userInfo);