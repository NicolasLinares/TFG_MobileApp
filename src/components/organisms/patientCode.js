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

import { connect } from 'react-redux';
import { setPatientTag } from '_redux_actions';
import { openTagEditor } from '_redux_actions';


class PatientCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placeholder: 'Código necesario',
            placeholderColor: 'rgb(230, 69, 95)',
            codeColor: COLORS.electric_blue
        }
    }

    componentDidMount = () => {
        this.props.setPatientTag('');
    }

    render() {
        return (

            <TouchableOpacity 
                style={styles.item}
                onPress={() => this.props.openTagEditor()}
            >

                <View style={styles.iconContainer}>
                    <IconII style={styles.icon} name={"person"} />
                    <IconII style={styles.icon} name={"list"} />
                </View>

                <View style={styles.headerContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Identificador de paciente</Text>
                        <Text style={styles.edit}>Editar</Text>
                    </View>

                    <Text style={[styles.code,
                    { color: this.props.patientTag !== '' ? this.state.codeColor : this.state.placeholderColor }]}>
                        {this.props.patientTag !== '' ? this.props.patientTag : this.state.placeholder}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 5,
        borderRadius: 20,
        marginHorizontal: CONSTANTS.marginHorizontalItemList,
        marginVertical: CONSTANTS.marginVerticalItemList + 5,
    },
    iconContainer: {
        flexDirection: 'row',
        width: 60,
        height: 60,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.light_green
    },
    icon: {
        fontSize: 20,
        color: COLORS.green
    },
    headerContainer: {
        width: '75%',
        flexDirection: 'column',
        marginVertical: 10,
    },
    title: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginRight: 10,
    },
    edit: {
        height: 25,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 15,
        fontSize: 15,
        color: COLORS.electric_blue
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    code: {
        width: '95%',
        fontSize: 20,
    },

});


const mapStateToProps = (state) => {
    return {
        patientTag: state.patientCodeReducer.tag,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPatientTag: (tag) => dispatch(setPatientTag(tag)),
        openTagEditor: () => dispatch(openTagEditor()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientCode);
