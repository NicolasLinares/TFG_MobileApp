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

import { COLORS, CONSTANTS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";

import { TagButton as TagView } from '_buttons';
import { FadeInAnimation } from '_animations';

import moment from 'moment';

class HistoryItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.item.name,
            created_time: this.getCreatedTime(this.props.item.created_at),
            tag: this.props.item.tag,
            status: this.props.item.status,
        }
    }

    getCreatedTime(timestamp) {
        m = moment(timestamp);
        return m.format('HH:mm');
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
                                <Text style={styles.date} >
                                    {this.state.created_time}
                                </Text>

                                <TagView
                                    pressed={false}
                                    style={{ height: 20, borderRadius: 7 }}
                                    textStyle={{ fontSize: 11 }}
                                    tag={this.state.tag}
                                />

                                <Text style={{fontSize: 12, marginTop: 7, marginRight: 10, marginLeft: 25, color: this.state.status !== 'Completada' ? 'red' : 'green'}}>
                                    {this.state.status}
                                </Text>

                            </View>
                        </View>

                        <IconII style={{fontSize: 25, color: COLORS.grey}} name={'chevron-forward'} />
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
        marginHorizontal: CONSTANTS.marginHorizontalItemList,
        marginVertical: CONSTANTS.marginVerticalItemList,
    },
    info: {
        flexDirection: 'column',
        width: '80%',
        marginLeft: 20,
    },
    name: {
        marginVertical: 5,
        fontSize: 16,
    },
    date: {
        marginTop: 7,
        fontSize: 12,
        marginRight: 25,
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


export default HistoryItem;






