/**
* @fileoverview Diseño de los items usados en la lista de nuevas notas de voz grabadas
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

import { DIMENSIONS } from '_styles';

import { Player } from '_controllers';

import { connect } from 'react-redux';
import { updateNameNewAudio } from '_redux_actions';

import { FadeInAnimation } from '_animations';
import { DialogPrompt } from '_alerts';

import { checkInputService } from '_services';
import { TouchableOpacity } from 'react-native-gesture-handler';

class recordedItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: this.props.item.key,
            name: this.props.item.name,
            extension: this.props.item.extension,
            created_time: this.props.item.ctime,

            newName: this.props.item.name,
            showDialog: false,
            errorDialog: false,
        }
    }



    checkNewName() {

        // Comprueba que no tiene espacios en blanco, tabulaciones, etc
        if (checkInputService.withBlankSpaces(this.state.newName)) {
            this.setState({ errorDialog: true });
        } else {
            this.props.updateName(this.state.key, this.state.newName);
            this.setState({ name: this.state.newName, showDialog: false });
        }

    }

    _renderDialogPrompt() {

        return (
            <DialogPrompt 
                value={this.state.newName}
                onChangeText={value => this.setState({ newName: value })}
                visible={this.state.showDialog}
                showError={this.state.errorDialog}
                onCancel={() => this.setState({showDialog: false, errorDialog: false, newName: this.state.name})}
                onAccept={() => { this.state.newName !== "" ? this.checkNewName() : this.setState({ errorDialog: true })}}
            />  
        );
    }

    render = () => (

        <>
            {this._renderDialogPrompt()}

            <FadeInAnimation style={styles.item} duration={400}>
                <View style={styles.info}>
                    <View style={styles.nameInput}>
                        <TouchableOpacity
                            onPress={() => this.setState({ showDialog: true })}
                        >
                            <Text
                                style={styles.name}
                            >
                                {this.state.name}
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.date}>
                        {this.state.created_time}
                    </Text>
                </View>
                <Player item={this.props.item} />
            </FadeInAnimation>

        </>
    )

}


const styles = StyleSheet.create({

    item: {
        backgroundColor: 'white',
        height: 85,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: DIMENSIONS.marginHorizontalItemList,
        marginVertical: DIMENSIONS.marginVerticalItemList,
    },
    info: {
        flexDirection: 'row',
        height: 20,
        width: '95%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 8,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    nameInput: {
        height: 20,
        width: Dimensions.get('screen').width - 120,
        flexDirection: 'row',
    },
    name: {
        fontSize: 14,
        color: 'black',
        padding: 0,
    },
    date: {
        width: 40,
        textAlign: 'center',
        fontSize: 14,
    },
});

const mapDispatchToProps = (dispatch) => {
    return {
        updateName: (key, name) => dispatch(updateNameNewAudio(key, name)),
    }
}

export default connect(null, mapDispatchToProps)(recordedItem);




