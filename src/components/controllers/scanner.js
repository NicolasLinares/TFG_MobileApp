/**
* @fileoverview Escáner de códigos QR y de barras
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/


import React, { Component } from 'react';
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import { COLORS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";
import { CancelButton } from '_buttons';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera as Camera } from 'react-native-camera';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";


class Scanner extends Component {

	constructor(props) {
		super(props);
		this.state = {
			flash_mode: Camera.Constants.FlashMode.off,

			flash_background: COLORS.transparent_black,
			flash_color: COLORS.transparent_white,
			flash_icon: "flash-off",
			flash_activated: false,
		};
	}

	componentWillUnmount() {
		if (this.state.flash_activated) {
			this.setState({
				flash_activated: false
			});
		}
	}

	onScanSuccess = scan => {
		// Haptic feedback
		const options = { enableVibrateFallback: true, ignoreAndroidSystemSettings: false };
		ReactNativeHapticFeedback.trigger('impactMedium', options);

		// Se muestra el código leido en el input
		this.props.nav.state.params.setTag(scan.data);
		// Se abre de nuevo el Editor con ese valor en el input
		this.props.nav.goBack();
	};

	switchFlashMode = () => {

		const options = { enableVibrateFallback: true, ignoreAndroidSystemSettings: false };
		ReactNativeHapticFeedback.trigger('impactMedium', options);

		if (!this.state.flash_activated) {
			this.setState({
				flash_activated: !this.state.flash_activated,
				flash_icon: "flash",
				flash_color: COLORS.electric_blue,
				flash_background: COLORS.transparent_white,
				flash_mode: Camera.Constants.FlashMode.torch
			});

		} else {
			this.setState({
				flash_activated: !this.state.flash_activated,
				flash_icon: "flash-off",
				flash_color: COLORS.transparent_white,
				flash_background: COLORS.transparent_black,
				flash_mode: Camera.Constants.FlashMode.off
			});
		}

	}

	_renderFlashButton() {
		return (
			<TouchableOpacity
				style={[styles.button_flash, { backgroundColor: this.state.flash_background }]}
				onPress={() => this.switchFlashMode()}
			>
				<IconII name={this.state.flash_icon} size={25} color={this.state.flash_color} />
			</TouchableOpacity>
		);
	}



	render() {
		const { width } = Dimensions.get('screen');

		return (
			<>
				<QRCodeScanner
					onRead={this.onScanSuccess}
					flashMode={this.state.flash_mode}
					reactivate={false}
					vibrate={true}
					showMarker={true}
					fadeIn={false}
					cameraStyle={{ height: Dimensions.get("screen").height }}
					customMarker={
						<View style={cameraMask_style.rectangleContainer}>
							<View style={{ ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' }}>
								<View style={{ width: width / 2, height: width / 2 }}>
									<View style={{ flex: 0.2, flexDirection: 'row' }}>
										<View style={[{ flex: 0.2 }, cameraMask_style.leftTop]} />
										<View style={{ flex: 1 }} />
										<View style={[{ flex: 0.2 }, cameraMask_style.rightTop]} />
									</View>
									<View style={{ flex: 1 }} />
									<View style={{ flex: 0.2, flexDirection: 'row' }}>
										<View style={[{ flex: 0.2 }, cameraMask_style.leftBottom]} />
										<View style={{ flex: 1 }} />
										<View style={[{ flex: 0.2 }, cameraMask_style.rightBottom]} />
									</View>
								</View>
							</View>
						</View>}
				/>

				{this._renderMessage()}

				<CancelButton onPress={() => this.props.nav.goBack()} />

				{this._renderFlashButton()}
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
	},
	button_flash: {
		width: 70,
		height: 70,
		position: "absolute",
		right: 50,
		bottom: 80,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 35,
		backgroundColor: 'rgba(100,100,100,0.5)'
	},
});

const border_width = 6;
const border_color = 'rgba(255,255,255,0.7)';
const border_radius = 20;

const cameraMask_style = StyleSheet.create({
	rectangleContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	leftTop: {
		borderLeftWidth: border_width,
		borderTopWidth: border_width,
		borderColor: border_color,
		borderTopStartRadius: border_radius,
	},
	leftBottom: {
		borderLeftWidth: border_width,
		borderBottomWidth: border_width,
		borderColor: border_color,
		borderBottomStartRadius: border_radius
	},
	rightTop: {
		borderRightWidth: border_width,
		borderTopWidth: border_width,
		borderColor: border_color,
		borderTopEndRadius: border_radius
	},
	rightBottom: {
		borderRightWidth: border_width,
		borderBottomWidth: border_width,
		borderColor: border_color,
		borderBottomEndRadius: border_radius
	}
});

export default Scanner;
