/**
* @fileoverview Controles de grabación de audio (start record, stop record)
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react';

import moment from 'moment';
import 'moment/locale/es';

import { RecordButton } from '_buttons';

import { connect } from 'react-redux';
import { addAudio } from '_redux_actions';

import AudioRecord from 'react-native-audio-record';

class Recorder extends Component {

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

	async handleRecorder() {
		if (!this.state.isRecording) {

			// Se inicia el contador
			this.startTimer();

			// Inicializa el nombre y extensión del audio
			let time = moment(moment.now());
			let name = 'audio_' + time.format('DDMMYYYY_HHmmss');
			let extension = 'wav';
			let filename = name + '.' + extension;

			// Configura los parámetros del audio
			let options = {
				sampleRate: 16000,  // default 44100
				channels: 1,        // 1 or 2, default 1
				bitsPerSample: 16,  // 8 or 16, default 16
				wavFile: filename 	// default 'audio.wav'
			};

			// Comienza la grabación
			AudioRecord.init(options);
			AudioRecord.start();
			AudioRecord.on('data', data => {
				// "base64-encoded audio data chunks" (No funciona correctamente)
				// No se hace nada con data pero es necesario que esté así para funcionar
			});

			// Almacena los datos del audio para añadirlos despues a la lista
			let newAudio = {
				name: name,
				extension: extension,
				localpath: filename,
				ctime: time.format('HH:mm'),
			};

			this.setState({
				audio: newAudio,
				isRecording: !this.state.isRecording // true
			});

		} else {

			// Se para el contador
			this.stopTimer();

			// Finaliza la grabación
			let path = await AudioRecord.stop();
			console.log(this.state.audio.name + ' - Almacenado localmente en la ruta: ' + path);
			// Se añade el nuevo audio a la lista de nuevos audios
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
			<RecordButton
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


export default connect(null, mapDispatchToProps)(Recorder);
