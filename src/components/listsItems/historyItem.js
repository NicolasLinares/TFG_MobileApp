/**
* @fileoverview Diseño de los items usados en la lista del historial de notas de voz grabadas
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';

import { COLORS, DIMENSIONS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";

import { TagButton as TagView } from '_buttons';
import { FadeInAnimation } from '_animations';
import { UIActivityIndicator } from 'react-native-indicators';


import moment from 'moment';
import { httpService } from '_services';

import { connect } from 'react-redux';
import { updateTranscription} from '_redux_actions';

class HistoryItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: this.props.item.uid,
            name: this.props.item.name,
            date: this.getDate(this.props.item.created_at),
            created_time: this.getCreatedTime(this.props.item.created_at),
            tag: this.props.item.tag,
            status: this.props.item.status,
        }

        this.interval = null;
    }

    getCreatedTime(timestamp) {
        m = moment(timestamp);
        return m.format('HH:mm');
    }

    getDate(timestamp) {
		m = moment(timestamp);
		return m.format('LL');
	}

    async componentDidMount() {
		
		if (this.state.status !== 'Completada')
			this.interval = setInterval(() => this.checkTranscript(), 3000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	async checkTranscript() {
		let response = await httpService.getTranscript(this.state.uid);

		if (response !== null) {

			if (response.status === 'Completada') {
				clearInterval(this.interval);

				// Se actualiza la transcripción
                this.setState({ status: response.status });
                
                // añadir a redux para no volver a hacer la petición si ya está
				this.props.updateTranscription(this.state.date, this.state.uid, response.text); 
			}
		}
	}


    _renderStatus() {
        return (
            this.state.status === 'Completada' ?
                <IconII style={{ fontSize: 16, color: COLORS.green_Complete, marginTop: 4 }} name={'checkmark-circle'} />
            :
                <View style={{ height: 10, width: 10, alignSelf: 'center' }}>
                   <UIActivityIndicator animationDuration={1000} color={COLORS.grey} size={15} />
                </View>
        );
    }

    render() {

        return (
            <FadeInAnimation duration={400}>
                <TouchableWithoutFeedback
                    onPress={() => this.props.nav.navigate('Audio',
                        {
                            item: this.props.item,
                            updateNameHistoryItem: (name) => this.setState({ name: name }),
                            updateStatusHistoryItem: (status) => this.setState({ status: status }),
                            handleAudioDelete: this.props.handleAudioDelete,
                        }
                    )}
                >

                    <View style={styles.item}>
                        <View style={styles.info}>

                            <Text style={styles.name}>{this.state.name}</Text>

                            <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                                {this._renderStatus()}

                                <Text style={styles.date} >
                                    {this.state.created_time}
                                </Text>

                                <TagView
                                    pressed={false}
                                    style={{ height: 20, borderRadius: 7 }}
                                    textStyle={{ fontSize: 11 }}
                                    tag={this.state.tag}
                                />

                            </View>
                        </View>

                        <IconII style={{ fontSize: 25, color: COLORS.grey }} name={'chevron-forward'} />
                    </View>
                </TouchableWithoutFeedback>
            </FadeInAnimation>

        )
    }
}



const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        minHeight: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        marginHorizontal: DIMENSIONS.marginHorizontalItemList,
        marginVertical: DIMENSIONS.marginVerticalItemList,
    },
    info: {
        flexDirection: 'column',
        width: '80%',
        marginLeft: 10,
    },
    name: {
        marginVertical: 5,
        fontSize: 16,
    },
    date: {
        marginTop: 7,
        fontSize: 12,
        marginHorizontal: 25,
    },
    tag: {
        backgroundColor: COLORS.light_green,
        height: 20,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        borderRadius: 7,
        marginTop: 5,
        marginHorizontal: 30,
        borderWidth: 1,
        borderColor: COLORS.green
    },
    tagText: {
        marginHorizontal: 10,
        fontSize: 12,
        alignSelf: 'center',
        justifyContent: 'center',
    }
});


const mapDispatchToProps = (dispatch) => {
	return {
		updateTranscription: (date, uid, transcription) => dispatch(updateTranscription(date, uid, transcription)),
	}
}

export default connect(null, mapDispatchToProps)(HistoryItem);






