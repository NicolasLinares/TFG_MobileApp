
// USER ACTIONS

export const authUser = (email, password) => {
    return {
        type: 'AUTH_USER',
        email: email,
        password: password
    }
}
 

// AUDIO LIST ACTIONS

export const addAudio = (audio) => {
    return {
        type: 'ADD_AUDIO',
        audio: audio,
    }
}

export const deleteAudio = (key) => {
    return {
        type: 'DELETE_AUDIO',
        key: key
    }
}

export default {authUser};