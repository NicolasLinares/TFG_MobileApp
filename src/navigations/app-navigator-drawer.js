import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import StackNavigator from './app-navigator-stack';

import { BasicUserInfo, LogoutButton } from '_organisms';
import { COLORS } from '_styles';
import IconMI from "react-native-vector-icons/MaterialIcons";
import IconII from "react-native-vector-icons/Ionicons";

class SideMenu extends Component {

    _renderLinkItem(name, icon, onPress) {
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity
                    onPress={
                        () => {
                            onPress();
                            this.props.navigation.closeDrawer();
                        }
                    }
                    style={styles.item}
                >
                    <IconII style={styles.icon} name={icon} />
                    <Text style={styles.name}>{name}</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>

                <BasicUserInfo />

                <View style={{flex:1, marginTop: 50}}>
                    {this._renderLinkItem('Perfil', 'person-outline', () => this.props.navigation.navigate('Profile'))}
                    {this._renderLinkItem('Ajustes', 'settings-outline', () => this.props.navigation.navigate('Settings'))}
                    {this._renderLinkItem('Ayuda', 'help-circle-outline', () => { })}
                </View>

                <LogoutButton nav={this.props.navigation}/>

                <View style={styles.copyright}>
					<Text style={{ fontSize: 13 }}>
						Invox Medcorder {'\u00A9'} 2020
              		</Text>
				</View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex:1, 
        marginTop: 100, 
        marginHorizontal: 10, 
        justifyContent: 'space-between'
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
    },
    copyright: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 50
    }
});

const AppNavigator = createDrawerNavigator(
    {
        Home: StackNavigator,
    },
    {
        contentComponent: SideMenu
    }
);

export default AppNavigator;
