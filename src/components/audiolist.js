import React, { Component } from 'react'
import { 
    StyleSheet, 
    TouchableOpacity,
    FlatList,
    Alert, 
    ActivityIndicator,
    View
} from 'react-native'

import { ListItem, SearchBar } from 'react-native-elements'

import IconII from "react-native-vector-icons/Ionicons";

import RNFS from 'react-native-fs';


list = [];
current_audio = null;

class AudioList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchItems: [],
            searchValue: '',
            isLoading: false,
        };
    }


    getTime(item) {
        m = item.mtime.getMinutes();
        minutes = m < 10 ? "0"+ m : m;
        return item.mtime.getHours()+":"+ minutes;
    }

    componentDidMount() {
        list = [];
        current_audio = null;

        this.setState({
            isLoading: true
        });

        RNFS.readDir(`${RNFS.CachesDirectoryPath}`).then(res => {
            res.forEach(item => {
                console.log( item.path);
                if (item.name.includes(".mp4")) {
                    current_audio = {
                        name: item.name,
                        path: "file://" + item.path,
                        creation_time: this.getTime(item),
                        creation_date: item.mtime
                    };
                    
                    list.push(current_audio);

                    list = list.sort(
                        function (a, b) {
                            if (a.creation_date < b.creation_date) {
                                return 1;
                            } 
                            if (a.creation_date > b.creation_date) {
                                return -1;
                            }
                            return 0;                        
                        }
                    )
                }        
            });

            this.setState({
                searchItems: list,
                isLoading: false
            });

        }).catch(err => {
            alert("Error al cargar las notas de voz");
        });
    }

    deleteFile = (item) => { 

        Alert.alert(
            "Borrando " + item.name,
            "¿Estás seguro de que deseas borrar el audio?",
            [
            {
                text: "Cancelar",
                style: "cancel",
            },
            { text: "Borrar", 
                onPress: () => {
                
                // Si el audio se encuentra en la lista devuelve su índice
                i = list.findIndex(it => it.name  === item.name);
                if (i > -1) {
                    
                    // Se borra en el filesystem
                    RNFS.unlink(`${item.path}`).then(res => {
                        // Si se ha borrado correctamente actualizamos
                        // la lista y el render
                        list.splice(i, 1);
                        this.setState({
                            searchItems: list,
                        });
                    }).catch(err => {
                        alert("Error al borrar el audio");
                    });
                }
                }
            }
            ],
            { cancelable: false }
        );
    
    }

    addAudio = (newAudio) => {
        list.unshift(newAudio);
        this.setState({
            searchItems: list,
        });
    }

    searchFilterFunction = text => {   
        this.setState({
            searchValue: text
        });
        // Busca coincidencias en base al nombre del archivo
        const newData = this.state.searchItems.filter(item => {      
            const itemData = `${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;    
        });
        
        // la lista se actualiza con los items de la búsqueda
        this.setState({searchItems: newData});
    };

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.onStartPlay(item.path)} >
            <ListItem   
                bottomDivider
            >   
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle style={{marginTop: 10}}>{item.creation_time}</ListItem.Subtitle>
            </ListItem.Content>
                <IconII name={"chevron-forward"} size={30} color='rgb(255,70,70)'/>
                <TouchableOpacity onPress={() => this.deleteFile(item)}>
                        <IconII name={"trash-outline"} size={27} color='rgb(255,70,70)'/>
                </TouchableOpacity>
            </ListItem>
        </TouchableOpacity>
    )

    renderSearchBar = () => {    
        return (
            
            /*
            Se trabaja con dos listas, una que mantiene siempre la lista de audios (list) y otra
            que contiene los items que coinciden con la búsqueda (data).
            */

            <SearchBar
                searchIcon={{ size: 24 }}
                containerStyle={{width:"100%", backgroundColor: 'white'}}
                inputContainerStyle={LayersStyles.searchbar}
                placeholder="Buscar..."        
                lightTheme        
                round
                value={this.state.searchValue}
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                onCancel={this.state.searchItems = list}
                showCancel
            />  
        );  
    };

    renderLoadingIndicator = () => {

        if (this.state.isLoading)
            return (
                <View style={{justifyContent: 'center', marginTop: 25 }}>
                    <ActivityIndicator size="large" />
                </View>
            )
        else
            return null;
    }

    render() {
        return (
            <FlatList
                style={LayersStyles.audiolist}
                keyExtractor={this.keyExtractor}
                data={this.state.searchItems}  
                extraData={this.state}
                renderItem={this.renderItem}
                ListHeaderComponent={this.renderSearchBar}
                stickyHeaderIndices={[0]}
                ListFooterComponent = {this.renderLoadingIndicator}
            />
        )
    }
}


const LayersStyles = StyleSheet.create({
    searchbar:{
      alignSelf: 'center', 
      width: '95%',
      height: 40,
      backgroundColor: 'rgba(0,0,0, 0.06)'
    },
    audiolist:{
      width:"100%",
    },
  });

export default AudioList;
