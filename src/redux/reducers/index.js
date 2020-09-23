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
}


export function userReducer(state = initialState.user, action) {
    switch (action.type) {

        case types.AUTH_USER:
            console.log('llega');

            return {
                ...state,
                email: action.email,
                password: action.password
            };
        default:
            return state;
    }
}

export function audioListReducer(state = initialState.audiolist, action) {

    switch (action.type) {

        case types.ADD_AUDIO:
            return {
                ...state,
                audiolist: [action.data, ...audiolist]
            };
        case types.DELETE_AUDIO:
            return {
                ...state,
                audiolist: audiolist.filter((item) => item.key !== action.key)
            };
        default:
            return state;
    }
}

 