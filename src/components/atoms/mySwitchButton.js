import React, { Component } from 'react';
import {
  Text, 
  StyleSheet
} from 'react-native';

import { Switch } from 'react-native-switch';
import { COLORS } from '_styles';


const left_name = 'Recientes'; // switch false
const right_name = 'Todos'; // switch true

class mySwitchButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      innerCircleText: left_name,
    }
  }

  handleClick(val) {
    var text = left_name;
    if (val) {
      text = right_name;
    }
    this.setState({
      active: val,
      innerCircleText: text
    });
  }

  render() {

    return (
      
          <Switch
              value={this.state.active}
              onValueChange={(val) => this.handleClick(val)}
              activeText={left_name}
              activeTextStyle={{color:COLORS.dark_grey}}
              inActiveText={right_name + '    '}
              inactiveTextStyle={{color:COLORS.dark_grey}}
              circleSize={40}
              barHeight={45}
              circleBorderWidth={1}
              backgroundActive={COLORS.light_grey}
              circleActiveColor={COLORS.green}
              backgroundInactive={COLORS.light_grey}
              circleInActiveColor={COLORS.blue}
              changeValueImmediately={false}
              innerCircleStyle={styles.activeButtonStyle} 
              outerCircleStyle={{justifyContent: 'space-evenly'}}
              renderActiveText={true}
              renderInActiveText={true}
              switchLeftPx={2} 
              switchRightPx={1.7} 
              switchWidthMultiplier={7}
              switchBorderRadius={30}
              renderInsideCircle={() => <Text style={{}}> {this.state.innerCircleText} </Text>} 
            />      
    );
  }
}


const styles = StyleSheet.create({
  activeButtonStyle: {
    borderColor: COLORS.dark_grey, 
    width: '50%', 
    justifyContent:'center', 
    alignItems:'center'
  }
});

export default mySwitchButton;
