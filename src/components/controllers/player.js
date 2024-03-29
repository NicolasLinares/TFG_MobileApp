/**
* @fileoverview Controles de la reproducción de un audio (play, pause, skip, slide to X )
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native';

import { default as Slider } from 'react-native-scrubber';

import { COLORS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Sound from 'react-native-sound';

import { connect } from 'react-redux';
import { setPlayerState } from '_redux_actions';

import { httpService, storageService } from '_services';

import * as FS from '_constants';


class Player extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uid: this.props.item.uid,
            name: this.props.item.name,
            uname: this.props.item.uname,

            complexStyle: this.props.complexStyle === undefined ? false : this.props.complexStyle,

            player: new AudioRecorderPlayer(),
            sliderValue: 0,
            duration: 0,
            icon: 'play',
            state: 'stop',
        };
    }

    async componentDidMount() {

        if (this.state.complexStyle) {

            let localpath = FS.DIRECTORY + '/' + this.state.uname;

            // Comprobamos si el audio se encuentra ya localmente
            let exists = await storageService.existsLocally(localpath);

            // Si no se encuentra localmente lo descargamos del servidor
            if (exists !== null) {
                if (!exists) {
                    console.log('El archivo de audio no se encuentra localmente')
                    // Se descarga de la base de datos
                    await httpService.downloadAudioFile(this.state.uid, localpath);
                } else {
                    console.log('El archivo de audio se encuentra localmente')
                }
            }

        }
        // Se inicializan los datos
        this.setAudioDuration();
    }

    componentWillUnmount() {
        this.resetPlayer();
    }


    setAudioDuration() {

        var audio = new Sound(this.state.uname, FS.DIRECTORY, (error) => {
            if (error) {
                alert('Error al obtener la duración de la nota de voz ');
                return;
            }

            this.setState({
                duration: audio.getDuration()
            });

            return;
        });

        audio.release();
    }

    async handlePlayer() {

        switch (this.props.state) {
            case 'stop': {

                // Inicializa el player
                this.props.setPlayerState('play');
                this.setState({ state: 'play' });
                var msg = await this.state.player.startPlayer('file://' + FS.DIRECTORY + '/' + this.state.uname);

                // Si antes de darle al botón se ha movido el slider, entonces
                // se sitúa en el segundo exacto donde se ha indicado
                if (this.state.sliderValue > 0) {
                    var value = this.state.sliderValue;
                    this.state.player.seekToPlayer(
                        Platform.OS === 'ios' ? value * 1000 : value
                    );
                }

                await this.state.player.addPlayBackListener((e) => {

                    if (e.current_position === e.duration) {
                        this.resetPlayer();
                    } else
                        this.setState({ sliderValue: e.current_position / 1000 });

                    if (this.props.state === 'pause') {
                        this.state.player.pausePlayer();
                    }

                });
                return;
            }
            case 'play': {
                this.props.setPlayerState('pause');
                this.setState({ state: 'pause' });
                return;
            }
            case 'pause': {
                this.state.player.resumePlayer();
                this.props.setPlayerState('play');
                this.setState({ state: 'play' });
                return;
            }
        }

    }





    skip(skip) {
        updatePos = this.state.sliderValue + skip; // secs
        // cuando se supera la duración se pone al final del audio
        if (updatePos > this.state.duration)
            updatePos = this.state.duration;
        // cuando se supera el inicio se pone al principio del audio
        else if (updatePos < 0)
            updatePos = 0;

        this.slideValueChange(updatePos);
    }

    resetPlayer() {
        this.state.player.stopPlayer().catch(err => console.log(err.message));
        this.state.player.removePlayBackListener();
        this.props.setPlayerState('stop');
        this.setState({
            sliderValue: 0,
            state: 'stop'
        });
    }

    slideValueChange(value) {

        if (value === 0) {
            // Necesario para poder iniciar otros audios
            this.resetPlayer();
        } else {

            this.setState({
                sliderValue: value,
            });

            // Para el caso de mover el slider sin haber iniciado
            if (this.props.state !== 'stop')
                this.state.player.seekToPlayer(
                    Platform.OS === 'ios' ? value * 1000 : value
                );
        }

    }

    _renderPlayStopButton() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.handlePlayer()}
            >
                <IconII name={this.state.state !== 'play' ? 'play' : 'pause'} size={this.state.complexStyle ? 35 : 30} color={COLORS.grey} />
            </TouchableOpacity>
        );
    }

    _renderSkipButton(value) {

        const rotate = value > 0 ? '0deg' : '180deg';
        const skipText = value < 0 ? -1 * value : value;
        const margRight = value > 0 ? 0 : 4;
        const margLeft = value > 0 ? 4 : 0;

        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.skip(value)}
            >
                <IconII style={{ transform: [{ rotateY: rotate }], marginRight: margRight, marginLeft: margLeft }} name='reload' size={35} color={COLORS.grey} />
                <Text style={styles.skipTextValue}>{skipText}</Text>
            </TouchableOpacity>
        );
    }

    // style={{transform: [{rotateY: '180deg'}]}} 

    _renderSimplePlayer() {
        return (
            <View style={[styles.player, { justifyContent: 'space-between', flexDirection: 'row' }]}>
                <View style={{ marginLeft: 15, width: '80%' }}>
                    <Slider
                        value={this.state.sliderValue}
                        onSlidingComplete={value => this.slideValueChange(value)}
                        totalDuration={this.state.duration}
                        trackColor={COLORS.electric_blue}
                        scrubbedColor={COLORS.electric_blue}
                    />
                </View>

                {this._renderPlayStopButton()}

            </View>
        );
    }

    _renderComplexPlayer() {
        return (
            <View style={[styles.player, { justifyContent: 'center', flexDirection: 'column', marginTop: 10 }]}>

                <View style={styles.actionButtons}>
                    {this._renderSkipButton(-5)}
                    {this._renderPlayStopButton()}
                    {this._renderSkipButton(5)}
                </View>

                <View style={{ marginLeft: 0, width: '80%' }}>
                    <Slider
                        value={this.state.sliderValue}
                        onSlidingComplete={value => this.slideValueChange(value)}
                        totalDuration={this.state.duration}
                        trackColor={COLORS.electric_blue}
                        scrubbedColor={COLORS.electric_blue}
                    />
                </View>
            </View>
        );
    }

    render() {

        if (this.state.complexStyle)
            return this._renderComplexPlayer();
        else
            return this._renderSimplePlayer();
    }
}



const styles = StyleSheet.create({
    player: {
        width: '100%',
        alignItems: 'center',
    },
    actionButtons: {
        flexDirection: 'row',
        width: '40%',
        justifyContent: 'space-around'
    },
    button: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    skipTextValue: {
        position: 'absolute',
        fontSize: 14,
        color: COLORS.dark_grey
    }
});


const mapStateToProps = (state) => {
    return {
        state: state.playerReducer.playerState,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPlayerState: (state) => dispatch(setPlayerState(state))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Player);






