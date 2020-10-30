
const local = 'http://localhost/API_Medcorder';
const remote =  'https://pln.inf.um.es/TFG_MobileApp_API';

const server = local;

export const URL = {

    register: server + '/public/v1/auth/register',
    login: server + '/public/v1/auth/login',
    logout: server + '/public/v1/auth/logout',

    changePassword: server +'/public/v1/user/password',
    changeCountry: server +'/public/v1/user/country',
    changeSpeciality: server + '/public/v1/user/speciality',

    sendAudio: server +'/public/v1/audio',
};
