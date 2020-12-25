/**
* @fileoverview Lista de notas de audio almacenadas en la base de datos del servidor (historial de audios grabados)
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';

import AlertAsync from "react-native-alert-async";

import { SwipeListView } from 'react-native-swipe-list-view';
import { HistoryItem, HiddenButtons } from '_buttons';
import { FadeInAnimation } from '_animations';

import { COLORS, CONSTANTS } from '_styles';

import moment from 'moment';


class HistoryList extends Component {

    constructor(props) {
        super(props);
    }

    _renderItem = (data, rowMap) => {
        return (
            <HistoryItem
                item={data.item}
                handleAudioDelete={() => this.handleDeleteRow(rowMap, data.item)}
                nav={this.props.nav}
            />
        );
    }

    closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    handleDeleteRow = async (rowMap, item) => {
        return await AlertAsync(
            'Eliminar nota de voz',
            'La nota de voz "' + item.localpath + '" y su transcripción se van a eliminar de forma permanente',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                    onPress: () => {
                        this.closeRow(rowMap, item.uid);
                        return Promise.resolve(false);
                    }
                },
                {
                    text: 'Eliminar',
                    onPress: () => {
                        this.props.handleAudioDelete(item);
                        return Promise.resolve(true);
                    },
                },
            ],
        );
    }

    _renderHiddenButtons = (data, rowMap) => {
        return (
            <HiddenButtons
                buttonWidth={65}
                onPressDelete={() => this.handleDeleteRow(rowMap, data.item)}
            />
        );
    }

    _renderSection = ({ section }) => {

        // Comprobar si la fecha de la sección corresponde a 'hoy'
        if (section.date === moment().format('LL')) {
            date = 'Hoy';
        } else {
            // Comprobar si la fecha de la sección corresponde a 'Ayer'
            yesterday = moment() - 86400000; // le resto un dia en milisegundos
            m = moment(yesterday);
            if (section.date === m.format('LL'))
                date = 'Ayer';
            else
                date = section.date;
        }

        return (
            <FadeInAnimation style={{ flex: 1 }} duration={400}>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{date}</Text>
                </View>
            </FadeInAnimation>
        );
    };


    render() {
        return (
            <SwipeListView
                useSectionList={true}
                overScrollMode={"never"}
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.uid}
                sections={this.props.list}
                stickySectionHeadersEnabled
                renderSectionHeader={this._renderSection}
                renderItem={this._renderItem}
                renderHiddenItem={this._renderHiddenButtons}
                rightOpenValue={-65}
                disableRightSwipe={true}
                closeOnScroll={true}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onScrollEndDrag={() => this.props.refresh()} // más fluido con onMomentumScrollBegin pero con swipe up también se activa
                ListFooterComponent={() => this.props.loading ? <ActivityIndicator size="small" color={COLORS.grey} style={{ marginTop: 20 }} /> : null}
            />
        )
    }
}

const styles = StyleSheet.create({
    audiolist: {
        width: "100%",
        backgroundColor: 'white',
    },
    dateContainer: {
        alignSelf: 'flex-start',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(210,210,210, 0.6)',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 40
    },
    dateText: {
        color: 'black',
        marginHorizontal: 10,
        marginVertical: 3
    },

    deleteButton: {
        width: 65,
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 10,
        marginRight: CONSTANTS.marginHorizontalItemList,
        marginVertical: CONSTANTS.marginVerticalItemList
    },
});


export default HistoryList;
