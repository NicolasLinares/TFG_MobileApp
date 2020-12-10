import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	View
} from 'react-native';

import { ButtonBack } from '_atoms';
import { COLORS } from '_styles';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { connect } from 'react-redux';
import { openTagEditor } from '_redux_actions';


class Scanner extends Component {

	constructor(props) {
		super(props);
		this.state = {
			flashMode: false,
		};
	}


	onScanSuccess = scan => {
		// Se muestra el código leido en el input
		this.props.nav.state.params.setTag(scan.data);
		// Se abre de nuevo el Editor con ese valor en el input
		this.props.openTagEditor();
		this.props.nav.goBack();
	};


	render() {
		return (
			<>
				<QRCodeScanner
					onRead={this.onScanSuccess}
					reactivate={false}
					showMarker
				/>

				{this._renderMessage()}

				<ButtonBack onPress={() => {
					this.props.nav.state.params.openTagEditor();
					this.props.nav.goBack();
				}} />
			</>
		)
	};


	_renderMessage() {
		return (
			<View style={styles.card}>
				<Text style={styles.message}>
					Encuentra un código para escanearlo
          </Text>
			</View>
		);
	}

}


const styles = StyleSheet.create({
	card: {
		position: 'absolute',
		top: 120,
		alignSelf: 'center',
		backgroundColor: COLORS.dark_grey,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 12
	},
	message: {
		textAlign: 'center',
		color: 'white',
		fontSize: 14,
		marginLeft: 20,
		marginRight: 20
	}
});

const mapDispatchToProps = (dispatch) => {
	return {
		openTagEditor: () => dispatch(openTagEditor()),
	}
}

export default connect(null, mapDispatchToProps)(Scanner);
