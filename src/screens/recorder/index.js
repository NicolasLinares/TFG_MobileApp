import React, { Component } from 'react';

import {
	View,
	StyleSheet,
	Text
} from 'react-native';

import { Header } from 'react-native-elements';
import { HeaderButtons, DoneButton } from '_buttons';
import { Recorder } from '_controllers';
import { PatientCode } from '_modals';

import { RecordedList } from '_lists';

import moment from 'moment';

class RecorderScreen extends Component {

	render() {
		return (
			<View style={styles.container}>
				<Header
					// Se ha añadido aquí el header para que el modal de patient code se renderice
					// por encima, si no el modal quedaba por debajo del header del navigator 
					leftComponent={() => HeaderButtons.BackButton(this.props.navigation)}
					centerComponent={() => <Text style={styles.headerTitle}>Notas de voz</Text>}
					rightComponent={() => <DoneButton />}
					containerStyle={{borderBottomWidth: 0, backgroundColor: 'transparent'}}
				/>
				<PatientCode nav={this.props.navigation} />
				<Text style={{ marginVertical: 10 }}>{moment().format('LL')}</Text>
				<RecordedList />
				<Recorder />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});

export default RecorderScreen;
