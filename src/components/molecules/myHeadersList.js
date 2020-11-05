import React, { Component } from 'react';
import { 
    StyleSheet, 
    SectionList,
    Text, 
    View,
} from 'react-native';

import {HistoryItem} from '_atoms';


class myHeadersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: null,
        };
    }

    _renderItem = ({item}) => {
        return (

            <HistoryItem item={item} nav={this.props.nav}/>     
        );
    }

    _renderDate = (date) => {
        return (
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{date}</Text>
            </View>
        );
    };

    _updateDate = ({ viewableItems, changed }) => {
        if (viewableItems && viewableItems.length) {
            const lastItem = viewableItems.pop();
            if (lastItem && lastItem.section) {
                this.setState({
                    currentDate: lastItem.section.title,
                });
            }
        }
    };

    render() {
        return (
            <SectionList
                contentContainerStyle={{ paddingBottom: 50}}
                showsVerticalScrollIndicator={false}
                style={styles.audiolist}
                sections={this.props.list}
                inverted={false}
                keyExtractor={(item) => item.uid} 
                renderItem={this._renderItem}
                renderSectionHeader={({ section: { date } }) => (this._renderDate(date))}
                onViewableItemsChanged={this._updateDate}
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

});

  
export default myHeadersList;
