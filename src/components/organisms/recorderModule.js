import React, { Component } from 'react';

import { RecorderView } from '_molecules';
import {recorderService as RecorderService} from '_services';

class recorderModule extends Component {

  constructor(props) {
    super(props);
    this.state = {
        audio: {},
        isRecording: false,

        timer: null,
        minutes_Counter: '00',
        seconds_Counter: '00',
    };
  }

  componentDidMount() {
    RecorderService.configure();
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  startTimer() {

    let timer = setInterval(() => {

      var num = (Number(this.state.seconds_Counter) + 1).toString(),
        count = this.state.minutes_Counter;

      if (Number(this.state.seconds_Counter) == 59) {
        count = (Number(this.state.minutes_Counter) + 1).toString();
        num = '00';
      }

      this.setState({
        minutes_Counter: count.length == 1 ? '0' + count : count,
        seconds_Counter: num.length == 1 ? '0' + num : num
      });
    }, 1000);

    this.setState({ timer });
  }

  stopTimer() {
      clearInterval(this.state.timer);
      this.setState({
        timer: null,
        minutes_Counter: '00',
        seconds_Counter: '00',
      });
  }



   async handleRecorder () {

      if (!this.state.isRecording) {
        newAudio = await RecorderService.start();

        this.startTimer();

        this.setState({
          audio: newAudio,
          isRecording: !this.state.isRecording
        });
        
      } else {
        await RecorderService.stop();

        this.stopTimer();

        this.setState({
          isRecording: !this.state.isRecording
        });

        //this.props.updateAudioList(this.state.audio);
        //RecorderService.play(this.state.audio.path);
      }
  }


  render() {

    return (
      
        <RecorderView
          onPress={() => this.handleRecorder()} 
          time={this.state.minutes_Counter + ' : '+ this.state.seconds_Counter}
        />
    )
  };

}

export default recorderModule;