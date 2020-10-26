import React, { Component } from 'react';
import { Scanner } from '_organisms';

class ScannerScreen extends Component {

  render() {
    return (
        <Scanner nav={this.props.navigation}/>
    );
  }
}


export default ScannerScreen;
