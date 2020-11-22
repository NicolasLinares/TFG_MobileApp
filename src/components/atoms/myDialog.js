import React, { Component } from "react";
import { Button, StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";

class myDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }

    showDialog = () => {
        this.setState({
            visible: true
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    handleAccept = () => {

        this.setState({
            visible: false
        });
    };

    render() {
        return (
            <View style={styles.container} >
                <Button title="Show dialog" onPress={this.showDialog} />
                <Dialog.Container visible={this.state.visible} statusBarTranslucent>
                    <Dialog.Title>Nuevo nombre</Dialog.Title>

                    <Dialog.Input value={this.props.name} onChangeText={value => this.props.onChangeText(value)} />

                    <Dialog.Button label="Cancelar" onPress={this.handleCancel} />
                    <Dialog.Button label="Aceptar" onPress={this.handleAccept} />
                </Dialog.Container>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});


export default myDialog;