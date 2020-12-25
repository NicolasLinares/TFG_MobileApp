/**
* @fileoverview Contenedor de los links a otras pantallas, usado en el menú desplegable
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/


import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Platform
} from 'react-native';;

import { LinkButton } from '_buttons';

class MenuLinks extends Component {

    handleOnPress(screen) {
        this.props.nav.navigate(screen)
        this.props.nav.closeDrawer();
    }

    render() {
        return (
            <ScrollView overScrollMode={'never'} style={{ flex: 1, marginTop: 50 }}>
                <LinkButton title={'Perfil'} icon={'person-outline'} navigate={() => this.handleOnPress('Profile')}/>
                <LinkButton title={'Ajustes'} icon={'settings-outline'} navigate={() => this.handleOnPress('Settings')}/>
                <LinkButton title={'Ayuda'} icon={'help-circle-outline'} navigate={() => {}}/>
            </ScrollView>
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
});

export default MenuLinks;