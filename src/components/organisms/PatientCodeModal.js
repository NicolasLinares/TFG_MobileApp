import React, { Component } from 'react';
import {
    StatusBar,
} from 'react-native';

import { connect } from 'react-redux';
import { setPatientTag } from '_redux_actions';
import { openTagEditor } from '_redux_actions';

import PatientCodeEditor from './patientCodeEditor';
import { Modalize } from 'react-native-modalize';
import { EditCodeButton } from '_atoms';


class PatientCodeModal extends Component {

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

    _renderModal() {
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
                <EditCodeButton 
                    onPress={() => this.onOpen()}
                    code={this.props.patientTag}
                />

                { this._renderModal()}
            </>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        tags: state.tagsReducer.tags,
        patientTag: state.patientCodeReducer.patientCode,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPatientTag: (tag) => dispatch(setPatientTag(tag)),
        openTagEditor: () => dispatch(openTagEditor()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientCodeModal);