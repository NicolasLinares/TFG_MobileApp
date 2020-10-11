import React, { Component } from 'react';
import {Text, StyleSheet} from 'react-native';
import { HeadersAudioList } from '_molecules';

class historyListModule extends Component {
    render() {
        return (
            <>
                <Text style={styles.title}>
                    Mis notas de voz
                </Text>
                <HeadersAudioList nav={this.props.nav} />
            </>
        )
    }
}

const styles = StyleSheet.create({
    title: {
      fontSize: 25,
      marginVertical: 20,
      marginLeft: 40,
      fontWeight: 'bold',
      alignSelf: 'flex-start',
    },
});


export default historyListModule;