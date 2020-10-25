import * as types from '_redux_types';

const initialState = {
    user: {
        name: null,
        surname: null,
        email: null,
        password: null,
        speciality: null,
        country: null,
        token: null
    },

    audiolist: [],

    playerState: 'stop',

    patientCode: {
        code: '',
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
                                path: action.audio.path,
                                creation_time: action.audio.creation_time,
                                creation_date: action.audio.creation_date,

                            }, ...state.audiolist]
            };
        case types.DELETE_AUDIO:
            return {
                ...state,
                audiolist: state.audiolist.filter((item) => item.key !== action.key)
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

export function patientCodeReducer(state = initialState.patientCode, action) {
    switch (action.type) {

        case types.SET_PATIENT_CODE:
            return {
                ...state,
                code: action.code,
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