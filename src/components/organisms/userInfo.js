import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
} from 'react-native';

import IconII from "react-native-vector-icons/Ionicons";

import { COLORS } from '_styles';
import {connect} from 'react-redux';

class userInfo extends Component {

    render() {
        return (
            <View style={styles.container}>
                <IconII style={styles.icon} name='person-circle' />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>Dr. Linares La Barba</Text>
                    <Text style={styles.spec}>Medicina física y rehabilitación</Text>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    icon: {
        fontSize: 45,
        marginLeft: 20,
        color: COLORS.grey
    },
    infoContainer: {
        width: '80%',
        marginVertical: 15,
        marginHorizontal: 10
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