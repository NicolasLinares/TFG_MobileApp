import React, { Component } from 'react';

import { RecorderButton } from '_atoms';

import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

import moment from 'moment';
import 'moment/locale/es';
import RNFS from 'react-native-fs';

import { connect } from 'react-redux';
import { addAudio } from '_redux_actions';
import { Platform } from 'react-native';


class recorderModule extends Component {

  constructor(props) {
    super(props);
    this.state = {
        recorder: new AudioRecorderPlayer(),
        audio: null,
        isRecording: false,

        timer: null,
        minutes_Counter: '00',
        seconds_Counter: '00',
    };
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  startTimer() {
    let timer = setInterval(() => {
      var num = (Number(this.state.seconds_Counter) + 1).toString(),
      count = this.state.minutes_Counter;

      if (Number(this.state.seconds_Counter) == 59) {
        count = (Number(this.state.minutes_Counter) + 1).toString();
        num = '00';
      }

      this.setState({
        minutes_Counter: count.length == 1 ? '0' + count : count,
        seconds_Counter: num.length == 1 ? '0' + num : num
      });
    }, 1000);

    this.setState({ timer });
  }

  stopTimer() {
      clearInterval(this.state.timer);
      this.setState({
        timer: null,
        minutes_Counter: '00',
        seconds_Counter: '00',
      });
  }

  setAudioPath() {

    name = 'audio_' + moment().format('DDMMYYYY_HHmmss');

    filename = Platform.select({
        ios: name + '.m4a',
        android: name  + '.mp3',
    });

    path = Platform.select({
        ios: filename,
        android:  RNFS.CachesDirectoryPath + '/'+ filename,
    });

    return [filename, path];
  }

  async getCreateTime(path) {
    dateObj = (await RNFS.stat(path)).ctime;
    h=dateObj.getHours();
    hh= h < 10 ? '0'+h : h;
    m=dateObj.getMinutes();
    mm= m < 10 ? '0'+m : m;

    return hh + ":" + mm ;
  }

  async startRecorder() {
    
    const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      };
  
      audiofile = this.setAudioPath();
      name = audiofile[0];
      path = audiofile[1];
  
      absolute_path = await this.state.recorder.startRecorder(path, true, audioSet);
      ctime = await this.getCreateTime(absolute_path);

      audio = {
        name: name,
        extension: Platform.OS === 'ios' ? 'm4a' : 'mp3',
        localpath: absolute_path,
        ctime: ctime,
      };

      this.state.recorder.addRecordBackListener();

      return audio;
  };
  
  
  async stopRecorder() {
      const path = await this.state.recorder.stopRecorder();
      this.state.recorder.removeRecordBackListener();
  };


  async handleRecorder () {

      if (!this.state.isRecording) {
        newAudio = await this.startRecorder();

        this.startTimer();

        this.setState({
          audio: newAudio,
          isRecording: !this.state.isRecording
        });
        
      } else {
        await this.stopRecorder();

        this.stopTimer();
        
        this.props.addNewAudio(this.state.audio);
        
        this.setState({
          audio: null,
          isRecording: !this.state.isRecording
        });
      }
  }


  render() {
    return (
      <RecorderButton
        onPress={() => this.handleRecorder()} 
        time={this.state.minutes_Counter + ' : '+ this.state.seconds_Counter}
      />
    )
  };

}


const mapDispatchToProps = (dispatch) => {
  return {
    addNewAudio: (audio) => dispatch(addAudio(audio))
  }
}


export default connect(null, mapDispatchToProps) (recorderModule);
