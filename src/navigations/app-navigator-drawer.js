import React, { Component } from 'react';
import {
    View,
    Platform
} from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import StackNavigator from './app-navigator-stack';

import { ProfileView, MenuLinks } from '_sidemenu';
import { LogoutButton } from '_buttons';

class Content extends Component {
    render() {
        return (
            <View style={{
                flex: 1,
                marginTop: Platform.OS === 'ios' ? 80 : 40,
                marginHorizontal: 10,
                justifyContent: 'space-between'
            }}>
                <ProfileView />
                <MenuLinks nav={this.props.navigation} />
                <LogoutButton nav={this.props.navigation} />
            </View>
        );
    }
}

const AppNavigator = createDrawerNavigator(
    {
        Home: StackNavigator,
    },
    {
        contentComponent: Content
    }
);

export default AppNavigator;
