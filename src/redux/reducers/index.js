import * as types from '_redux_types';
import moment from 'moment';

const initialState = {
    user: {                             // Datos del usuario actual
        name: null,
        surname: null,
        email: null,
        specialty: null,
        country: null,
        token: null,                    // Token de autorización para la comunicación con el servidor
        expires_in: null                // Tiempo en mss en el que expira el token
    },

    // Usados en Screen Recorder
    audiolist: [],                      // Lista con los nuevos audios grabados, se borra al enviar para transcribir
    patientCode: '',                    // Código de paciente usado en la grabación actual, se borra al enviar para transcribir
    playerState: 'stop',                // Estado del reproductor de audio, permite que no se reproduzcan dos audios a la vez si está en estado 'play'

    // Usados en Screen Home
    history: [],                        // Lista con todos los audios grabados
    tags: [],                           // Lista con los códigos de paciente usados 
    currentTagApplied: '',              // Filtro usado en el momento actual

}

export function userReducer(state = initialState.user, action) {
    switch (action.type) {
        case types.SET_USER_DATA:
            return {
                ...state,
                name: action.name,
                surname: action.surname,
                email: action.email,
                specialty: action.specialty,
                country: action.country,
                token: action.token,
                expires_in: moment.now() + 1000 * 60 * action.expires_in
            };
        case types.REFRESH_TOKEN:
            return {
                ...state,
                token: action.refresh_token,
                expires_in: moment.now() + 1000 * 60 * action.expires_in
            };
        default:
            return state;
    }
}

export function logoutReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGOUT:
            return {
                ...state,
                user: {
                    name: null,
                    surname: null,
                    email: null,
                    specialty: null,
                    country: null,
                    token: null,
                    expires_in: null
                },

                audiolist: [],
                patientCode: '',
                playerState: 'stop',

                history: [],
                tags: [],
                currentTagApplied: '',
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

        case types.SET_AUDIOTAG:
            return {
                ...state,
                audiolist: state.audiolist.map((item) => ({ ...item, tag: action.tag }))
            };

        case types.UPDATE_NAME_NEW_AUDIO:
            let array = state.audiolist.map(
                (item) => (

                    item.key === action.key
                        ?
                        { ...item, name: action.name }
                        :
                        { ...item }
                )
            );

            return {
                ...state,
                audiolist: [...array]
            };
        case types.CLEAN_AUDIOLIST:
            return {
                ...state,
                audiolist: []
            };
        default:
            return state;
    }
}




function getDate(timestamp) {
    m = moment(timestamp);
    return m.format('LL');
}


export function historyReducer(state = initialState, action) {

    switch (action.type) {

        case types.SET_HISTORY:

            /*

                LA LISTA ES DE LA SIGUIENTE FORMA

                history: [
                    {
                        date: '2020-10-14T23:01:28.947Z',
                        data: [audio1, audio2 ...]
                    },
                    {
                        date: '2020-10-12T23:01:28.947Z',
                        data: [audio1, audio2, audio3 ...]
                    },
                    ...
                ]
            */


            // La lista va a ir creciendo hacia abajo, primero se insertan los
            // audios más recientes y agrupados por días. Cuando hablamos de conjunto
            // se habla de conjunto de audios por día.

            // Se crea un nuevo conjunto si la lista está vacía o si el nuevo audio 
            // tiene una fecha distinta al último conjunto añadido.

            // Para obtener el último conjunto añadido calculamos el número de elementos 
            // que tiene la lista


            let index = state.history.length - 1;

            if (state.history.length === 0) {
                return {
                    ...state,
                    history: [
                        ...state.history,
                        {
                            date: action.audio.created_at, // Formato "2021-01-14T23:01:28.947Z"
                            data: [action.audio]
                        },
                    ]
                };

            } else if (getDate(state.history[index].date) !== getDate(action.audio.created_at)) {

                let date_lastSection = new Date(state.history[index].date);
                let date_newAudio = new Date(action.audio.created_at);

                // Esta comprobación evita errores de duplicados
                // "Warning: Encountered two children with the same key"
                if (date_lastSection <= date_newAudio) {
                    return state;
                } else {
                    return {
                        ...state,
                        history: [
                            ...state.history,
                            {
                                date: action.audio.created_at, // Formato "2021-01-14T23:01:28.947Z"
                                data: [action.audio]
                            },
                        ]
                    };
                }

            } else {

                // Se extrae el último conjunto (que es donde se va a añadir el elemento)
                // y se copian los valores que almacena más el nuevo audio

                let last = state.history.pop();

                // Esta comprobación evita errores de duplicados
                // "Warning: Encountered two children with the same key"
                let items = last.data;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].uid === action.audio.uid) {
                        // Audio ya en la lista devolvemos el estado como estaba
                        return state;
                    }
                }

                return {
                    ...state,
                    history: [
                        ...state.history,
                        {
                            ...last,
                            data: [
                                ...last.data,
                                action.audio,
                            ]
                        },
                    ]
                };

            }

        case types.ADD_AUDIO_HISTORY:

            // Los audios se añaden en el primer conjunto si se ha creado hoy o
            // se añade en un conjunto nuevo si es el primero audio de el día actual
            // ------------------------------------------------------------------------

            // Añadir primer elemento de una nueva fecha:
            if (state.history.length === 0 || getDate(state.history[0].date) !== moment().format('LL')) {
                return {
                    ...state,
                    history: [
                        {
                            date: moment(), // formato: "2021-01-14T23:01:28.947Z"
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
                newState.history.splice(1, 1);

                return newState;

            }

        case types.DELETE_AUDIO_HISTORY:

            // Recorre por secciones hasta encontrar la fecha del audio que quiere borrar
            // devolviendo todos los audios de dicha sección menos el que queremos eliminar
            update_list = state.history.map(
                (section) => (

                    getDate(section.date) === action.date
                        ?
                        {
                            ...section,
                            data: section.data.filter((item) => item.uid !== action.uid)
                        }
                        :
                        { ...section }
                )
            );

            // Ahora hay que comprobar si el audio eliminado ha provocado
            // que quede una sección sin audios, en dicho caso se elimina
            // también la sección

            return {
                ...state,
                history: update_list.filter((section) => (section.data.length > 0))
            };



        case types.CLEAN_HISTORY:
            return {
                ...state,
                history: [],
            };


        case types.UPDATE_DESCRIPTION_AUDIO:

            // Recorre por secciones y cuando encuentra la correspondiente
            // itera hasta encontrar el audio y actualiza su valor

            return {
                ...state,
                history: state.history.map(
                    (section) => (

                        getDate(section.date) === action.date
                            ?
                            {
                                ...section,
                                data: section.data.map(
                                    (item) => (
                                        item.uid === action.uid
                                            ?
                                            { ...item, description: action.description }
                                            :
                                            { ...item }
                                    )
                                )
                            }
                            :
                            { ...section }
                    )
                )
            };

        case types.UPDATE_NAME_AUDIO:

            return {
                ...state,
                history: state.history.map(
                    (section) => (

                        getDate(section.date) === action.date
                            ?
                            {
                                ...section,
                                data: section.data.map(
                                    (item) => (
                                        item.uid === action.uid
                                            ?
                                            { ...item, name: action.name }
                                            :
                                            { ...item }
                                    )
                                )
                            }
                            :
                            { ...section }
                    )
                )
            };

        case types.UPDATE_TRANSCRIPTION_AUDIO:

            return {
                ...state,
                history: state.history.map(
                    (section) => (

                        getDate(section.date) === action.date
                            ?
                            {
                                ...section,
                                data: section.data.map(
                                    (item) => (
                                        item.uid === action.uid
                                            ?
                                            { ...item, transcription: action.transcription, status: 'Completada' }
                                            :
                                            { ...item }
                                    )
                                )
                            }
                            :
                            { ...section }
                    )
                )
            };

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

export function patientCodeReducer(state = initialState, action) {
    switch (action.type) {

        case types.SET_PATIENT_TAG:
            return {
                ...state,
                patientCode: action.tag,
            };

        default:
            return state;
    }
}

export function tagsReducer(state = initialState, action) {
    switch (action.type) {

        case types.ADD_TAG:

            const existsInArray = state.tags.some(l => l.tag === action.tag)

            if (existsInArray) {
                return state;
            }

            return {
                ...state,
                tags: [
                    {
                        key: Math.random(),
                        tag: action.tag,
                    },
                    ...state.tags
                ]
            };

        case types.DELETE_TAG:
            return {
                ...state,
                tags: state.tags.filter((item) => item.tag !== action.tag)
            };

        case types.CLEAN_TAGS:
            return {
                ...state,
                tags: [],
            };

        case types.SET_CURRENT_TAG_APPLIED:
            return {
                ...state,
                currentTagApplied: action.tag,
            };

        default:
            return state;
    }
}

