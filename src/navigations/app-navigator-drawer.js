import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import StackNavigator from './app-navigator-stack';

import { BasicUserInfo, LogoutButton } from '_organisms';
import { COLORS } from '_styles';
import IconII from "react-native-vector-icons/Ionicons";

class SideMenu extends Component {

    _renderLinkItem(name, icon, onPress) {
        return (
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
        );
    }

    render() {
        return (
            <View style={styles.container}>

                <BasicUserInfo />

                <ScrollView overScrollMode={'never'} style={{ flex: 1, marginTop: 50 }}>
                    {this._renderLinkItem('Perfil', 'person-outline', () => this.props.navigation.navigate('Profile'))}
                    {this._renderLinkItem('Ajustes', 'settings-outline', () => this.props.navigation.navigate('Settings'))}
                    {this._renderLinkItem('Ayuda', 'help-circle-outline', () => { })}

                </ScrollView>

                <LogoutButton nav={this.props.navigation} />

            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 80 : 40,
        marginHorizontal: 10,
        justifyContent: 'space-between'
    },

    item: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 25,
        marginHorizontal: 20,
        color: COLORS.light_electric_blue
    },
    name: {
        fontSize: 16,
        width: '65%',
    },
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
