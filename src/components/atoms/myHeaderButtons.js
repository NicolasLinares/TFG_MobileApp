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

import RNFetchBlob from 'rn-fetch-blob';
import { audioRequestService } from '_services';
import store from '_redux_store';

import { COLORS } from '_styles';

import {
    cleanHistory,
    cleanTags
} from '_redux_actions';


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

export function OptionsButton() {

    const deleteAll = async () => {

        await RNFetchBlob.fs.lstat(RNFetchBlob.fs.dirs.CacheDir)
            .then(async (stats) => {

                // Se borran los audios que se encuentren localmente
                for (i in stats) {
                    if (stats[i].type === 'file') {
                        await RNFetchBlob.fs.unlink(RNFetchBlob.fs.dirs.CacheDir + '/' + stats[i].filename)
                            .then(() => console.log(stats[i].filename + ' borrado correctamente'))
                            .catch((err) => { console.log(err) });
                    }
                }

                // Se borra de la base de datos del servidor
                let response = await audioRequestService.deleteAllHistory();
                if (response !== null) {
                    // Se limpia el historial y los filtros
                    store.dispatch(cleanHistory());
                    store.dispatch(cleanTags());
                }

            })
            .catch((err) => { console.log(err) });

    };

    const handleDelete = () => {
        Alert.alert(
            'Eliminar todo',
            'Se van a eliminar todas las notas de voz de forma permamente',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress:  () => {
                        deleteAll();
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
