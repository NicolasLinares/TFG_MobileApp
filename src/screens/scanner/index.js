import React, { Component } from 'react';
import {
	StatusBar
} from 'react-native';
import { Scanner } from '_controllers';

class ScannerScreen extends Component {

	render() {
		return (
			<>
				<StatusBar barStyle={'light-content'} />
				<Scanner nav={this.props.navigation} />
			</>
		);
	}
}


export default ScannerScreen;
