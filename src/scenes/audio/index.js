import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Player } from '_atoms';
import {COLORS} from '_styles';
import IconII from "react-native-vector-icons/Ionicons";


class AudioScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          audioName: this.props.navigation.state.params.name,
          date: this.props.navigation.state.params.date,
        }
    }


    _renderPlayer() { 
      return (
        <View style={styles.audio}>
          <Text style={styles.title}> {this.state.audioName}</Text>
          <Text style={styles.date}> {this.state.date}</Text>
          <Player item={this.props.navigation.state.params} stream={true} complexStyle={true}/>
        </View>
      );
    }

    _renderTranscription() {
      return (
        <View style={styles.transcriptionContainer}>
              
          <View style={styles.transcriptionHeader}>
              <Text style={styles.title}>Transcripción</Text>
              <View style={styles.actions}>
                <IconII name={'create-outline'} size={27} color={COLORS.electric_blue}/>
              </View>
          </View>

          <View style={styles.line}></View>

          <ScrollView style={styles.transcription}>
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Vivamus consequat elit et urna posuere, non posuere leo 
              varius. Phasellus rhoncus turpis non sem gravida tempus. 
              Curabitur in mollis tellus. Nunc mi magna, facilisis id 
              vehicula id, aliquam id neque. Nam vitae dolor id mi tempus 
              faucibus. Duis euismod eu augue non congue. Quisque erat 
              dolor, pretium a est non, finibus elementum risus. Ut et 
              enim rhoncus, bibendum lacus eget, porttitor ante. 
              Suspendisse vitae nisl ultricies, ultricies nibh quis,
              sollicitudin nibh. Cras placerat erat ac quam vulputate, 
              quis eleifend metus molestie. Sed ac neque dignissim, 
              pharetra ex vel, placerat leo. Sed semper non urna in posuere. 
              Praesent sed est tristique, pulvinar lacus et, viverra 
              sapien. Proin risus sem, semper ut augue a, consequat 
              ornare diam. Curabitur porttitor sem eget leo ullamcorper, 
              sed sagittis ante imperdiet. Donec pharetra massa elit.
            </Text>
          </ScrollView>
        </View>
      );
    }

    render() {
        return (

        <View style={styles.container}>

          {this._renderPlayer()}
          {this._renderTranscription()}

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
      justifyContent: 'flex-start'
  },
  audio: {
      height: 220,
      width: '100%',
      backgroundColor: 'white',
      alignItems:'center',
      justifyContent: 'flex-start',
  },
  transcriptionContainer: {
      flex: 1,
      width: '95%',
      alignItems:'center',
      justifyContent: 'flex-start',
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius: 30,
      marginBottom: 10
  },
  transcriptionHeader:{
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between'
  },
  actions: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
  },
  line: {
    borderWidth: 1,
    borderColor: COLORS.light_grey,
    width: '80%'
  },
  transcription: {
      flex: 1,
      width: '90%',
      backgroundColor: 'white',
      marginBottom: 30,
      marginTop: 20,
  },
  title: {
      marginTop:20,
      marginBottom:10,
      fontSize: 20
  }, 
  date: {
      fontSize: 14
  },
  text: {
    fontSize: 17,
    paddingHorizontal: 20,
    textAlign:'justify'
  }
});

export default AudioScreen;
