import React, { Component } from 'react';

import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import IconII from "react-native-vector-icons/Ionicons";
import {CONSTANTS} from '_styles';

import Scrubber from 'react-native-scrubber';
import { COLORS } from '_styles';

import {recorderService as RecorderService} from '_services';


import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

class audioItemList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            audio: this.props.item,
            scrubberValue: 0,
            duration: 0,
            player: null,
            mode: 'stop'
        };
    }

    async componentDidMount() {

        await this.setState({
            player: new AudioRecorderPlayer()
        });

        this.state.player.setSubscriptionDuration(0.1);

        RecorderService.getDuration(this.state.audio.path, duration => {
            this.setState({
                duration: duration
            });
        });
    }

    async start (){

        if (this.state.mode === 'stop') {
            this.setState({ mode: 'play'});
            var msg = await this.state.player.startPlayer(this.state.audio.path);
            
            if (this.state.scrubberValue > 0) {
                this.state.player.seekToPlayer(this.state.scrubberValue*1000);
            }

            await this.state.player.addPlayBackListener((e) => {

                if (e.current_position === e.duration) {
                    this.state.player.stopPlayer().catch(err => console.log(err.message));
                    this.state.player.removePlayBackListener();
                    this.reset();
                } else
                    this.setState({ scrubberValue: e.current_position/1000});
            
                if (this.state.mode === 'pause') {
                    this.state.player.pausePlayer();
                }

            });

        } else if (this.state.mode === 'play') {
            this.setState({
                mode: 'pause'
            });
        } else if (this.state.mode === 'pause') {
            this.state.player.resumePlayer();
            this.setState({ mode: 'play'});
        }

    }

    reset() {
        this.setState({ 
            scrubberValue: 0,
            mode: 'stop'
        });
    }

    async valueChange(value) {

        this.setState({ 
            scrubberValue: value,
        });
        
        if (this.state.mode !== 'stop')
            this.state.player.seekToPlayer(value*1000);

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


                    <TouchableOpacity
                        style={styles.buttonRight}
                        onPress={() => this.start()}
                    >
                        <IconII name={"play"} size={25} color={COLORS.grey}/>
                    </TouchableOpacity>

                    <View style={styles.scrubber}>
                        <Scrubber
                            value={this.state.scrubberValue}
                            onSlidingComplete={value => this.valueChange(value)}
                            totalDuration={this.state.duration}
                            trackColor={COLORS.electric_blue}
                            scrubbedColor={COLORS.electric_blue}
                        />
                    </View>

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
        width: '80%',
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
        width: '85%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    buttonRight: {
        marginRight: 20,
        width: 60,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    scrubber: {
        width: '73%',
        marginTop: 3,
        backgroundColor: 'white'
    }
});

  
export default audioItemList;








