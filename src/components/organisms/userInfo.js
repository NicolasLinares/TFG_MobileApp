import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native';

import { COLORS, CONSTANTS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";

import {connect} from 'react-redux';


class userInfo extends Component {

    render() {
        return (
            <View style={styles.item}>
                <IconII style={styles.icon} name={"person-circle"} size={50} color={COLORS.grey}/>
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>Dr. Nicolás Linares</Text>
                    <Text style={styles.spec}>Medicina física y rehabilitación</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        marginHorizontal: CONSTANTS.marginHorizontalItemList,
        marginVertical: CONSTANTS.marginVerticalItemList + 10,
    },
    icon: {
        marginHorizontal: 20
    },
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginVertical: 15,
        width: '70%'
    },
    name: {
        fontSize: 23
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