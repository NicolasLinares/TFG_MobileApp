import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
} from 'react-native';

import IconII from "react-native-vector-icons/Ionicons";

import { COLORS } from '_styles';
import {connect} from 'react-redux';

class basicUserInfo extends Component {

    _renderProfilePicture = () => {
        return (
            <View style={styles.imageContainer}>
                <Text style={{fontSize: 35, color: COLORS.green, fontWeight: '400' }}>
                    {this.props.name != null ? this.props.name[0] : ''}
                </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderProfilePicture()}
                <View style={styles.infoContainer}>
                    <Text style={styles.name}> {this.props.name + ' ' + this.props.surname}</Text>
                    <Text style={styles.spec}>{this.props.speciality}</Text>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        height: 90,
        width: 90,
        borderWidth: 3,
        borderRadius: 45,
        borderColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        width: '90%',
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
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
        name: state.userReducer.name,
        surname: state.userReducer.surname,
        speciality: state.userReducer.speciality
    }
}


export default connect(mapStateToProps, null)(basicUserInfo);