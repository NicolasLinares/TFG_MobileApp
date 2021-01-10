
const remote = 'https://pln.inf.um.es/TFG_MobileApp_API/public/v1';
const local = 'http://localhost/TFG_MobileApp_API/public/v1';

const server = remote;
export const bd = {

    register: server + '/signin',
    login: server + '/login',
    logout: server + '/logout',
    refresh: server + '/refresh',

    changePassword: server + '/user/password',

    getHistory: server + '/audios',
    deleteAll: server + '/audios',
    filterHistory: server + '/audios/filter/',
    searchAudio: server + '/audios/search/',

    getTags: server + '/tags',

    uploadAudio: server + '/audio',
    downloadAudio: server + '/audio/',
    deleteAudio: server + '/audio/',

    updateDescription: server + '/audio/description/',
    updateAudioName: server + '/audio/name/',

    getTranscript: server + '/transcript/',

};
