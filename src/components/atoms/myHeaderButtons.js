import React from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import IconMI from "react-native-vector-icons/MaterialIcons";
import IconII from "react-native-vector-icons/Ionicons";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

import store from '_redux_store';

import { COLORS } from '_styles';

import { storageService } from '_services';


export function BackButton(navigation) {


    const handleGoBack = async () => {

        const state = store.getState();
        let audiolist = state.audioListReducer.audiolist;

        if (audiolist.length > 0) {
            await Alert.alert(
                'Cancelar grabación',
                'Se eliminarán las notas de voz de forma permanente',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Eliminar',
                        onPress: async () => {

                            // Elimina cada audio del filesystem
                            await storageService.deleteListFiles(audiolist);
                            navigation.goBack()
                        },
                    },
                ],
            );
        } else {
            navigation.goBack()
        }

    }

    return (
        <TouchableOpacity
            style={{ height: 40, width: 50, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => handleGoBack()}
        >
            <IconII style={{ marginRight: 20, fontSize: 30, color: COLORS.electric_blue }} name={'chevron-back'} />
        </TouchableOpacity>
    )
};

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

export function OptionsButton() {

    const handleDelete = async () => {
        await Alert.alert(
            'Eliminar todo',
            'Se van a eliminar todas las notas de voz de forma permamente',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        await storageService.deleteAllFiles();
                    },
                },
            ],
        );
    }

    return (
        <Menu>
            <MenuTrigger>
                <IconII style={{ marginRight: 10 }} name={"ios-ellipsis-vertical"} size={25} color={COLORS.electric_blue} />
            </MenuTrigger>

            <MenuOptions optionsContainerStyle={{ borderRadius: 10, width: 280, marginTop: 30 }} >

                <MenuOption style={{
                    height: 50,
                    width: '95%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }} onSelect={() => handleDelete()}>
                    <Text style={{ marginLeft: 15, fontSize: 16, color: 'red' }}>Eliminar todo</Text>
                    <IconII style={{ fontSize: 25, color: 'red' }} name={'trash-outline'} />
                </MenuOption>

            </MenuOptions>
        </Menu>
    )
};

export function CloseButton(onClose) {
    return (
        <TouchableOpacity
            style={{ height: 40, width: 50, alignItems: 'flex-start', justifyContent: 'center' }}
            onPress={() => onClose()}
        >
            <IconII style={{ fontSize: 30, color: COLORS.electric_blue }} name={'close-outline'} />
        </TouchableOpacity>
    )
};

export function AcceptButton(onAccept) {
    return (
        <TouchableOpacity
            style={{ height: 40, width: 50, alignItems: 'flex-end', justifyContent: 'center' }}
            onPress={() => onAccept()}
        >
            <IconII style={{ fontSize: 30, color: COLORS.electric_blue }} name={'checkmark'} />
        </TouchableOpacity>
    )
};