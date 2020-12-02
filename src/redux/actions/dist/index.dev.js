"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.setCurrentTagApplied = exports.cleanTags = exports.deleteFilter = exports.addFilterTag = exports.updateName = exports.updateDescription = exports.cleanHistory = exports.deleteAudioHistory = exports.addAudioHistory = exports.setHistory = exports.closeTagEditor = exports.openTagEditor = exports.setPatientTag = exports.setPlayerState = exports.updateNameNewAudio = exports.addAudioTag = exports.deleteAudio = exports.addAudio = exports.logoutUser = exports.authUser = void 0;

// USER ACTIONS
var authUser = function authUser(name, surname, email, speciality, country, token) {
  return {
    type: 'SET_USER_DATA',
    name: name,
    surname: surname,
    email: email,
    speciality: speciality,
    country: country,
    token: token
  };
};

exports.authUser = authUser;

var logoutUser = function logoutUser() {
  return {
    type: 'SET_USER_DATA',
    name: null,
    surname: null,
    email: null,
    speciality: null,
    country: null,
    token: null
  };
}; // AUDIO LIST ACTIONS


exports.logoutUser = logoutUser;

var addAudio = function addAudio(audio) {
  return {
    type: 'ADD_AUDIO',
    audio: audio
  };
};

exports.addAudio = addAudio;

var deleteAudio = function deleteAudio(key) {
  return {
    type: 'DELETE_AUDIO',
    key: key
  };
};

exports.deleteAudio = deleteAudio;

var addAudioTag = function addAudioTag(tag) {
  return {
    type: 'SET_AUDIOTAG',
    tag: tag
  };
};

exports.addAudioTag = addAudioTag;

var updateNameNewAudio = function updateNameNewAudio(key, name) {
  return {
    type: 'UPDATE_NAME_NEW_AUDIO',
    key: key,
    name: name
  };
}; // PLAYER ACTIONS


exports.updateNameNewAudio = updateNameNewAudio;

var setPlayerState = function setPlayerState(playerState) {
  return {
    type: 'SET_PLAYER_STATE',
    playerState: playerState
  };
}; // PATIENT CODE ACTIONS


exports.setPlayerState = setPlayerState;

var setPatientTag = function setPatientTag(tag) {
  return {
    type: 'SET_PATIENT_TAG',
    tag: tag
  };
};

exports.setPatientTag = setPatientTag;

var openTagEditor = function openTagEditor() {
  return {
    type: 'OPEN_EDITOR'
  };
};

exports.openTagEditor = openTagEditor;

var closeTagEditor = function closeTagEditor() {
  return {
    type: 'CLOSE_EDITOR'
  };
}; // HISTORY ACTIONS


exports.closeTagEditor = closeTagEditor;

var setHistory = function setHistory(audio) {
  return {
    type: 'SET_HISTORY',
    audio: audio
  };
};

exports.setHistory = setHistory;

var addAudioHistory = function addAudioHistory(audio) {
  return {
    type: 'ADD_AUDIO_HISTORY',
    audio: audio
  };
};

exports.addAudioHistory = addAudioHistory;

var deleteAudioHistory = function deleteAudioHistory(date, uid) {
  return {
    type: 'DELETE_AUDIO_HISTORY',
    date: date,
    uid: uid
  };
};

exports.deleteAudioHistory = deleteAudioHistory;

var cleanHistory = function cleanHistory() {
  return {
    type: 'CLEAN_HISTORY'
  };
};

exports.cleanHistory = cleanHistory;

var updateDescription = function updateDescription(date, uid, description) {
  return {
    type: 'UPDATE_DESCRIPTION_AUDIO',
    date: date,
    uid: uid,
    description: description
  };
};

exports.updateDescription = updateDescription;

var updateName = function updateName(date, uid, name) {
  return {
    type: 'UPDATE_NAME_AUDIO',
    date: date,
    uid: uid,
    name: name
  };
}; // TAGS ACTIONS


exports.updateName = updateName;

var addFilterTag = function addFilterTag(tag) {
  return {
    type: 'ADD_TAG',
    tag: tag
  };
};

exports.addFilterTag = addFilterTag;

var deleteFilter = function deleteFilter(tag) {
  return {
    type: 'DELETE_TAG',
    tag: tag
  };
};

exports.deleteFilter = deleteFilter;

var cleanTags = function cleanTags() {
  return {
    type: 'CLEAN_TAGS'
  };
};

exports.cleanTags = cleanTags;

var setCurrentTagApplied = function setCurrentTagApplied(tag) {
  return {
    type: 'SET_CURRENT_TAG_APPLIED',
    tag: tag
  };
};

exports.setCurrentTagApplied = setCurrentTagApplied;
var _default = {
  authUser: authUser
};
exports["default"] = _default;