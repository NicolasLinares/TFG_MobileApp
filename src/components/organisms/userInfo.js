import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { COLORS, CONSTANTS } from '_styles';
import {connect} from 'react-redux';

class userInfo extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.name}>Dr. Nicolás Linares La Barba</Text>
                <Text style={styles.spec}>Medicina física y rehabilitación</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        width: '85%',
    },
    name: {
        fontSize: 18,
        fontWeight: '500'
    },
    spec: {
        marginTop: 5,
        fontSize: 14,
        color: 'grey'
    }

});


const mapStateToProps = (state) => {

    return {
        email: state.userReducer.email,
        password: state.userReducer.password
    }
}


export default connect(mapStateToProps, null)(userInfo);