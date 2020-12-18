import React, { Component } from 'react'
import {
    StyleSheet,
    FlatList
} from 'react-native';

import {Tag} from '_atoms';

class filterList extends Component {

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

        this.setState({
            currentTag: tag
        });
    }

    _renderItem = ({ item }) => (
        <Tag 
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

export default filterList;


