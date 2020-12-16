import React, { Component } from 'react'
import {
	Alert,
	StyleSheet
} from 'react-native';

import { BasicList } from '_molecules';

import { connect } from 'react-redux';
import { deleteAudio, addAudioTag } from '_redux_actions';

import RNFetchBlob from 'rn-fetch-blob';

import * as FS from '_constants';


class audioListModule extends Component {

	handleAudioDelete = (item, closeRow) => {
		Alert.alert(
			'Eliminar nota de voz',
			'La nota de voz "' + item.name + '.' + item.extension + '" se va a eliminar de forma permanente',
			[
				{
					text: 'Cancelar',
					style: 'cancel',
					onPress: closeRow
				},
				{
					text: 'Eliminar',
					onPress: () => {

						// Se borra en el filesystem porque el recorder
						// crea un fichero por cada grabación

						let localpath = FS.DIRECTORY + '/' + item.localpath;

						RNFetchBlob.fs.unlink(localpath).then(() => {
							// Se actualiza el estado
							this.props.delete(item.key);
						}).catch((err) => {
							alert("Error al borrar el audio");
						});

					}
				}
			]
		);
	}

	render() {
		return (
			<BasicList
				list={this.props.list}
				handleAudioDelete={this.handleAudioDelete}
			/>
		)
	}
}


const styles = StyleSheet.create({
	text: {
		fontWeight: 'bold',
		marginBottom: 20,
		fontSize: 18
	},
	topMessage: {
		textAlign: 'center',
	}
});


const mapStateToProps = (state) => {
	return {
		list: state.audioListReducer.audiolist,
		patientTag: state.patientCodeReducer.patientCode,
		token: state.userReducer.token,
		currentTagApplied: state.tagsReducer.currentTagApplied,
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		delete: (key) => dispatch(deleteAudio(key)),
		addAudioTag: (tag) => dispatch(addAudioTag(tag)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(audioListModule);