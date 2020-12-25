/**
* @fileoverview Contenedor de la lista de filtros de código de pacientes
*
* @version 1
* @author Nicolás Linares La Barba <nlbarba97@gmail.com>
*/


import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';

import { COLORS } from '_styles';
import { FilterList } from '_lists';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { connect } from 'react-redux';
import { setHistory, cleanHistory, addFilterTag, cleanTags, setCurrentTagApplied } from '_redux_actions';
import IconII from "react-native-vector-icons/Ionicons";

import { httpService } from '_services';


class Filter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pressed_key: '',
            hideButton: true,
            paddingLeft: 0,
        };

        this.ref_filterList = React.createRef();
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
        let list = await httpService.getTags();

        if (list !== null) {
            N = list.length;
            for (let i = 0; i < N; i++) {
                // Se añade cada código de paciente en la lista
                this.props.addFilterTag(list[i].tag);
            }
        }
    }


    async handleTagPressed(tag) {
        // Se establece el código de paciente usado actualmente
        this.props.setCurrentTagApplied(tag);

        // Se muestra el botón para eliminar el filtrado
        this.setState({ hideButton: false, paddingLeft: 50 });

        // Para el resto de peticiones ya se almacena la URL
        // con la siguiente página
        let response = await httpService.filterByTag(tag);

        if (response !== null) {

            // Se vacía el historial de audios grabados 
            // para que no se dupliquen en caso de haber 
            // hecho la consulta antes        
            this.props.cleanHistory();
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

    _renderRemoveFilterButton() {
        if (!this.state.hideButton)
            return (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0)']}
                    style={{ position: 'absolute', top: 10, height: 30, width: 90, alignItems: 'flex-start' }}
                >
                    <TouchableOpacity
                        style={styles.buttonCancelFilter}
                        onPress={() => {
                            this.setState({ hideButton: true, paddingLeft: 0 });
                            // Se limpia el código de paciente usado
                            this.props.setCurrentTagApplied('');
                            this.props.resetHistory();
                            this.ref_filterList.current.removeTagUsed();

                            const options = { enableVibrateFallback: true, ignoreAndroidSystemSettings: false };
                            ReactNativeHapticFeedback.trigger('impactMedium', options);
                        }}
                    >
                        <IconII style={{ fontSize: 22, color: COLORS.electric_blue }} name={'close'} />
                    </TouchableOpacity>
                </LinearGradient>

            );
        else
            return null;
    }

    render() {

        // Se muestra la lista de códigos de pacientes usados sólo cuando hay más
        // de 1 distinto, ya que no tiene sentido mostrarla con un solo código 
        if (this.props.tags.length > 1)
            return (
                <View style={styles.container}>
                    <FilterList
                        ref={this.ref_filterList}
                        paddingLeft={this.state.paddingLeft}
                        data={this.props.tags}
                        onPressTag={tag => this.handleTagPressed(tag)}
                    />

                    {this._renderRemoveFilterButton()}
                </View>
            )
        else
            return null;
    }
}


const styles = StyleSheet.create({
    container: {
        height: 60,
        paddingTop: 10,
        flexDirection: 'row'
    },
    buttonCancelFilter: {
        height: 30,
        width: 30,
        justifyContent: 'center',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        backgroundColor: COLORS.light_grey,
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
