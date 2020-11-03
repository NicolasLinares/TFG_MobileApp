
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

export const addAudioTag = (tag) => {
    return {
        type: 'ADD_AUDIOTAG',
        tag: tag
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

export const setPatientTag = (tag) => {
    return {
        type: 'SET_PATIENT_TAG',
        tag: tag,
    }
}
 
export const openTagEditor = () => {
    return {
        type: 'OPEN_EDITOR'
    }
}
 
export const closeTagEditor = () => {
    return {
        type: 'CLOSE_EDITOR'
    }
}
 

// HISTORY ACTIONS

export const setHistory = (audio) => {
    return {
        type: 'SET_HISTORY',
        audio: audio,
    }
}


export const addAudioHistory = (audio) => {
    return {
        type: 'ADD_AUDIO_HISTORY',
        audio: audio,
    }
}

export const cleanHistory = () => {
    return {
        type: 'CLEAN_HISTORY',
    }
}

export const updateDescription = (date, uid, description) => {
    return {
        type: 'UPDATE_DESCRIPTION_AUDIO',
        date: date,
        uid: uid,
        description: description
    }
}


// TAGS ACTIONS

export const addFilterTag = (tag) => {
    return {
        type: 'ADD_TAG',
        tag: tag,
    }
}

export const cleanTags = () => {
    return {
        type: 'CLEAN_TAGS',
    }
}

export const setCurrentTagApplied = (tag) => {
    return {
        type: 'SET_CURRENT_TAG_APPLIED',
        tag: tag,
    }
}

export default {authUser};