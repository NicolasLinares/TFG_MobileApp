import React, { Component } from 'react';

import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { ListItem } from 'react-native-elements';
import IconII from "react-native-vector-icons/Ionicons";



class myItemList extends Component {
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
                    onPress={this.props.onPress}
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
        marginHorizontal: 5,
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
      marginRight: 15
  }
});

  
export default myItemList;