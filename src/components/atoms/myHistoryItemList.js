import React, { Component } from 'react';

import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { COLORS, CONSTANTS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";

import moment from 'moment';

class myHistoryItemList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name: this.props.item.name,
          created_time: this.getCreatedTime(this.props.item.created_at),
          tag:  this.props.item.tag,
        }
    }

    getCreatedTime(timestamp) {
        m = moment(timestamp);
        return m.format('HH:mm');
    }

    render() {
        
        return (
            <TouchableOpacity
                onPress={() => this.props.nav.navigate('Audio', this.props.item)}
            >
                <View style={styles.item}>
                    <View style={styles.info}>
                        <Text style={styles.name}>{this.state.name}</Text>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.date}>
                                {this.state.created_time}
                            </Text>

                            <View style={styles.tag}>
                                <Text style={styles.tagText}>
                                    {this.state.tag}
                                </Text>
                            </View>
                        </View>

                    </View>

                    <IconII style={styles.icon} name={'chevron-forward'}/>
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
        justifyContent: 'space-around',
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
        marginLeft: 20
    },
    name: {
        fontSize: 16
    },
    date: {
        marginTop: 7,
        fontSize: 12,
    },
    icon: {
        fontSize: 25,
        color: COLORS.grey,
    },
    tag: {
        backgroundColor: COLORS.light_green,
        height: 20,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        borderRadius: 7,
        marginTop: 5,        
        marginHorizontal: 30,
        borderWidth: 1,
        borderColor: COLORS.green
    },
    tagText: {
        marginHorizontal: 10,
        fontSize: 12,
        alignSelf: 'center',
        justifyContent: 'center',
    }
});


    
  
  export default myHistoryItemList;
  





