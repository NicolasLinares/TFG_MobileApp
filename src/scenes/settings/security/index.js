import React, { Component } from 'react';
import { 
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { COLORS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";

class SecurityScreen extends Component {

    _renderItem(name, icon, onPress) {
        return (
            <View style={styles.itemContainer}>
              <TouchableOpacity
                    onPress={() => onPress()}
                    style={styles.item}
                >
                    <IconII style={styles.icon} name={icon}/>
                    <Text style={styles.name}>{name}</Text>
                </TouchableOpacity>
                <View style={styles.divider}/>
            </View>
        );
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: 'white'}}>
                <ScrollView contentContainerStyle={styles.container}>
                    {this._renderItem('Cambiar contraseña', 'lock-closed-outline', () => this.props.navigation.navigate('ChangePassword'))}
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', 
      alignItems:'center', 
      justifyContent: 'flex-start'
    },
    itemContainer: {
        width: '100%',    
    },
    item: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    icon: {
        fontSize: 25,
        marginHorizontal: 20,
        color: COLORS.light_electric_blue
    },
    name: {
        fontSize: 18,
        width: '65%',
    },
    divider: {
        alignSelf: 'flex-end',
        width: '95%',
        borderWidth: 0.5,
        borderColor: COLORS.light_grey
    }
});


export default SecurityScreen;
