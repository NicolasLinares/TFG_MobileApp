import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native';

import { COLORS } from '_styles';

import { ButtonHistory } from '_atoms';

class patientInfo extends Component {
    render() {
        return (
            <View style={styles.container}>
            
                <ButtonHistory
                    style={{marginTop: 25}}
                    icon={'list'}
                    text={'Ver historial del paciente'}
                    onPress={() => this.props.nav.navigate('History')}
                />

                <View style={styles.line} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.green,
        height: 120,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,

    },
    id: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 18
    },
    line: {
        borderWidth: 1,
        borderColor: COLORS.light_grey
    }

});

export default patientInfo;