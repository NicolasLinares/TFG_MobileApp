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
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 85,
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
    }

});

export default patientInfo;