import React, { Component } from 'react';

import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import IconII from "react-native-vector-icons/Ionicons";
import {CONSTANTS} from '_styles';


class audioItemList extends Component {
    render() {
        return (

            <View style={styles.item}>
                <View style={styles.info}>
                    <Text style={styles.name}>{this.props.item.name}</Text>
                    <Text style={styles.date}>
                        {this.props.item.creation_date + ', '+ this.props.item.creation_time}
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.buttonRight}
                >
                    <IconII name={"chevron-forward"} size={30} color='rgb(255,70,70)'/>
                </TouchableOpacity>
            </View>


        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        marginHorizontal: CONSTANTS.marginHorizontalItemList,
        marginVertical: CONSTANTS.marginVerticalItemList,
        paddingVertical: 20,
  },
  info: {
    flex: 1,
    marginLeft: 30
  },
  name: {
    marginBottom:10,
    fontSize: 18
  }, 
  date: {
    fontSize: 14
  },
  buttonRight: {
      width: 50,
      height: 50,
      marginRight: 15,
      justifyContent: 'center',
      alignItems: 'flex-end',
  }
});

  
export default audioItemList;