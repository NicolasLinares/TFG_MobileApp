
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

// PLAYER ACTIONS

export const setPlayerState = (playerState) => {
    return {
        type: 'SET_PLAYER_STATE',
        playerState: playerState,
    }
}
 

// PATIENT CODE ACTIONS

export const setPatientCode = (code) => {
    return {
        type: 'SET_PATIENT_CODE',
        code: code,
    }
}
 
export const openCodeEditor = () => {
    return {
        type: 'OPEN_EDITOR'
    }
}
 
export const closeCodeEditor = () => {
    return {
        type: 'CLOSE_EDITOR'
    }
}
 


export default {authUser};