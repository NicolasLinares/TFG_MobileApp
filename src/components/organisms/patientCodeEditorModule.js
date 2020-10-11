import React, { Component } from 'react';
import { 
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { COLORS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";
import Modal from 'react-native-modal';

import {connect} from 'react-redux';
import { setPatientCode, openCodeEditor, closeCodeEditor } from '_redux_actions';

class patientCodeEditorModule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: this.props.code,
        };
    }

    componentDidMount() {
        this.props.openCodeEditor();
    }

    handleAccept() {
        this.props.setCode(this.state.code);
        this.props.closeCodeEditor();
    }

    handleCancel() {
        this.props.closeCodeEditor();
        this.props.nav.goBack();        
    }

    handleScanner() {
        this.props.closeCodeEditor();
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

                    <TouchableOpacity
                        onPress={() => this.handleAccept()}
                    >
                        <Text style={styles.textButton}>
                            Aceptar
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.iconContainer}>
                    <IconII style={styles.icon} name={"person"}/>
                    <IconII style={styles.icon} name={"list"}/>
                </View>


                <Text style={styles.helpText}>
                    Escanea el código del paciente o {'\n'} 
                    escribe un nuevo código para identificar 
                    las nuevas notas de voz
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        value={this.state.code}
                        onChangeText={(value) => this.setState({code: value})}
                        placeholder='Código de paciente'
                        placeholderTextColor={COLORS.grey}
                        style={styles.textInput}
                    />
                    <TouchableOpacity onPress={() => this.handleScanner()}>
                        <IconII style={styles.scanIcon} name={'scan-circle'}/>
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
                swipeThreshold={400}
                onSwipeComplete={() => this.setState({isModalVisible: false})}
                isVisible={this.props.isEditorVisible}
                avoidKeyboard={true}
            >
                {this._renderInputCode()}
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modal:{
        zIndex: 0,
        width: '100%', 
        marginVertical: 0,
        marginHorizontal: 0,
        justifyContent: 'flex-end',
    },
    card: {
        height: '90%',
        alignItems:'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,

    },
    helpText: {
        marginTop: 30,
        marginBottom: 40,
        marginHorizontal: 50,
        fontSize: 16,
        textAlign: 'center',
    },
    actionContainer:{
        flexDirection: 'row',
        width: '90%',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textButton: {
        fontSize: 18,
        color: COLORS.electric_blue,
        textAlign: 'center'
    },
    iconContainer:{        
        flexDirection: 'row',
        marginTop: 20,
        width: 80,
        height: 80,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.light_green
    },
    icon: {
        fontSize: 30,
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
        width:'75%',
        marginLeft: 20,
        textAlign: 'center',
        fontSize: 15,
        color: COLORS.electric_blue,
    },
    scanIcon:{
        fontSize: 35,
        color: COLORS.electric_blue,
        marginRight: 5
    },
});


const mapStateToProps = (state) => {
    return {
        code: state.patientCodeReducer.code,
        isEditorVisible: state.patientCodeReducer.isEditorVisible,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setCode: (code) => dispatch(setPatientCode(code)),
      openCodeEditor: () => dispatch(openCodeEditor()),
      closeCodeEditor: () => dispatch(closeCodeEditor()),
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(patientCodeEditorModule);