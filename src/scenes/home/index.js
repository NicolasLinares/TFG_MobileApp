import React, { Component } from 'react';
import {
	View,
	StyleSheet,
} from 'react-native';

import { ButtonNewRecord } from '_atoms';
import { HistoryList } from '_organisms';

import { permissionsService } from '_services';

class HomeScreen extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		permissionsService.checkAllPermissions();
	}

	async handleNewRecord() {
		let granted = await permissionsService.checkMicrophonePermissions();

		if (granted) {
			this.props.navigation.navigate('Recorder');
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<HistoryList nav={this.props.navigation} />
				<ButtonNewRecord onPress={() => this.handleNewRecord()} />
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: 'white',
	}
});

export default HomeScreen;