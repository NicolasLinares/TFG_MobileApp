import React, { Component } from 'react';
import { 
    StyleSheet, 
    TouchableOpacity,
    Text, 
    View,
    Alert
} from 'react-native';

import {HistoryItem} from '_atoms';

import { SwipeListView } from 'react-native-swipe-list-view';
import {COLORS, CONSTANTS} from '_styles';

import IconII from "react-native-vector-icons/Ionicons";

import { showMessage } from "react-native-flash-message";
import { URL } from '_data';
import RNFS from 'react-native-fs';
import moment from 'moment';

import { connect } from 'react-redux';
import { deleteAudioHistory } from '_redux_actions';


class myHeadersList extends Component {

    constructor(props) {
        super(props);
    }


    getDate(timestamp) {
        m = moment(timestamp);
        return m.format('LL');
    }

    deleteRequest = async (item) =>  {

        return await fetch(URL.deleteAudio + item.uid, 
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.props.token
            },
            method : "DELETE",
          })
          .then((response) => {
            return Promise.all([response.json(), response.status]);
          })
          .then(([body, status]) => {
            if (status == 200) {
    
              // Se actualiza el historial
              console.log(item.name);
              date = this.getDate(item.date);
              this.props.delete(date, item.uid);
              // Volvemos a home
              showMessage({
                message: body.message,
                type: "success",
                duration: 2000,
                titleStyle: {textAlign: 'center', fontWeight: 'bold', fontSize: 18},
              });
            } else {
              showMessage({
                message: 'Error',
                description: body.error,
                type: "danger",
                duration: 3000,
                titleStyle: {textAlign: 'center', fontWeight: 'bold', fontSize: 18},
                textStyle: {textAlign: 'center'},
              });
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
    
      handleAudioDelete = (item) => {
        Alert.alert(
          'Eliminar nota de voz',
          'La nota de voz "' + item.name + '" se va a eliminar de forma permanente',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            { text: 'Eliminar', 
              onPress: () => {
                
                // Se borra en el filesystem porque el recorder
                // crea un fichero por cada grabación
                RNFS.unlink(`${item.localpath}`).then(res => {
                    // Se borra de la base de datos del servidor
                    this.deleteRequest(item);
                }).catch(err => {
                    alert("Error al borrar el audio");
                });
              }
            }
          ],
          { cancelable: false }
        );
      }
    


    closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
            //rowMap[rowKey].
        }
    };
    
    deleteRow = (rowMap, item) => {
        this.closeRow(rowMap, item.uid);
        this.handleAudioDelete(item);
    };


    _renderItem = data => {
        return (
            <HistoryItem item={data.item} nav={this.props.nav}/>     
        );
    }

    _renderQuickActions  = (data, rowMap) => {
        return (
            <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => this.deleteRow(rowMap, data.item)}
            >
                <IconII style={{marginRight: 20}} name={"trash"} size={25} color='white'/>
            </TouchableOpacity>
        );
    }

    _renderDate  = ({ section }) =>  {
        return (
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{section.date}</Text>
            </View>
        );
    };


    render() {
        return (

            <SwipeListView
                useSectionList
                sections={this.props.history}
                renderItem={this._renderItem}
                renderHiddenItem={this._renderQuickActions}
                renderSectionHeader={this._renderDate}
                leftOpenValue={0}
                rightOpenValue={-60}
                keyExtractor={(item) => item.uid}
                previewOpenValue={-40}
                previewOpenDelay={3000}
            />

            /*
            <SectionList
                contentContainerStyle={{ paddingBottom: 50}}
                showsVerticalScrollIndicator={false}
                style={styles.audiolist}
                sections={this.props.list}
                inverted={false}
                keyExtractor={(item) => item.uid} 
                renderItem={this._renderItem}
                renderSectionHeader={({ section: { date } }) => (this._renderDate(date))}
                onViewableItemsChanged={this._updateDate}
                onScrollEndDrag={() => this.props.refresh()}
            />
            */
        )
    }
}

const styles = StyleSheet.create({
    audiolist:{
        width:"100%",
        backgroundColor: 'white',
    },
    dateContainer: {
        alignSelf: 'flex-start',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(210,210,210, 0.6)',
        borderRadius: 10,
        marginVertical: 10,
        marginLeft: 40
    },
    dateText: {
        color: 'black',
        marginHorizontal: 10,
        marginVertical: 3
    },

    deleteButton: {
        width: '50%',
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 10,
        marginRight: CONSTANTS.marginHorizontalItemList,
        marginVertical: CONSTANTS.marginVerticalItemList
    },

});


const mapStateToProps = (state) => {
    return {
        history: state.historyReducer.history,
        tags: state.tagsReducer.tags,
        token: state.userReducer.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setHistory: (audio) => dispatch(setHistory(audio)),
        cleanHistory: () => dispatch(cleanHistory()),
        setCurrentTagApplied: (tag) => dispatch(setCurrentTagApplied(tag)),
        delete: (date, uid) => dispatch(deleteAudioHistory(date, uid)),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(myHeadersList);
