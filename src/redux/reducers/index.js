import * as types from '_redux_types';
import moment from 'moment';

const initialState = {
    user: {                             // Datos del usuario actual
        name: null,
        surname: null,
        email: null,
        speciality: null,
        country: null,
        token: null
    },

    audiolist: [],                      // Lista con los nuevos audios grabados, se borra al enviar para transcribir

    history: [],                        // Lista con todos los audios grabados
    tags: [],                           // Lista con los códigos de paciente usados 

    playerState: 'stop',                // Estado del reproductor de audio


    patientCode: {                      // Código de paciente usado en la grabación actual, se borra al enviar para transcribir
        tag: '',
        isEditorVisible: false,
    }

}


export function userReducer(state = initialState.user, action) {
    switch (action.type) {

        case types.SET_USER_DATA:
            return {
                ...state,
                name: action.name,
                surname: action.surname,
                email: action.email,
                speciality: action.speciality,
                country: action.country,
                token: action.token
            };
        default:
            return state;
    }
}


export function audioListReducer(state = initialState, action) {

    switch (action.type) {

        case types.ADD_AUDIO:
            return {
                ...state,
                audiolist: [
                    ...state.audiolist,
                    {
                        key: Math.random(),
                        name: action.audio.name,
                        extension: action.audio.extension,
                        localpath: action.audio.localpath,
                        description: '',
                        ctime: action.audio.ctime,
                    }, 

                ]
            };
        case types.DELETE_AUDIO:
            return {
                ...state,
                audiolist: state.audiolist.filter((item) => item.key !== action.key)
            };
        
        case types.ADD_AUDIOTAG:
            return {
                ...state,
                audiolist: state.audiolist.map((item) => ({...item, tag: action.tag}))
            };
        default:
            return state;
    }
}

export function historyReducer(state = initialState, action) {

    switch (action.type) {

        case types.ADD_AUDIO_HISTORY:

            /*

                        LA LISTA ES DE LA SIGUIENTE FORMA

                history: [
                    {
                        date: '28 de octubre de 2020,
                        data: [audio1, audio2 ...]
                    },
                    {
                        date: '26 de octubre de 2020,
                        data: [audio1, audio2, audio3 ...]
                    },
                    ...
                ]
            */

            // Los audios se añaden en la sublista data correspondiente según la fecha
            // ------------------------------------------------------------------------

            // Añadir primer elemento de una nueva fecha:
            if (state.history.length == 0 || state.history[0].date !== moment().format('LL')) {
                return {
                    ...state,
                    history: [
                        {
                            date: moment().format('LL'),
                            data: [action.audio]
                        }, 
                        ...state.history
                    ]
                };
            }
            else {

                // Se añade un nuevo elemento a la sublista para ello
                // se duplica el primer conjunto {date, data} pero  
                // añadiendo el nuevo elemento en data
                newState = {
                    ...state,
                    history: [
                        {
                            ...state.history[0],
                            data: [
                                action.audio,
                                ...state.history[0].data,
                            ]
                        },
                        ...state.history,
                    ]
                };  

                // Se debe borrar el anterior conjunto {date, data},
                // que ahora se encuentra en la posición [1], en el [0]
                // está el nuevo conjunto {date,data} con el valor añadido
                newState.history.splice(1,1);
                

                // Si no lo borramos tendríamos algo como lo siguiente:

                /*

                history: [
                    {
                        date: '28 de octubre de 2020,         
                        data: [nuevo, audio1, audio2 ...]
                    },
                    {
                        date: '28 de octubre de 2020,          <<< Duplicado y desactualizado
                        data: [audio1, audio2 ...]
                    },
                    {
                        date: '26 de octubre de 2020,
                        data: [audio1, audio2, audio3 ...]
                    },
                    ...
                ]
            */

                return newState;
            }
        
        default:
            return state;
    }
}

export function playerReducer(state = initialState, action) {
    switch (action.type) {

        case types.SET_PLAYER_STATE:
            return {
                ...state,
                playerState: action.playerState,
            };
        default:
            return state;
    }
}

export function patientCodeReducer(state = initialState.patientCode, action) {
    switch (action.type) {

        case types.SET_PATIENT_TAG:
            return {
                ...state,
                tag: action.tag,
            };
        case types.OPEN_EDITOR:
            return {
                ...state,
                isEditorVisible: true,
            };
        case types.CLOSE_EDITOR:
            return {
                ...state,
                isEditorVisible: false,
            };
        default:
            return state;
    }
}