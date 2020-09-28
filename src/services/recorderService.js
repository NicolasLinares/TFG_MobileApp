import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

import moment from 'moment';
import 'moment/locale/es';

import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';


export function configure() {
    audioRecorderPlayer = new AudioRecorderPlayer();
    audioRecorderPlayer.setSubscriptionDuration(0.1);
}

setAudioPath = () => {

    filename = 'audio_' + moment().format('DDMMYYYY_HHmmss') + '.mp4';

    path = Platform.select({
        ios: filename, // .m4a
        android:  RNFS.CachesDirectoryPath + '/'+ filename, // .mp4
    });

    return [filename, path];
}

export async function start() {
    
  const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.ACC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,

      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    audiofile = setAudioPath();
    name = audiofile[0];
    path = audiofile[1];

    absolute_path = await audioRecorderPlayer.startRecorder(path, true, audioSet);


    audio = {
      name: name,
      path: absolute_path,
      creation_time: moment().format('HH:mm'),
      creation_date: moment().format('LL')
    };
    
    audioRecorderPlayer.addRecordBackListener();
    return audio;
};



export async function stop() {
    const path = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
};


export function configurePlayer() {
  audioRecorderPlayer = new AudioRecorderPlayer();
}


export function getDuration(path, getDurationCallback) {

    var audio = new Sound(path , '',  (error) => {
      if (error) {
        console.log('Error al cargar la nota de audio. (RecorderService).', error);
        return;
      }
   
      // Con el callback se puede extraer el dato de la función asíncrona
      // desde el lugar donde se llama al método "getDuration".
      return getDurationCallback(audio.getDuration());
    });


    audio.release();
}

export async function play(path, getTime) {

  
    const msg = await audioRecorderPlayer.startPlayer(path);
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log('finished');
        audioRecorderPlayer.stopPlayer().catch(err => console.log(err.message));

      }

      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
      });
    });



    // CREO QUE FALTA HACER UN REMOVE DEL PLAYBACK LISTENER PORQUE SALEN MUCHOS 'finished'
};














/*

import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

import moment from 'moment';
import 'moment/locale/es';

import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';


export function configure() {
    audioRecorderPlayer = new AudioRecorderPlayer();
    audioRecorderPlayer.setSubscriptionDuration(0.1);
}

setAudioPath = () => {

    filename = 'audio_' + moment().format('DDMMYYYY_HHmmss') + '.mp4';

    path = Platform.select({
        ios: filename, // .m4a
        android:  RNFS.CachesDirectoryPath + '/'+ filename, // .mp4
    });

    return [filename, path];
}

export async function start() {
    
  const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.ACC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,

      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    audiofile = setAudioPath();
    name = audiofile[0];
    path = audiofile[1];

    absolute_path = await audioRecorderPlayer.startRecorder(path, true, audioSet);


    audio = {
      name: name,
      path: absolute_path,
      creation_time: moment().format('HH:mm'),
      creation_date: moment().format('LL')
    };
    
    audioRecorderPlayer.addRecordBackListener();
    return audio;
};



export async function stop() {
    const path = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
};


export function configurePlayer() {
  audioRecorderPlayer = new AudioRecorderPlayer();
}


export function getDuration(path, getDurationCallback) {

    var audio = new Sound(path , '',  (error) => {
      if (error) {
        console.log('Error al cargar la nota de audio. (RecorderService).', error);
        return;
      }
   
      // Con el callback se puede extraer el dato de la función asíncrona
      // desde el lugar donde se llama al método "getDuration".
      return getDurationCallback(audio.getDuration());
    });


    audio.release();
}

export async function play(path, getTime) {

  
    const msg = await audioRecorderPlayer.startPlayer(path);
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log('finished');
        audioRecorderPlayer.stopPlayer().catch(err => console.log(err.message));

      }

      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
      });
    });



    // CREO QUE FALTA HACER UN REMOVE DEL PLAYBACK LISTENER PORQUE SALEN MUCHOS 'finished'
};

*/