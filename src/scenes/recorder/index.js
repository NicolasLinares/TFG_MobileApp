import React, { Component } from 'react';
import {Recorder, AudioList} from '_organisms';
import { Switch } from '_atoms';

import {
  View,
  StyleSheet,
} from 'react-native';

class RecorderScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <AudioList />
        <Recorder />
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