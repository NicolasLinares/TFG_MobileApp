import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Platform,
} from 'react-native';

import { COLORS } from '_styles';
import {connect} from 'react-redux';

class ProfileView extends Component {

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
                    <Text style={styles.spec}>{this.props.specialty}</Text>
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
        height: Platform.OS === 'ios' ? 90 : 70,
        width: Platform.OS === 'ios' ? 90 : 70,
        borderWidth: 3,
        borderRadius: 60,
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
        fontWeight: '500',
        textAlign: 'center'
    },
    spec: {
        marginTop: 5,
        fontSize: 14,
        color: 'grey',
        textAlign: 'center'

    }

});


const mapStateToProps = (state) => {

    return {
        name: state.userReducer.name,
        surname: state.userReducer.surname,
        specialty: state.userReducer.specialty
    }
}


export default connect(mapStateToProps, null)(ProfileView);