import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity, 
    StyleSheet
} from 'react-native';

import { FilterList } from '_molecules';
import { HeadersAudioList } from '_molecules';

import IconII from "react-native-vector-icons/Ionicons";
import { COLORS } from '_styles';

class historyListModule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pressed: false
        }
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
                
                <HeadersAudioList nav={this.props.nav} />
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


export default historyListModule;