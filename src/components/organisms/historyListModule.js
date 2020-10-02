import React, { Component } from 'react';
import { HeadersAudioList } from '_molecules';

class historyListModule extends Component {
    render() {
        return (
            <HeadersAudioList nav={this.props.nav} />
        )
    }
}



export default historyListModule;