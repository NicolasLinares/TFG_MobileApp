import React, { Component } from 'react'
import {
    StyleSheet,
    FlatList
} from 'react-native';

import {Tag} from '_atoms';

class myFilterList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lastTagUsed: null
        } 
    }

    removeTagUsed() {
        this.setState({
            lastTagUsed: null
        });
    }

    onPress(tag) {
        this.props.onPressTag(tag);

        this.setState({
            lastTagUsed: tag
        });
    }

    _renderItem = ({ item }) => (
        <Tag 
            pressed={true}
            onPress={() => this.onPress(item.tag)}
            tag={item.tag}
            lastTagUsed={this.state.lastTagUsed}
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

export default myFilterList;


