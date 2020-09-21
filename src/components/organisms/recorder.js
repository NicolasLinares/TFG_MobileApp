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

import { ButtonRecord } from '_atoms';

class Recorder extends Component {

  constructor(props) {
    super(props);
    this.state = {
        audiopath: '',
        isRecording: false,
        recordTime: '00:00',
        heightAnimated: new Animated.Value(135),
        showTimeRecording: false,
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

  manageRecorder() {
      if (!this.state.isRecording) {
        this.recorderOpenAnimatedView();
        this.onStartRecord();
      } else {
        this.onStopRecord();
        this.recorderCloseAnimatedView();
      }
  }

  recorderOpenAnimatedView() {
    Animated.timing(this.state.heightAnimated, {
      toValue: 230,
      duration: 250,
      useNativeDriver: false,
    }).start(() => 
    this.setState({
      showTimeRecording: true
    })
  );
  }

  recorderCloseAnimatedView() {
    this.setState({
      showTimeRecording: false
    });

    Animated.timing(this.state.heightAnimated, {
      toValue: 135,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }


  render() {

    const TimeRecording = (props) => {
      // Enseñamos el tiempo cuando la animación se ha completado
      if (props.show) {
        return (
          <Text style={ComponentStyles.time_record}>
            {props.time}
          </Text>
        );
      } else
        return null;
    }


    const heightAnimatedValue = this.state.heightAnimated.interpolate({
      inputRange: [135, 230],
      outputRange: [1, 2.5]
    });

    
    return (
      <>

        {
          // La vista animada que parece contener los componentes (se mantiene visible).
          // Se mantienen separadas porque la animación escalaría también los compoenentes.
        }     
        <Animated.View style={[containersStyles.animatedContainer, 
                              {
                                transform: [
                                  {  
                                      scaleY: heightAnimatedValue
                                  },                            
                              ],
                              }
                            ]}
        />
        
        {
          // La vista real que contiene los componentes (se mantiene invisible)
        }
        <View style={containersStyles.staticContainer}>
          <TimeRecording show={this.state.showTimeRecording} time={this.state.recordTime.substring(0, 5)}/>
          <ButtonRecord onPress={() => this.manageRecorder()}/>
        </View>
      </>  
    )
  };

}


const containersStyles = StyleSheet.create({
  animatedContainer: {
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0, 0.2)',
    justifyContent: 'flex-end',
    width:"100%",
    height: 135,
    alignItems:'center',
    backgroundColor:'white',
  },
  staticContainer: {
    position: 'absolute', 
    width: '100%', 
    bottom: 10, 
    alignItems: 'center', 
    justifyContent: 'center' 
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
