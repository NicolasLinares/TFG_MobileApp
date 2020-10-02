import React, { Component } from 'react';

import { 
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native';

import {default as Slider} from 'react-native-scrubber';

import { COLORS, CONSTANTS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";


import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';

import { connect } from 'react-redux';
import { setPlayerState } from '_redux_actions';

class myPlayerItemList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            player: new AudioRecorderPlayer(),
            audio: this.props.item,
            sliderValue: 0,
            duration: 0,
            icon: 'play',
            state: 'stop',
        };
    }

    componentDidMount() {
        this.setAudioDuration();
    }

    setAudioDuration() {
        var audio = new Sound(this.state.audio.name , RNFS.CachesDirectoryPath,  (error) => {
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
                var msg = await this.state.player.startPlayer(this.state.audio.path);
                
                // Si antes de darle al botón se ha movido el slider, entonces
                // se sitúa el comienzo del audio donde se ha indicado
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

    render() {
        return (

            <View style={styles.item}>
                <View style={styles.info}>
                    <Text style={styles.name}>{this.state.audio.name}</Text>
                    <Text style={styles.date}>
                        {this.state.audio.creation_time}
                    </Text>
                </View>
                
                <View style={styles.player}>
                    <View style={styles.slider}>
                        <Slider
                            value={this.state.sliderValue}
                            onSlidingComplete={value => this.slideValueChange(value)}
                            totalDuration={this.state.duration}
                            trackColor={COLORS.electric_blue}
                            scrubbedColor={COLORS.electric_blue}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.buttonRight}
                        onPress={() => this.handlePlayer()}
                    >
                        <IconII name={this.state.state !== 'play' ? 'play' : 'pause'} size={25} color={COLORS.grey}/>
                    </TouchableOpacity>

                </View>

            </View>

        )
    }
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
        marginHorizontal: CONSTANTS.marginHorizontalItemList,
        marginVertical: CONSTANTS.marginVerticalItemList,
    },
    info: {
        flexDirection: 'row',
        height: 30,
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: 'white',
        marginBottom: 5,
        marginHorizontal: 20,
    },
    name: {
        fontSize: 14
    },
    date: {
        fontSize: 14
    },
    player: {
        flexDirection: 'row',
        width: '95%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    slider: {
        width: '80%',
        marginTop: 3,
        marginLeft: 25,
        backgroundColor: 'white'
    },
    buttonRight: {
        marginLeft: 10,
        width: 40,
        height: 45,
        alignItems: 'center',
        backgroundColor: 'white'
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
    
  
  export default connect(mapStateToProps, mapDispatchToProps)(myPlayerItemList);
  





