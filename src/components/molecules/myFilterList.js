import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';

import { showMessage } from "react-native-flash-message";

import { COLORS, CONSTANTS } from '_styles';

import { connect } from 'react-redux';
import { setHistory, cleanHistory, addFilterTag, cleanTags, setCurrentTagApplied } from '_redux_actions';
import { URL } from '_data';

import { audioRequestService } from '_services';


class filterList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pressed_key: ''
        }
    }

    async componentDidMount() {
        // GET de los códigos de pacientes sin paginar
        await this.handleGetTags();
    }

    async handleGetTags() {

        // Se vacía la lista de códigos de pacientes 
        // para que no se dupliquen en caso de haber 
        // hecho la consulta antes
        this.props.cleanTags();

        // Petición de los códigos de pacientes usados
        let list = await audioRequestService.getTags();

        if (list !== null) {
            N = list.length;
            for (let i = 0; i < N; i++) {
                // Se añade cada código de paciente en la lista
                this.props.addFilterTag(list[i].tag);
            }
        }
    }


    async handleFilter(tag) {

        // Se establece el código de paciente usado actualmente
        this.props.setCurrentTagApplied(tag);

        // Se muestra el botón para eliminar el filtrado
        this.props.showRemoveFilterButton();

        // Se vacía el historial de audios grabados 
        // para que no se dupliquen en caso de haber 
        // hecho la consulta antes        
        this.props.cleanHistory();

        // Para el resto de peticiones ya se almacena la URL
        // con la siguiente página
        let response = await audioRequestService.filterByTag(tag);

        if (response !== null) {

            this.props.setNextURL(response.next_page_url)

            let list = response.data;
            N = list.length;
            for (let i = 0; i < N; i++) {
                // Se añade cada audio al historial de audios 
                // grabados por el médico
                this.props.setHistory(list[i]);
            }
        }
    }


    _renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => this.handleFilter(item.tag)}
            style={[styles.item,
            { backgroundColor: this.props.currentTagApplied === item.tag ? COLORS.green : COLORS.light_green }]}
        >
            <Text style={styles.name}> {item.tag}</Text>
        </TouchableOpacity>
    )


    render() {

        // Se muestra la lista de códigos de pacientes usados sólo cuando hay más
        // de 1 distinto, ya que no tiene sentido mostrarla con un solo código 
        if (this.props.tags.length > 1)
            return (
                <View style={{ height: 60 }}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.audiolist}
                        contentContainerStyle={{ paddingRight: 60 }}
                        keyExtractor={(item) => item.key.toString()}
                        data={this.props.tags}
                        renderItem={this._renderItem}
                    />
                </View>
            )
        else
            return null;
    }
}


const styles = StyleSheet.create({
    audiolist: {
        width: "100%",
        height: 50,
        paddingVertical: 10,
        paddingHorizontal: 30,

    },
    item: {
        backgroundColor: COLORS.light_green,
        height: 30,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.green,
        marginHorizontal: 5,
    },
    name: {
        textAlign: 'center',
        fontSize: 14,
        marginHorizontal: 10,
        marginRight: 15,
    }
});


const mapStateToProps = (state) => {
    return {
        tags: state.tagsReducer.tags,
        currentTagApplied: state.tagsReducer.currentTagApplied,
        token: state.userReducer.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setHistory: (audio) => dispatch(setHistory(audio)),
        cleanHistory: () => dispatch(cleanHistory()),
        addFilterTag: (tag) => dispatch(addFilterTag(tag)),
        cleanTags: () => dispatch(cleanTags()),
        setCurrentTagApplied: (tag) => dispatch(setCurrentTagApplied(tag)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(filterList);


