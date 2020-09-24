import React, { Component } from 'react';

import { RecorderView } from '_molecules';
import {recorderService as RecorderService} from '_services';


import { connect } from 'react-redux';
import { addAudio } from '_redux_actions';


class recorderModule extends Component {

  constructor(props) {
    super(props);
    this.state = {
        audio: null,
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
        
        this.props.addNewAudio(this.state.audio);
        
        this.setState({
          audio: null,
          isRecording: !this.state.isRecording
        });
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


const mapDispatchToProps = (dispatch) => {
  return {
    addNewAudio: (audio) => dispatch(addAudio(audio))
  }
}


export default connect(null, mapDispatchToProps) (recorderModule);
