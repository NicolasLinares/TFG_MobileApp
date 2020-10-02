import React, { Component } from 'react';
import {Recorder, AudioList, PatientInfo} from '_organisms';

import {
  View,
  StyleSheet,
} from 'react-native';

import { COLORS } from '_styles';


class RecorderScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <PatientInfo nav={this.props.navigation} />
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