import React, { Component } from 'react';

import {
    Text,
    View,
    Platform,
    TouchableOpacity,
    FlatList,
    Alert,
    StyleSheet,
} from 'react-native';

import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

import IconII from "react-native-vector-icons/Ionicons";

import { ListItem, SearchBar } from 'react-native-elements'

import moment from 'moment';

import RNFS from 'react-native-fs';
import AudioList from './audiolist';


class Recorder extends Component {

  constructor(props) {
    super(props);
    this.state = {
        audiopath: '',
        buttomType: 'mic',
        isRecording: false,
        recordTime: '00:00',
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.1);
  }

  setAudioPath = () => {

    filename = 'audio_' + moment().format('DDMMYYYY_HHmmss') + ".mp4";

    path = Platform.select({
        ios: filename, // .m4a
        android: 'sdcard/' + filename, // .mp4
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
    console.log(result_path);
    this.audioRecorderPlayer.removeRecordBackListener();

    current_audio.creation_time = moment().format('HH:mm');
        
    this.setState({
      audiopath: result_path,
      buttomType: 'mic',
      isRecording: false,
      recordTime: '00:00',
    });

    this.refs.refAudioList.addAudio(current_audio);
  };

  manageRecorder = async () => {
      if (!this.state.isRecording) {
        this.onStartRecord();

      } else {
        this.onStopRecord();
      }
  }

  onStartPlay = async (path, e) => {
      
    const msg = await this.audioRecorderPlayer.startPlayer(path);
    this.audioRecorderPlayer.setVolume(1.0);
    this.audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
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

  render() {
    return (
      <View style={LayersStyles.container}>


        <AudioList ref="refAudioList"/>

        <View style={LayersStyles.divider} />

        <View style={LayersStyles.recorder}>
          <Text style={ComponentStyles.time_record}>
            {this.state.recordTime.substring(0, 5)}
          </Text>

          <View>
            <TouchableOpacity 
                style={ComponentStyles.button_record}
                onPress={() => this.manageRecorder()}
            >
              <IconII name={this.state.buttomType} size={35} color='rgb(255,70,70)'/>
            </TouchableOpacity>
          </View>
        </View>

      </View>            
    )
  };

}


const LayersStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0, 0)',
    alignItems:'center',
    justifyContent: 'flex-end',
    height:"100%",
    width:"100%",
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 20,
    color: "black",
  },
  divider:{
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0, 0.1)',
    width:"100%"
  },
  recorder: {
    justifyContent: 'flex-end',
    height:230,
    width:"100%",
    alignItems:'center',
    backgroundColor:'white',
  }
});


const ComponentStyles = StyleSheet.create({
  time_record: {
    fontFamily: "FontAwesome",
    fontSize: 40,
    textAlign: 'center',
    marginTop: 30, 
    marginBottom: 35 
  },
  button_record: {
    borderWidth:3,
    borderColor:'black',
    alignItems:'center',
    justifyContent:'center',
    width:70,
    height:70,
    borderRadius:35,
    marginBottom: 40 
  },
});

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
