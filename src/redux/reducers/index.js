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
                audiolist: [{
                                key: Math.random(),
                                name: action.audio.name,
                                extension: action.audio.extension,
                                localpath: action.audio.localpath,
                                description: '',
                            }, ...state.audiolist]
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
            // si no tiene una sección con la fecha de hoy lo creamos
            if (state.history.length == 0) {
                return {
                    ...state,
                    history: [
                        {
                            date: moment().format('hh:mm'),
                            data: [action.audio]
                        }, 
                        ...state.history
                    ]
                };
            }
            else
                if (state.history[0].date === moment().format('hh:mm')) {

                    if (state.history.length === 1)
                        return {
                            ...state,
                            history: [
                                {
                                    ...state.history[0],
                                    data: [
                                        action.audio
                                        ,
                                        ...state.history[0].data
                                    ]
                                }
                            ]
                        };
                    else 
                        return {
                            ...state,
                            history: [
                                {
                                    ...state.history[0],
                                    data: [
                                        action.audio
                                        ,
                                        ...state.history[0].data
                                    ]
                                },
                                ...state.history.shift()
                            ]
                        };
                } else {               
                
                    return {
                        ...state,
                        history: [
                            {
                                date: moment().format('hh:mm'),
                                data: [action.audio]
                            },
                            ...state.history
                        ]
                    };
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