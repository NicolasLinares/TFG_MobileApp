"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URL = void 0;
var local = 'http://localhost/API_Medcorder';
var remote = 'https://pln.inf.um.es/TFG_MobileApp_API';
var server = remote;
var URL = {
  register: server + '/public/v1/auth/signin',
  login: server + '/public/v1/auth/login',
  logout: server + '/public/v1/auth/logout',
  changePassword: server + '/public/v1/user/password',
  changeCountry: server + '/public/v1/user/country',
  changeSpeciality: server + '/public/v1/user/speciality',
  getHistory: server + '/public/v1/audios',
  deleteAll: server + '/public/v1/audios',
  filterHistory: server + '/public/v1/audios/filter/',
  searchAudio: server + '/public/v1/audios/search/',
  getTags: server + '/public/v1/tags',
  uploadAudio: server + '/public/v1/audio',
  downloadAudio: server + '/public/v1/audio/',
  deleteAudio: server + '/public/v1/audio/',
  updateDescription: server + '/public/v1/audio/description/',
  updateAudioName: server + '/public/v1/audio/name/'
};
exports.URL = URL;