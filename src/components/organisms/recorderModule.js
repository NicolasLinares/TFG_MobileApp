import React, { Component } from 'react';
import { Platform } from 'react-native';

import AudioRecorderPlayer, {
	AVEncoderAudioQualityIOSType,
	AVEncodingOption,
	AudioEncoderAndroidType,
	AudioSourceAndroidType
} from 'react-native-audio-recorder-player';

import * as FS from '_constants';

import moment from 'moment';
import 'moment/locale/es';

import { RecorderButton } from '_atoms';

import { connect } from 'react-redux';
import { addAudio } from '_redux_actions';

import { storageService } from '_services';


class recorderModule extends Component {

	constructor(props) {
		super(props);
		this.state = {
			recorder: new AudioRecorderPlayer(),
			audio: null,
			isRecording: false,

			timer: null,
			minutes_Counter: '00',
			seconds_Counter: '00',
		};
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

	setAudioPath() {

		let name = 'audio_' + moment().format('DDMMYYYY_HHmmss');
		let extension = 'wav'

		let path = Platform.select({
			ios: name + '.' + extension,
			android: FS.DIRECTORY + '/'+ name + '.' + extension,
		});

		return [name, extension, path];
	}

	async getCreatedTime(file_path) {
		let path = file_path.replace('file://', '');
		let timestamp = (await storageService.getFileInfo(path)).lastModified;
		let m = moment(timestamp);
		return m.format('HH:mm');
	}

	async startRecorder() {

		const audioSet = {
			AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
			AudioSourceAndroid: AudioSourceAndroidType.MIC,
	
			AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.low,
			AVNumberOfChannelsKeyIOS: 1,
			AVFormatIDKeyIOS: AVEncodingOption.lpcm,
		};


		let audiofile = this.setAudioPath();
		let name = audiofile[0];
		let extension = audiofile[1];
		let path = audiofile[2];

		let file_path = await this.state.recorder.startRecorder(path, audioSet, true); // devuelve en formato file://path
		let ctime = await this.getCreatedTime(file_path);
		let audio = {
			name: name,
			extension: extension,
			localpath: name + '.' + extension,
			ctime: ctime,
		};

		this.state.recorder.addRecordBackListener();
		return audio;
	};


	async stopRecorder() {
		await this.state.recorder.stopRecorder();
		this.state.recorder.removeRecordBackListener();
	};


	async handleRecorder() {
		// START recording
		if (!this.state.isRecording) {
			let newAudio = await this.startRecorder();

			this.startTimer();

			this.setState({
				audio: newAudio,
				isRecording: !this.state.isRecording // true
			});

		} else {

			// STOP recording
			await this.stopRecorder();

			this.stopTimer();

			this.props.addNewAudio(this.state.audio);

			// Reinicia valores
			this.setState({
				audio: null,
				isRecording: !this.state.isRecording // false
			});
		}
	}


	render() {
		return (
			<RecorderButton
				onPress={() => this.handleRecorder()}
				time={this.state.minutes_Counter + ' : ' + this.state.seconds_Counter}
			/>
		)
	};

}


const mapDispatchToProps = (dispatch) => {
	return {
		addNewAudio: (audio) => dispatch(addAudio(audio))
	}
}


export default connect(null, mapDispatchToProps)(recorderModule);
