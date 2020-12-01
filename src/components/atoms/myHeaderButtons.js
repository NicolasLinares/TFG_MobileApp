import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import IconMI from "react-native-vector-icons/MaterialIcons";
import IconII from "react-native-vector-icons/Ionicons";

import { COLORS } from '_styles';


export function MenuButton(navigation) {
    return (
        <TouchableOpacity
            style={{ height: 40, width: 60, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => navigation.openDrawer()}
        >
            <IconMI style={{ marginRight: 10, fontSize: 25, color: COLORS.electric_blue }} name={"menu"} />
        </TouchableOpacity>
    )
};

export function SearchButton(navigation) {
    return (
        <TouchableOpacity
            style={{ height: 40, width: 60, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => navigation.navigate('Search')}
        >
            <IconMI style={{ color: COLORS.electric_blue, fontSize: 30 }} name={'search'} />
        </TouchableOpacity>
    )
};

export function BackButton(navigation) {
    return (
        <TouchableOpacity
            style={{ height: 50, width: 40, justifyContent: 'center', alignSelf: 'flex-start'}}
            onPress={() => navigation.goBack()}
        >
            <IconII style={{ color: COLORS.electric_blue, fontSize: 30 }} name={'chevron-back'} />
        </TouchableOpacity>
    )
};
