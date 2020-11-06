import React, { Component } from 'react';
import {Recorder, AudioList, PatientCodeEditor, PatientCode} from '_organisms';

import {
  View,
  StyleSheet,
} from 'react-native';

class RecorderScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <PatientCode />
        <AudioList />
        <Recorder />
        <PatientCodeEditor nav={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems:'center',
  }
});


export default RecorderScreen;
