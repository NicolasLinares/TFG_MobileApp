import React, { Component } from 'react';
import {Recorder, AudioList, PatientInfo} from '_organisms';

import {
  View,
  StyleSheet,
} from 'react-native';

class RecorderScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <PatientInfo />
        <AudioList />
        <Recorder />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems:'center',
  },
});

export default RecorderScreen;