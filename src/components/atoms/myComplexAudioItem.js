import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';

import { CONSTANTS } from '_styles';

import { default as Player } from './myPlayer';

import CollapsibleView from "@eliav2/react-native-collapsible-view";
import { COLORS } from '_styles';


class myComplexAudioItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.item.name,
            created_time: this.props.item.ctime,
            description: null
        }
    }

    _renderHeader = () => (
        <View style={styles.item}>
            <View style={styles.info}>
                <Text style={styles.name}>{this.state.name}</Text>
                <Text style={styles.date}>
                    {this.state.created_time}
                </Text>
            </View>

            <Player item={this.props.item} stream={false} />
        </View>
    );

    render = () => (


        <CollapsibleView
            activeOpacityFeedback={1}
            style={styles.collapseHeader}
            title={this._renderHeader()}
            noArrow={true}
            initExpanded={false}
            collapsibleProps={{ collapsedHeight:0, onAnimationEnd: () => this.props.onCollapse()}} // bloquea el swipe de borrado
        >

            <View style={styles.textContainer}>
                <TextInput
                    maxLength={255}
                    multiline={true}
                    numberOfLines={3}
                    style={styles.text}
                    value={this.state.description}
                    placeholder={'Escribe una descripción...'}
                    placeholderTextColor={COLORS.dark_grey}
                    onChangeText={(value) => this.setState({ description: value })}
                />
            </View>
        </CollapsibleView>

    )

}



const styles = StyleSheet.create({
    collapseHeader: {
        maxHeight: 300,
        backgroundColor: 'white',
        justifyContent: 'center',
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
        borderWidth: 0,
        marginHorizontal: CONSTANTS.marginHorizontalItemList,
        marginVertical: CONSTANTS.marginVerticalItemList,
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    info: {
        flexDirection: 'row',
        height: 20,
        width: '95%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 10,
        marginHorizontal: 10,
    },
    name: {
        fontSize: 14
    },
    date: {
        fontSize: 14
    },


    textContainer: {
        marginTop: 10,
        marginBottom: 2,
        marginHorizontal: 2,
        backgroundColor: COLORS.light_grey,
        borderRadius: 7,
    },
    text: {
        height: 50,
        fontSize: 15,
        lineHeight: 20,
        textAlign: 'justify',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
});


export default myComplexAudioItem;






