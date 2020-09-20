import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';

import { COLORS } from '_styles';


class mySwitch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: 'left', // Indica el botón seleccionado
    }
  }

  handleClick = (id) => {
    // Cada botón llama a la función pasándole su identificador
    // así se evita que un mismo botón se presione varias veces
    this.setState({
      selected: id,
    });
  }

  render() {
    return (
        <View style={styles.container}>

          <TouchableWithoutFeedback onPress={() => this.handleClick('left') }>
            <View style={[styles.button, this.state.selected === 'left' ? styles.active : styles.inactive]}>
              <Text style={[styles.text, this.state.selected === 'left' ? styles.text_active : styles.text_inactive]}> 
                {this.props.textLeft}
              </Text>       
            </View>

          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => this.handleClick('right')}>
            <View style={[styles.button, this.state.selected === 'right' ? styles.active : styles.inactive]}>
              <Text style={[styles.text, this.state.selected === 'right' ? styles.text_active : styles.text_inactive]}> 
                {this.props.textRight}
              </Text>
            </View>
          </TouchableWithoutFeedback>

        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    backgroundColor: 'white', 
    alignItems:'center', 
    justifyContent: 'center',
  },
  button : {
    flex: 1,
    height: '100%',
    alignItems:'center', 
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'black'
  },
  active : {
    borderBottomWidth: 3,
  },
  inactive : {
    borderBottomWidth: 0,
  },
  text: {
    fontSize: 18,
  },
  text_active: {
    color: 'black',
  },
  text_inactive: {
    color: COLORS.dark_grey,
  }
});

export default mySwitch;
