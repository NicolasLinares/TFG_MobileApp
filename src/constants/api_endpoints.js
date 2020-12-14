
const server = 'https://pln.inf.um.es/TFG_MobileApp_API';

export const URL = {

    register: server + '/public/v1/signin',
    login: server + '/public/v1/login',
    logout: server + '/public/v1/logout',
    refresh: server + '/public/v1/refresh',

    changePassword: server + '/public/v1/user/password',

    getHistory: server + '/public/v1/audios',
    deleteAll: server + '/public/v1/audios',
    filterHistory: server + '/public/v1/audios/filter/',
    searchAudio: server + '/public/v1/audios/search/',

    getTags: server + '/public/v1/tags',

    uploadAudio: server + '/public/v1/audio',
    downloadAudio: server + '/public/v1/audio/',
    deleteAudio: server + '/public/v1/audio/',

    updateDescription: server + '/public/v1/audio/description/',
    updateAudioName: server + '/public/v1/audio/name/',

};