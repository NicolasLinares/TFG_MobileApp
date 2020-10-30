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

import moment from 'moment';

class AudioScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: this.props.navigation.state.params.name,
          date: this.getDate(this.props.navigation.state.params.created_at),
          transcription: this.props.navigation.state.params.transcription,
        }
    }

    getDate(timestamp) {
      m = moment(timestamp);
      return m.format('LL, HH:ss');
    }


    _renderPlayer() { 
      return (
        <View style={styles.audio}>
          <Text style={styles.title}> {this.state.name}</Text>
          <Text style={styles.date}> {this.state.date}</Text>
          <Player item={this.props.navigation.state.params} stream={false} complexStyle={true}/>
        </View>
      );
    }

    _renderTranscription() {
      return (
        <View style={styles.transcriptionContainer}>
              
          <View style={styles.transcriptionHeader}>
              <Text style={styles.title}>Transcripción</Text>
              <View style={styles.actions}>
                <IconII style={styles.iconButtons} name={'share-social-outline'}/>
                <IconII style={styles.iconButtons} name={'create-outline'}/>
              </View>
          </View>

          <View style={styles.line}></View>

          <ScrollView style={styles.transcription}>
            <Text style={styles.text}>
              {this.state.transcription === null ? 
                  "La transcripción no está disponible por el momento" 
                :
                this.state.transcription
              }
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
  },
  iconButtons: {
    fontSize: 27,
    color: COLORS.electric_blue,
    marginHorizontal: 10
  },
});

export default AudioScreen;
