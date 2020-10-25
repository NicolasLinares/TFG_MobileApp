import React, { Component } from 'react';
import { 
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { COLORS, CONSTANTS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";
import { ButtonLogout } from '_atoms';
import { URL } from '_data';

class SettingScreen extends Component {


    handleLogout = async () => {
        // Se prepara el cuerpo del mensaje y se envía
        json = {
            email: 'manuel@gmail.com'
        }
        data = JSON.stringify(json);
    
        const rawResponse = await fetch(URL.logout,
                                        {
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Api-Token': 'OQybIF1jqfjdqSwzVDevjBfoEUMT4Zwy5Z0O2lRBQnQIUEETMpcODNPKDjYI'
                                            },
                                            method : "PUT",
                                            body: data,
                                        });
    
        const status = await rawResponse.status;
    
        if (status === 200){ // OK
            //TODO limpiar datos de redux
            this.props.navigation.navigate('Auth');
        }
    }

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
            <ScrollView contentContainerStyle={styles.container}>
                {this._renderItem('Perfil', 'person-circle-outline')}
                {this._renderItem('Ayuda', 'help-circle-outline')}
                {this._renderItem('Información', 'information-circle-outline')}
                {this._renderItem('Cerrar sesión', 'log-out-outline', () => this.handleLogout() )}
            </ScrollView>
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
        fontSize: 30,
        marginHorizontal: 20,
        color: COLORS.light_electric_blue
    },
    name: {
        fontSize: 20,
        width: '65%',

    },
    divider: {
        alignSelf: 'flex-end',
        width: '95%',
        borderWidth: 0.5,
        borderColor: COLORS.light_grey
    }
});

export default SettingScreen;