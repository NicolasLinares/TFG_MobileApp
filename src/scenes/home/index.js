import React, { Component } from 'react';
import {
	View,
	StyleSheet,
} from 'react-native';


import { ButtonNewRecord, ButtonSettings } from '_atoms';
import { UserInfo, HistoryList } from '_organisms';

class HomeScreen extends Component {


	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>

				<View style={styles.container}>
					<View style={styles.header}>
						<UserInfo />
						<ButtonSettings onPress={() => this.props.navigation.navigate('Settings')} />
					</View>
					<HistoryList nav={this.props.navigation} />
				</View>

				<View style={styles.newRecordContainer}>
					<ButtonNewRecord onPress={() => this.props.navigation.navigate('Recorder')} />
				</View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: 'white',
	},
	header: {
		marginTop: 40,
		flexDirection: 'row',
		width: '100%',
	},
	newRecordContainer: {
		height: 90,
		width: "100%",
		borderWidth: 0.5,
		borderColor: 'rgba(0,0,0, 0.2)',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: 'white',
	},

});



export default HomeScreen;