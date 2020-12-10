import React, { Component } from 'react';
import { 
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { COLORS } from '_styles';

import {connect} from 'react-redux';
import { editUser } from '_redux_actions';

class ProfileScreen extends Component {

    constructor(props) {
        super(props);
    }

    _renderTitle(name) {
        return (
            <View style={styles.titleContainer}>
                <View style={styles.titleItem}>
                    <Text style={styles.title}>{name}</Text>
                </View>
            </View>
        );
    }

    _renderItem(name, value, onPress) {
        return (
            <View style={styles.item}>
              <TouchableOpacity
                    onPress={() => onPress()}
                    style={styles.itemContainer}
                >
                    <View style={styles.field}>
                        <Text style={styles.nameField}>{name}</Text>
                    </View>
                    <Text style={styles.value}>{value}</Text>
                </TouchableOpacity>
                <View style={styles.divider}/>
            </View>
        );
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {this._renderTitle('')}
                {this._renderItem('Nombre', this.props.name, () => {})}
                {this._renderItem('Apellidos', this.props.surname, () => {})}
                {this._renderItem('Correo electrónico', this.props.email, () => {})}
                {this._renderItem('Especialidad médica', this.props.specialty, () => {})}
                {this._renderItem('País donde trabaja', this.props.country, () => {})}

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', 
      alignItems:'center', 
      justifyContent: 'flex-start'
    },
    titleContainer: {
        width: '100%',    
    },
    titleItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginHorizontal: 30,

    },

    item: {
        width: '95%',
    },
    itemContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    field: {
        justifyContent: 'center',
        marginLeft: 30,
    },
    nameField: {
        marginTop: 5,
        fontSize: 16,
        color: 'black'
    },
    value: {
        marginLeft: 30,
        marginVertical: 10,
        fontSize: 16,
        color: COLORS.electric_blue
    },
    divider: {
        alignSelf: 'flex-end',
        width: '95%',
        borderWidth: 0.5,
        borderColor: COLORS.light_grey
    },
    topMessage: {
        textAlign: 'center',
    }
});


const mapStateToProps = (state) => {

    return {
        name: state.userReducer.name,
        surname: state.userReducer.surname,
        email: state.userReducer.email,
        specialty: state.userReducer.specialty,
        country: state.userReducer.country,
        token: state.userReducer.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateInfo: () => dispatch(editUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
