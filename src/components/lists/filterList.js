/**
* @fileoverview Se define la lista de filtros de notas de voz
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/

import React, { Component } from 'react'
import {
    StyleSheet,
    FlatList
} from 'react-native';

import { TagButton } from '_buttons';

class FilterList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTag: null
        } 
    }

    removeTagUsed() {
        this.setState({
            currentTag: null
        });
    }

    onPress(tag) {
        this.props.onPressTag(tag);

        this.setState({ currentTag: tag });
    }

    _renderItem = ({ item }) => (
        <TagButton 
            pressed={true}
            onPress={() => this.onPress(item.tag)}
            tag={item.tag}
            currentTag={this.state.currentTag}
        />
    )


    render() {
        return (
            <FlatList
                overScrollMode={"never"}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.audiolist}
                contentContainerStyle={{ paddingRight: 40, paddingLeft: this.props.paddingLeft }}
                keyExtractor={(item) => item.key.toString()}
                data={this.props.data}
                renderItem={this._renderItem}
            />
        )
    }
}


const styles = StyleSheet.create({
    audiolist: {
        height: 40,
        width: "100%",
        paddingHorizontal: 30
    }
});

export default FilterList;


