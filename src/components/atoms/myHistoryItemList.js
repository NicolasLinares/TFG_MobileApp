import React, { Component } from 'react';

import { 
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native';

import { COLORS, CONSTANTS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";

class myHistoryItemList extends Component {

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.nav.navigate('Audio',
                    {
                        name: this.props.item.name,
                        date: this.props.item.date + ', ' + this.props.item.time,
                    }
                )}
            >
                <View style={styles.item}>
                    <View style={styles.info}>
                        <Text style={styles.name}>{this.props.item.name}</Text>
                        <Text style={styles.date}>
                            {this.props.item.time}
                        </Text>
                    </View>

                    <IconII name={'chevron-forward'} size={30} color={'red'}/>
                </View>
            </TouchableOpacity>

        )
    }
}



const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
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
    },
    info: {
        flexDirection: 'column',
        width: '80%',
        backgroundColor: 'white',
    },
    name: {
        fontSize: 16
    },
    date: {
        marginTop: 5,
        fontSize: 12
    },
});


    
  
  export default myHistoryItemList;
  





