import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';

import { COLORS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";
import { HeaderButtons } from '_atoms';

import { connect } from 'react-redux';
import { setPatientTag } from '_redux_actions';
import { FilterList } from '_molecules';

import { permissionsService } from '_services';
import { checkInputService } from '_services';


class PatientCodeEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tag: this.props.patientTag,
        };
    }

    handleAccept() {
        // Comprueba que no tiene espacios en blanco, tabulaciones, etc
        if (checkInputService.withBlankSpaces(this.state.tag)) {
            Alert.alert(
                'Código no válido',
                'Introduce un código de paciente sin espacios en blanco',
                [{ text: 'Aceptar' }]
            );
        } else {
            this.props.setPatientTag(this.state.tag);
            this.props.closeEditor();
        }
    }

    handleCancel() {
        this.props.closeEditor();
    }

    async handleScanner() {

        let granted = await permissionsService.checkCameraPermissions();

        if (granted) {
            this.props.nav.navigate('Scanner',
                {
                    setTag: (value) => this.setState({ tag: value })
                }
            );
        }
    }

    _renderHelpMessage() {
        return (
            <>
                <View style={styles.iconContainer}>
                    <IconII style={styles.icon} name={"person"} />
                    <IconII style={[styles.icon, { marginLeft: -3 }]} name={"list"} />
                </View>

                <Text style={styles.helpText}>
                    Escanea el código del paciente {'\n'}
                    o escribe un nuevo código para {'\n'}
                    identificar las notas de voz
                </Text>
            </>
        );
    }

    _renderInputCode() {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    maxLength={32}
                    underlineColorAndroid={'transparent'}
                    value={this.state.tag}
                    onChangeText={(value) => this.setState({ tag: value })}
                    placeholder='Escribe un código o escanéalo'
                    placeholderTextColor={COLORS.grey}
                    style={styles.textInput}
                />
                <TouchableOpacity onPress={() => this.handleScanner()}>
                    <IconII style={styles.scanIcon} name={'scan-circle'} />
                </TouchableOpacity>
            </View>
        );
    }

    _renderRecentCodes() {
        if (this.props.tags.length > 0)
            return (

                <View style={{width: '100%'}}> 
                    <Text style={styles.subtitle}>
                        Códigos recientes
                    </Text>

                    <FilterList
                        data={this.props.tags}
                        onPressTag={(tag) => this.setState({ tag: tag })}
                    />

                </View>

            );
        else
            null;
    }

    render() {
        return (

            <View style={styles.container}>

                <View style={styles.header}>
                    {HeaderButtons.CloseButton(() => this.handleCancel())}
                    <Text style={styles.title}> Código de paciente </Text>
                    {HeaderButtons.AcceptButton(() => this.handleAccept())}
                </View>

                {this._renderHelpMessage()}

                {this._renderInputCode()}

                {this._renderRecentCodes()}

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 450,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
    },
    header: {
        flexDirection: 'row',
        width: '90%',
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    helpText: {
        marginTop: 15,
        marginBottom: 30,
        fontSize: 13,
        color: COLORS.dark_grey,
        textAlign: 'center',
    },

    iconContainer: {
        flexDirection: 'row',
        width: 60,
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.light_green,
        borderWidth: 0.5,
        borderColor: COLORS.green
    },
    icon: {
        fontSize: 23,
        color: COLORS.green,
    },
    inputContainer: {
        flexDirection: 'row',
        width: '75%',
        height: 40,
        backgroundColor: COLORS.light_grey,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInput: {
        width: '75%',
        marginLeft: 20,
        textAlign: 'center',
        fontSize: 14,
        color: COLORS.electric_blue,
    },
    scanIcon: {
        fontSize: 35,
        color: COLORS.electric_blue,
        marginRight: 5
    },
    subtitle: {
        marginTop: 40,
        marginBottom: 15,
        fontSize: 16,
        fontWeight: '400',
        alignSelf: 'center',
        color: 'rgb(40,40,40)',
    },
});


const mapStateToProps = (state) => {
    return {
        patientTag: state.patientCodeReducer.tag,
        tags: state.tagsReducer.tags,
        isEditorVisible: state.patientCodeReducer.isEditorVisible,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPatientTag: (tag) => dispatch(setPatientTag(tag)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientCodeEditor);