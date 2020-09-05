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


list = [];
current_audio = null;

class Recorder extends Component {

  constructor(props) {
    super(props);
    this.state = {
        searchItems: [],
        searchValue: '',
        buttomType: 'mic',
        isRecording: false,
        recordSecs: 0,
        recordTime: '00:00',
        //currentPositionSec: 0,
        //currentDurationSec: 0,
        //playTime: '00:00',
        //duration: '00:00',
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.1);
  }

  getTime(item) {
    m = item.mtime.getMinutes();
    minutes = m < 10 ? "0"+ m : m;
    return item.mtime.getHours()+":"+ minutes;
  }

  componentDidMount() {
    list = [];
    current_audio = null;

    RNFS.readDir(`${RNFS.CachesDirectoryPath}`).then(res => {
      res.forEach(item => {
        if (item.name.includes("audio")) {
          current_audio = {
            name: item.name,
            path: "file://" + item.path,
            creation_date: this.getTime(item),
          };

          list.unshift(current_audio);
        }        
      });

      this.setState({
        searchItems: list,
      });
    }).catch(err => {
        console.log(err.message, err.code);
    });
  }

  componentWillUnmount() {
    console.log("Desmontado");
  }

  deleteFile = (item) => { 

    Alert.alert(
      "Borrando " + item.name,
      "¿Estás seguro de que deseas borrar el audio?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        { text: "Borrar", 
          onPress: () => {
            
            // Si el audio se encuentra en la lista devuelve su índice
            i = list.findIndex(it => it.name  === item.name);
            if (i > -1) {
              
              // Se borra en el filesystem
              RNFS.unlink(`${item.path}`).then(res => {
                // Si se ha borrado correctamente actualizamos
                // la lista y el render
                list.splice(i, 1);
                this.setState({
                  searchItems: list,
                });
              }).catch(err => {
                alert("Error al borrar el audio");
              });
            }
          }
        }
      ],
      { cancelable: false }
    );
    
  }

  setAudioPath = () => {

    filename = 'audio_' + moment().format('DDMMYYYY_HHmmss') + ".mp4";

    path = Platform.select({
        ios: filename, // .m4a
        android: 'sdcard/' + filename, // .mp4
    });

    return [filename, path];
  }

  onStartRecorder = async () => {
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
      creation_date: null,
    };

    this.audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        buttomType: 'stop',
        isRecording: true,
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position)
        ),
      });
    });
    
  };

  onStopRecord = async () => {
    const result_path = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();

    current_audio.creation_date = moment().format('HH:mm');
    
    list.unshift(current_audio);

    this.setState({
      searchItems: list,
      buttomType: 'mic',
      isRecording: false,
      recordSecs: 0,
      recordTime: '00:00',
    });

    console.log(result_path);
  };

  manageRecorder = async () => {
      if (!this.state.isRecording) {
        this.onStartRecorder();

      } else {
        this.onStopRecord();
      }
  }

  onStartPlay = async (path, e) => {
    console.log('onStartPlay');
      
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

  searchFilterFunction = text => {   
    this.setState({
      searchValue: text
    });
    
    const newData = this.state.searchItems.filter(item => {      
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });
    this.setState({searchItems: newData});
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onStartPlay(item.path)} >
      <ListItem   
        bottomDivider
      > 
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{""}</ListItem.Subtitle>
          <ListItem.Subtitle>{item.creation_date}</ListItem.Subtitle>
          
        </ListItem.Content>
        <IconII name={"chevron-forward"} size={30} color='rgb(255,70,70)'/>
        <TouchableOpacity onPress={() => this.deleteFile(item)}>
              <IconII name={"trash-outline"} size={27} color='rgb(255,70,70)'/>
        </TouchableOpacity>
      </ListItem>
    </TouchableOpacity>
  )

  renderSearchBar = () => {    
    return (
      
      /*
        Se trabaja con dos listas, una que mantiene siempre la lista de audios (list) y otra
        que contiene los items que coinciden con la búsqueda (data).
      */

      <SearchBar
        searchIcon={{ size: 24 }}
        containerStyle={{width:"100%", backgroundColor: 'white'}}
        inputContainerStyle={LayersStyles.searchbar}
        placeholder="Buscar..."        
        lightTheme        
        round
        value={this.state.searchValue}
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        onCancel={this.state.searchItems = list}
        showCancel
      />  
    );  
  };

  render() {
    return (
      <View style={LayersStyles.container}>

        <FlatList 
          style={LayersStyles.audiolist}
          keyExtractor={this.keyExtractor}
          data={this.state.searchItems}  
          extraData={this.state}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderSearchBar}
          stickyHeaderIndices={[0]}
        />
      

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
  searchbar:{
    alignSelf: 'center', 
    width: '95%', 
    backgroundColor: 'rgba(0,0,0, 0.07)'
  },
  audiolist:{
    width:"100%",
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
    backgroundColor:'#fff',
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
