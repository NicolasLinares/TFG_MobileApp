import React, { Component } from 'react';

import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    Dimensions
} from 'react-native';

import { CONSTANTS } from '_styles';

import { default as Player } from './myPlayer';

import { connect } from 'react-redux';
import { updateNameNewAudio } from '_redux_actions';

import AnimatedItem from './myAnimatedItemList';

import { checkInputService } from '_services';

class myComplexAudioItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: this.props.item.key,
            name: this.props.item.name,
            default_name: this.props.item.name,
            extension: this.props.item.extension,
            created_time: this.props.item.ctime,
        }
    }


    setNewName(value) {

        this.setState({ name: value });

        // Si no ha escrito nada dejamos el nombre como estaba
        if (value === "") {
            Alert.alert(
                'Nombre no válido',
                'Añade un nombre a la grabación o utiliza el nombre por defecto',
                [
                    {
                        text: 'Usar nombre por defecto',
                        onPress: () => this.setState({ name: this.state.default_name })
                    },
                    {
                        text: 'Modificar nombre anterior',
                        onPress: () => this.setState({ name: this.props.item.name })
                    },
                ]
            );
        } else {

            // Comprueba que no tiene espacios en blanco, tabulaciones, etc
            if (checkInputService.withBlankSpaces(value)) {
            
                Alert.alert(
                    'Nombre no válido',
                    'Introduce un nombre sin espacios en blanco',
                    [{
                        text: 'Aceptar',
                        onPress: () => {
                            var chars = { ' ': '_' };
                            name = value.replace(/ /g, m => chars[m]);
                            this.setState({ name: name });
                            this.props.updateName(this.state.key, name);
                        }
                    }]
                );

            } else {

                this.props.updateName(this.state.key, value);
            }
        }
    }

    render = () => (

        <AnimatedItem style={styles.item}>
            <View style={styles.info}>
                <View style={styles.nameInput}>
                    <TextInput
                        style={styles.name}
                        underlineColorAndroid={'transparent'}
                        autoCapitalize={'none'}
                        maxLength={32}
                        value={this.state.name}
                        onChangeText={(value) => this.setNewName(value)}
                        onBlur={() => this.setNewName(this.state.name)}
                    />
                </View>
                <Text style={styles.date}>
                    {this.state.created_time}
                </Text>
            </View>
            <Player item={this.props.item} />
        </AnimatedItem>
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

export default connect(null, mapDispatchToProps)(myComplexAudioItem);




