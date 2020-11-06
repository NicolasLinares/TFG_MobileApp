import React, { Component } from 'react';
import { 
    StyleSheet, 
    TouchableOpacity,
    Text, 
    View,
} from 'react-native';

import IconII from "react-native-vector-icons/Ionicons";
import { SwipeListView } from 'react-native-swipe-list-view';
import {SimpleAudioItem} from '_atoms';

import {CONSTANTS} from '_styles';

import moment from 'moment';


class mySectionList extends Component {

    constructor(props) {
        super(props);
    }

    closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };
    
    deleteRow = (rowMap, item) => {
        this.props.handleAudioDelete(item, () => this.closeRow(rowMap, item.uid));
    };

    _renderItem = data => {
        return (
            <SimpleAudioItem item={data.item} nav={this.props.nav}/>     
        );
    }

    _renderHideButtons  = (data, rowMap) => {
        return (
            <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => this.deleteRow(rowMap, data.item)}
            >
                <IconII name={"trash"} size={25} color='white'/>
            </TouchableOpacity>
        );
    }

    _renderSection  = ({ section }) =>  {

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
                date = section.date ;
        }

        return (
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{date}</Text>
            </View>
        );
    };


    render() {
        return (
            <SwipeListView
                useSectionList={true}
                contentContainerStyle={{ paddingBottom: 10}}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.uid}
                sections={this.props.list}
                renderSectionHeader={this._renderSection}
                renderItem={this._renderItem}
                renderHiddenItem={this._renderHideButtons}
                rightOpenValue={-65}
                disableRightSwipe={true}
                closeOnScroll={true}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onScrollEndDrag={() => this.props.refresh()}
            />
        )
    }
}

const styles = StyleSheet.create({
    audiolist:{
        width:"100%",
        backgroundColor: 'white',
    },
    dateContainer: {
        alignSelf: 'flex-start',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(210,210,210, 0.6)',
        borderRadius: 10,
        marginVertical: 10,
        marginLeft: 40
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


export default mySectionList;
