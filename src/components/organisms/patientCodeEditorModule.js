import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    StatusBar,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';

import { COLORS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";
import Modal from 'react-native-modal';

import { connect } from 'react-redux';
import { setPatientTag, openTagEditor, closeTagEditor } from '_redux_actions';


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
        this.props.setPatientTag(this.state.tag);
        this.props.closeTagEditor();
    }

    handleCancel() {
        this.props.closeTagEditor();
    }

    handleScanner() {
        this.props.closeTagEditor();
        this.props.nav.replace('Scanner');
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


                <View style={styles.iconContainer}>
                    <IconII style={styles.icon} name={"person"} />
                    <IconII style={styles.icon} name={"list"} />
                </View>


                <Text style={styles.helpTitle}>
                    Código de paciente
                </Text>

                <Text style={styles.helpText}>
                    Escanea el código del paciente {'\n'}
                    o escribe un nuevo código para {'\n'}
                    identificar las notas de voz
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
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

            </View>
        );
    }

    render() {

        return (

            <Modal
                style={styles.modal}
                swipeDirection="down"
                swipeThreshold={300}
                onSwipeComplete={this.props.closeTagEditor}
                isVisible={this.props.isEditorVisible}
                avoidKeyboard={false}
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
            </Modal>
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
    helpTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
    },
    helpText: {
        marginTop: 15,
        marginBottom: 30,
        fontSize: 15,
        color: COLORS.dark_grey,
        textAlign: 'center',
    },
    actionContainer: {
        flexDirection: 'row',
        width: '90%',
        height: 60,
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
        marginTop: Platform.OS === 'ios' ? 20 : 10,
        width: 65,
        height: 65,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.light_green
    },
    icon: {
        fontSize: 23,
        color: COLORS.green
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
});


const mapStateToProps = (state) => {
    return {
        patientTag: state.patientCodeReducer.tag,
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