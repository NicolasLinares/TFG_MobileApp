
// USER ACTIONS

export const authUser = (name, surname, email, speciality, country, token) => {
    return {
        type: 'SET_USER_DATA',
        name: name,
        surname: surname,
        email: email,
        speciality: speciality,
        country: country,
        token: token
    }
}

export const logoutUser = () => {
    return {
        type: 'SET_USER_DATA',
        name: null,
        surname: null,
        email: null,
        speciality: null,
        country: null,
        token: null
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