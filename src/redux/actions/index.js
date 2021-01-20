
// USER ACTIONS

export const authUser = (name, surname, email, specialty, country, token) => {
    return {
        type: 'SET_USER_DATA',
        name: name,
        surname: surname,
        email: email,
        specialty: specialty,
        country: country,
        token: token
    }
}

export const logoutUser = () => {
    return {
        type: 'LOGOUT',
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


export const updateNameNewAudio = (key, name) => {
    return {
        type: 'UPDATE_NAME_NEW_AUDIO',
        key: key,
        name: name
    }
}

export const cleanAudioList = () => {
    return {
        type: 'CLEAN_AUDIOLIST'
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


export const deleteAudioHistory = (date, uid) => {
    return {
        type: 'DELETE_AUDIO_HISTORY',
        date: date,
        uid: uid,
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

export const updateName = (date, uid, name) => {
    return {
        type: 'UPDATE_NAME_AUDIO',
        date: date,
        uid: uid,
        name: name
    }
}

export const updateTranscription = (date, uid, transcription) => {
    return {
        type: 'UPDATE_TRANSCRIPTION_AUDIO',
        date: date,
        uid: uid,
        transcription: transcription
    }
}

// TAGS ACTIONS

export const addFilterTag = (tag) => {
    return {
        type: 'ADD_TAG',
        tag: tag,
    }
}

export const deleteFilter = (tag) => {
    return {
        type: 'DELETE_TAG',
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