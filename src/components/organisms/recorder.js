import React, { Component } from 'react';

import {
    Text,
    Platform,
    Animated,
    StyleSheet,
    View
} from 'react-native';

import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

import moment from 'moment';

import RNFS from 'react-native-fs';

import { ModuleRecord } from '_atoms';

class Recorder extends Component {

  constructor(props) {
    super(props);
    this.state = {
        audiopath: '',
        isRecording: false,
        recordTime: '00:00',
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.1);
  }

  setAudioPath = () => {

    filename = 'audio_' + moment().format('DDMMYYYY_HHmmss') + '.mp4';

    path = Platform.select({
        ios: filename, // .m4a
        android:  RNFS.CachesDirectoryPath + '/'+ filename, // .mp4
    });

    return [filename, path];
  }

  onStartRecord = async () => {
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.ACC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,

      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    audiofile = this.setAudioPath();

    name = audiofile[0];
    path = audiofile[1];
    console.log(path)

    const absolute_path = await this.audioRecorderPlayer.startRecorder(path, true, audioSet);

    current_audio = {
      name: name,
      path: absolute_path,
      creation_time: null,
      creation_date: null
    };

    this.audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        buttomType: 'stop',
        isRecording: true,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position)
        )
      });
    });
    
  };


  onStopRecord = async () => {
    const result_path = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();

    current_audio.creation_time = moment().format('HH:mm');
        
    this.setState({
      audiopath: result_path,
      isRecording: false,
      recordTime: '00:00',
    });

    this.props.updateAudioList(current_audio);
  };


  manageRecorder = () => {
      if (!this.state.isRecording) {
        this.onStartRecord();
      } else {
        this.onStopRecord();
      }
  }


  render() {

    return (
      
        <ModuleRecord 
          onPress={this.manageRecorder} 
          time={this.state.recordTime.substring(0, 5)}
        />
    )
  };

}

export default Recorder;

      /*
      onPauseRecord = async () => {
        const result = await this.audioRecorderPlayer.pauseRecorder();
        console.log(result);
      };      
      
      onResumeRecord = async () => {
        const result = await this.audioRecorderPlayer.resumeRecorder();
        console.log(result);
      };
      

      onStartPlay = async (e) => {
        console.log('onStartPlay');
          
        const msg = await this.audioRecorderPlayer.startPlayer(this.path);
        this.audioRecorderPlayer.setVolume(1.0);
        console.log(msg);
        this.audioRecorderPlayer.addPlayBackListener((e) => {
          if (e.current_position === e.duration) {
            console.log('finished');
            this.audioRecorderPlayer.stopPlayer().catch(err => console.log(err.message));
          }
          this.setState({
            currentPositionSec: e.current_position,
            currentDurationSec: e.duration,
            playTime: this.audioRecorderPlayer.mmssss(
              Math.floor(e.current_position),
            ),
            duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
          });
        });
      };

      onPausePlay = async (e) => {
        await this.audioRecorderPlayer.pausePlayer();
       };

       onStopPlay = async (e) => {
        console.log('onStopPlay');
        this.audioRecorderPlayer.stopPlayer().catch(err => console.log(err.message));
        this.audioRecorderPlayer.removePlayBackListener();
        };

        */
