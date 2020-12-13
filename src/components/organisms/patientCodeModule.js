import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
} from 'react-native';

import { COLORS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";

import { connect } from 'react-redux';
import { setPatientTag } from '_redux_actions';
import { openTagEditor } from '_redux_actions';

import PatientCodeEditor from './patientCodeEditor';
import { Modalize } from 'react-native-modalize';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


class PatientCodeModule extends Component {

    constructor(props) {
        super(props);
        this.ref_modal = React.createRef();
    }

    componentDidMount = () => {
        this.props.setPatientTag('');
    }

    onOpen = () => {
        this.ref_modal.current.open();
    };

    onClose = () => {
        this.ref_modal.current.close();
    };

    _renderAddTagButton() {
        return (
            <TouchableWithoutFeedback
                style={styles.item}
                onPress={() => this.onOpen()}
                avoidKeyboardLikeIOS={true}
            >
                <View style={styles.iconContainer}>
                    <IconII style={styles.icon} name={"person"} />
                    <IconII style={[styles.icon, { marginLeft: -3 }]} name={"list"} />
                </View>

                <Text style={[styles.code, { color: this.props.patientTag !== '' ? COLORS.electric_blue : 'grey' }]}>
                    {this.props.patientTag !== '' ? this.props.patientTag : 'Añadir código de paciente'}
                </Text>
            </TouchableWithoutFeedback>
        )
    }

    _renderEditor() {
        return (
            <Modalize
                ref={this.ref_modal}
                modalStyle={{borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
                handlePosition={'inside'}
            >
                <StatusBar backgroundColor={'rgba(0,0,0,0.01)'} barStyle={'dark-content'} />

                <PatientCodeEditor
                    closeEditor={() => this.onClose()}
                    nav={this.props.nav}
                />
            </Modalize>
        )
    }

    render() {
        return (
            <>
                { this._renderAddTagButton()}
                { this._renderEditor()}
            </>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'rgb(230,230,230)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 18,
        marginVertical: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        width: 35,
        height: 35,
        borderRadius: 13,
        marginVertical: 5,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.light_green,
        borderWidth: 0.5,
        borderColor: COLORS.green
    },
    icon: {
        fontSize: 15,
        color: COLORS.green,
    },

    code: {
        fontSize: 17,
        backgroundColor: 'transparent',
        marginHorizontal: 20
    },

});


const mapStateToProps = (state) => {
    return {
        tags: state.tagsReducer.tags,
        patientTag: state.patientCodeReducer.tag,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPatientTag: (tag) => dispatch(setPatientTag(tag)),
        openTagEditor: () => dispatch(openTagEditor()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientCodeModule);