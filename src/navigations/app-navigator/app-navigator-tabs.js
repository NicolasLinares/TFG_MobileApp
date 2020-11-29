import React from 'react';

import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '_scenes/home';
import SearchScreen from '_scenes/home/search';

import { COLORS } from '_styles';
import IconMI from "react-native-vector-icons/MaterialIcons";


const TabsRouteConfigs = {
	Home: {
		screen: HomeScreen,
		navigationOptions: () => ({
			headerShown: false,
			title: 'Notas de voz',
			tabBarIcon: ({ tintColor }) => {
				return <IconMI name={'playlist-add'} color={tintColor} size={35} />
			}
		})
	},
	Search: {
		screen: SearchScreen,
		navigationOptions: () => ({
			title: 'Buscar',
			tabBarIcon: ({ tintColor }) => {
				return <IconMI name={'search'} color={tintColor} size={35} />
			}
		})
	}
};

const TabsNavigatorConfigs = {

	tabBarOptions: {
		showLabel: false,
		activeTintColor: COLORS.electric_blue,
		inactiveTintColor: COLORS.grey,
		labelStyle: {
			fontSize: 13,
			bottom: -5,
		},
		style: {
			backgroundColor: 'white',
			paddingTop: 3,
		},
	},
};

const TabsNavigator = createBottomTabNavigator(TabsRouteConfigs, TabsNavigatorConfigs);

export default TabsNavigator;
