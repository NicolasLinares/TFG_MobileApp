import React, { Component } from 'react';
import {Recorder, AudioList} from '_organisms';
import { Switch } from '_atoms';

import {
  View,
  StyleSheet,
} from 'react-native';

class RecorderScreen extends Component {

  // Función para comunicar el Recorder con el AudioList
  sendNewAudio = (audio) => {
    this.refs.refAudioList.addAudio(audio);
  }

  render() {
    return (
      <View style={styles.container}>
        <Switch textLeft='Nuevas' textRight='Todos'/>
        <AudioList ref='refAudioList' />
        <Recorder updateAudioList={this.sendNewAudio.bind(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems:'center',
  },
});

export default RecorderScreen;