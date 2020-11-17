import React, { Component } from 'react';

import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Platform
} from 'react-native';

import { CONSTANTS } from '_styles';

import { default as Player } from './myPlayer';

import { connect } from 'react-redux';
import { updateNameNewAudio } from '_redux_actions';


class myComplexAudioItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: this.props.item.key,
            name: this.props.item.name.slice(0, this.props.item.name.length - 4), // quito la extensión
            extension: this.props.item.extension,
            created_time: this.props.item.ctime,
        }
    }

    setNewName() {
        // Si no ha escrito nada dejamos el nombre como estaba
        if (this.state.name === "") {
            this.setState({ name: this.props.item.name.slice(0, this.props.item.name.length - 4) })
        } else {

            // comprobar que no tiene espacios en blanco
            this.props.updateName(this.state.key, this.state.name + '.' + this.state.extension);
        }

    }

    render = () => (

        <View style={styles.item}>
            <View style={styles.info}>

                <View style={{flexDirection: 'row'}}>

                    <TextInput
                        style={[styles.name, {}]}
                        value={this.state.name}
                        onChangeText={(value) => this.setState({ name: value })}
                        autoCapitalize={"none"}
                        onBlur={() => this.setNewName()}
                    />

                    <Text
                        style={styles.name}
                    >
                        {'.' + this.state.extension}
                    </Text>

                </View>

                <Text style={styles.date}>
                    {this.state.created_time}
                </Text>
            </View>

            <Player item={this.props.item} stream={false} />
        </View>
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
        marginHorizontal: CONSTANTS.marginHorizontalItemList,
        marginVertical: CONSTANTS.marginVerticalItemList,
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
    name: {
        fontSize: 14,
        color: 'black',
        padding: 0,
        marginRight: 0
    },
    date: {
        fontSize: 14
    },
});

const mapDispatchToProps = (dispatch) => {
    return {
        updateName: (key, name) => dispatch(updateNameNewAudio(key, name)),
    }
}

export default connect(null, mapDispatchToProps)(myComplexAudioItem);




