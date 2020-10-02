import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import {HistoryList} from '_organisms';

class HistoryScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
          <HistoryList nav={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    alignItems:'center',
  }

});

export default HistoryScreen;
