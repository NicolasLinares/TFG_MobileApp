import React, { Component } from 'react';

import { 
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native';

import {default as Slider} from 'react-native-scrubber';

import { COLORS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";


import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';

import { connect } from 'react-redux';
import { setPlayerState } from '_redux_actions';

class myPlayer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            path: this.props.item.localpath,
            //path: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_1MG.mp3',
            complexStyle: this.props.complexStyle === undefined ? false : this.props.complexStyle,

            player: new AudioRecorderPlayer(),
            sliderValue: 0,
            duration: 0,
            icon: 'play',
            state: 'stop',
        };
    }

    componentDidMount() {
        this.setAudioDuration();
    }

    componentWillUnmount() {
        this.resetPlayer();
    }

    setAudioDuration() {
        path = this.props.stream ? this.props.item.path : this.props.item.name ;
        directory = this.props.stream ? null : RNFS.CachesDirectoryPath;
        //path = this.state.path;        
        //directory = null;

        var audio = new Sound(path , directory,  (error) => {
          if (error) {
            alert('Error al cargar la nota de audio');
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

        switch(this.props.state) {
            case 'stop': {

                // Inicializa el player
                this.props.setState('play');
                this.setState({state: 'play'});
                var msg = await this.state.player.startPlayer(this.state.path);
                
                // Si antes de darle al botón se ha movido el slider, entonces
                // se sitúa en el segundo exacto donde se ha indicado
                if (this.state.sliderValue > 0) {
                    var value = this.state.sliderValue;
                    this.state.player.seekToPlayer(
                        Platform.OS === 'ios' ? value*1000 : value
                    );
                }
    
                await this.state.player.addPlayBackListener((e) => {
    
                    if (e.current_position === e.duration) {
                        this.resetPlayer();
                    } else
                        this.setState({ sliderValue: e.current_position/1000});
                
                    if (this.props.state === 'pause') {
                        this.state.player.pausePlayer();
                    }
    
                });
                return;
            }
            case 'play': {
                this.props.setState('pause');
                this.setState({state: 'pause'});
                return;
            }
            case 'pause': {
                this.state.player.resumePlayer();
                this.props.setState('play');
                this.setState({state: 'play'});
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
        this.props.setState('stop');
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
                    Platform.OS === 'ios' ? value*1000 : value
                );
        }

    }

    _renderPlayStopButton() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.handlePlayer()}
            >
                <IconII name={this.state.state !== 'play' ? 'play' : 'pause'} size={this.state.complexStyle ? 35 : 30} color={COLORS.grey}/>
            </TouchableOpacity>
        );
    }

    _renderSkipButton(value) {

        const rotate = value > 0 ? '0deg' : '180deg';
        const skipText = value < 0 ? -1*value : value;
        const margRight = value > 0 ? 0 : 4;
        const margLeft = value > 0 ? 4 : 0;

        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.skip(value)}
            >
                <IconII style={{transform: [{rotateY: rotate}], marginRight: margRight, marginLeft: margLeft}}  name='reload' size={35} color={COLORS.grey}/>
                <Text style={styles.skipTextValue}>{skipText}</Text>
            </TouchableOpacity>
        );
    }

    // style={{transform: [{rotateY: '180deg'}]}} 

    _renderSimplePlayer() {
        return (
            <View style={[styles.player, {justifyContent: 'space-between', flexDirection: 'row'}]}>
                <View style={{marginLeft: 25, width: '70%'}}>
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
            <View style={[styles.player, {justifyContent: 'center', flexDirection: 'column', marginTop: 10}]}>
                    
                <View style={styles.actionButtons}>

                    {this._renderSkipButton(-5)}
                    {this._renderPlayStopButton()}
                    {this._renderSkipButton(5)}

                </View>

                <View style={{marginLeft: 0, width: '80%'}}>
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
        marginHorizontal: 20
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
        setState: (state) => dispatch(setPlayerState(state))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(myPlayer);






