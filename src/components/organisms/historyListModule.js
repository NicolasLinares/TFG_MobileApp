import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity, 
    StyleSheet,
    ActivityIndicator
} from 'react-native';

import { FilterList } from '_molecules';
import { HeadersAudioList } from '_molecules';

import IconII from "react-native-vector-icons/Ionicons";
import { COLORS } from '_styles';

import { connect } from 'react-redux';
import { setHistory, cleanHistory } from '_redux_actions';

import { showMessage } from "react-native-flash-message";
import { URL } from '_data';

class historyListModule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            next_page_URL: URL.getHistory,
            loading: true
        }
    }

    async componentDidMount() {

        // Se vacía el historial de audios
        this.props.cleanHistory();
        
        await setTimeout(() => this.handleGetHistory(), 50);
        this.state.loading = false;
    }

    async handleGetHistory() {

        // Para el resto de peticiones ya se almacena la URL
        // con la siguiente página
        list = await this.historyRequest(this.state.next_page_URL);
        //list = list.reverse();
        N = list.length;
        for (let i = 0; i < N; i++) {
            // Se añade cada audio al historial de audios 
            // grabados por el médico
            this.props.setHistory(list[i]);
        }
    }


    async historyRequest(next_page_URL) {

        return await fetch(next_page_URL, 
        {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.props.token
            },
            method : "GET",
        })
        .then((response) => {
            return Promise.all([response.json(), response.status]);
        })
        .then(([body, status]) => {
            if (status == 200) {
                this.setState({
                    next_page_URL: body.next_page_url
                });
                return body.data;
            } else {
                alert(body.error);
                return null;
            }
        })
        .catch((error) => {
            showMessage({
              message: 'Error',
              description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
              type: "danger",
              duration: 3000,
              titleStyle: {textAlign: 'center', fontWeight: 'bold', fontSize: 18},
              textStyle: {textAlign: 'center'},
            });
        });
    }

    _renderFilterButton() {
        return (
            <TouchableOpacity 
                style={styles.button}
                onPress={() => this.setState({pressed: !this.state.pressed})}
            >
                <Text style={styles.text}>Filtrar</Text>
                <IconII style={styles.icon} name={this.state.pressed ? 'chevron-up' : 'chevron-down'}/>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <>  
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Mis notas de voz
                    </Text>
                    {this._renderFilterButton()}
                </View>
 
                {this.state.pressed ? <FilterList /> : null}
                
                {this.state.loading === true
                    ?
                        <View style={{flex:1, justifyContent: 'center'}}>
                            <ActivityIndicator size='small' color='grey'/> 
                        </View>
                    :    
                        <HeadersAudioList 
                            list={this.props.history} 
                            refresh={() => {this.state.next_page_URL != null ? this.handleGetHistory() : {}}}
                            nav={this.props.nav} 
                        />
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
      fontSize: 25,
      marginVertical: 20,
      marginLeft: 40,
      fontWeight: 'bold',
      alignSelf: 'flex-start',
    },

    button: {
        height: 25,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'flex-end',
        marginRight: 30,
    },
    text: {
        fontSize: 14,
        color: COLORS.electric_blue
    },
    icon: {
        fontSize: 16,
        color: COLORS.electric_blue,
    }
});


const mapStateToProps = (state) => {
    return {
        history: state.historyReducer.history,
        token: state.userReducer.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setHistory: (audio) => dispatch(setHistory(audio)),
        cleanHistory: () => dispatch(cleanHistory())

    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(historyListModule);