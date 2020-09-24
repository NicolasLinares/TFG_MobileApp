import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

import moment from 'moment';
import 'moment/locale/es';

import RNFS from 'react-native-fs';


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


export async function play(path) {
      
    const msg = await audioRecorderPlayer.startPlayer(path);
    audioRecorderPlayer.setVolume(1.0);
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log('finished');
        audioRecorderPlayer.stopPlayer().catch(err => console.log(err.message));
      }
    });

    // CREO QUE FALTA HACER UN REMOVE DEL PLAYBACK LISTENER PORQUE SALEN MUCHOS 'finished'
};
