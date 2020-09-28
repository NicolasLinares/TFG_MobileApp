import * as types from '_redux_types';

const initialState = {
    user: {
        name: null,
        spec_medic: null,
        country: null,
        email: null,
        password: null,
    },

    audiolist: [],

    playerState: 'stop',

}


export function userReducer(state = initialState.user, action) {
    switch (action.type) {

        case types.AUTH_USER:
            return {
                ...state,
                email: action.email,
                password: action.password
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