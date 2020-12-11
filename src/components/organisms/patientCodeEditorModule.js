import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    StatusBar,
    Alert,
    KeyboardAvoidingView
} from 'react-native';

import { COLORS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";
import ScrollModal from 'react-native-modal';

import { connect } from 'react-redux';
import { setPatientTag, openTagEditor, closeTagEditor } from '_redux_actions';
import { FilterList } from '_molecules';

import { permissionsService } from '_services';
import { checkInputService } from '_services';


class patientCodeEditorModule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tag: this.props.patientTag,
        };
    }

    componentDidMount() {
        this.props.openTagEditor();
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
            this.props.closeTagEditor();
        }
    }

    handleCancel() {
        this.props.closeTagEditor();
    }

    async handleScanner() {

        let granted = await permissionsService.checkCameraPermissions();

        if (granted) {
            this.props.closeTagEditor();
            this.props.nav.navigate('Scanner', 
                { 
                    setTag: (value) => this.setState({tag: value})
                }
            );
        }
    }

    _renderInputCode() {
        return (

            <View style={styles.card}>


                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        onPress={() => this.handleCancel()}
                    >
                        <Text style={styles.textButton}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            marginTop: 10,
                            width: 35,
                            height: 6,
                            borderRadius: 10,
                            alignSelf: 'flex-start',
                            backgroundColor: COLORS.light_grey
                        }}
                    />

                    <TouchableOpacity
                        onPress={() => this.handleAccept()}
                    >
                        <Text style={styles.textButton}>
                            Aceptar
                        </Text>
                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <View style={styles.iconContainer}>
                        <IconII style={styles.icon} name={"person"} />
                        <IconII style={[styles.icon, { marginLeft: -3 }]} name={"list"} />
                    </View>
                    <Text style={styles.title}>
                        Código de paciente
                    </Text>
                </View>



                <Text style={styles.helpText}>
                    Escanea el código del paciente {'\n'}
                    o escribe un nuevo código para {'\n'}
                    identificar las notas de voz
                </Text>

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


                {this._renderRecentCodes()}

            </View>
        );
    }

    _renderRecentCodes() {
        if (this.props.tags.length > 0)
            return (
                <View style={{ width: '100%' }}>
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

            <ScrollModal
                style={styles.modal}
                swipeDirection={"down"}
                swipeThreshold={300}
                propagateSwipe={true}
                onSwipeComplete={this.props.closeTagEditor}
                isVisible={this.props.isEditorVisible}
                avoidKeyboard={false}
                useNativeDriver={Platform.OS === 'ios' ? false : true}
            >
                <StatusBar backgroundColor="rgba(0,0,0,0.7)" barStyle="dark-content" />

                <KeyboardAvoidingView
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}
                    behavior='height'
                    enabled={Platform.OS === 'ios' ? false : true}
                    keyboardVerticalOffset={-10}
                >
                    {this._renderInputCode()}
                </KeyboardAvoidingView>

            </ScrollModal>
        )
    }

}

const styles = StyleSheet.create({
    modal: {
        zIndex: 0,
        width: '100%',
        marginVertical: 0,
        marginHorizontal: 0,
        justifyContent: 'flex-end',
    },
    card: {
        height: '90%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20
    },
    helpText: {
        marginTop: 15,
        marginBottom: 30,
        fontSize: 13,
        color: COLORS.dark_grey,
        textAlign: 'center',
    },
    actionContainer: {
        flexDirection: 'row',
        width: '90%',
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textButton: {
        fontSize: Platform.OS == 'ios' ? 18 : 15,
        height: 40,
        color: COLORS.electric_blue,
        textAlign: 'center'
    },
    iconContainer: {
        flexDirection: 'row',
        width: 45,
        height: 45,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.light_green
    },
    icon: {
        fontSize: 18,
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
        marginTop: 30,
        marginBottom: 15,
        fontSize: 18,
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
        openTagEditor: () => dispatch(openTagEditor()),
        closeTagEditor: () => dispatch(closeTagEditor()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(patientCodeEditorModule);