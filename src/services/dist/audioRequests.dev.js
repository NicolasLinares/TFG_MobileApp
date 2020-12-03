"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHistory = getHistory;
exports.getTags = getTags;
exports.filterByTag = filterByTag;
exports.uploadAudio = uploadAudio;
exports.downloadAudioFile = downloadAudioFile;
exports.deleteAudioHistory = deleteAudioHistory;
exports.deleteAllHistory = deleteAllHistory;
exports.updateName = updateName;
exports.updateDescription = updateDescription;
exports.searchAudio = searchAudio;

var _rnFetchBlob = _interopRequireDefault(require("rn-fetch-blob"));

var _data = require("_data");

var _reactNativeFlashMessage = require("react-native-flash-message");

var _redux_store = _interopRequireDefault(require("_redux_store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getHistory(next_url) {
  var state, token;
  return regeneratorRuntime.async(function getHistory$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          state = _redux_store["default"].getState();
          token = state.userReducer.token;
          _context.next = 4;
          return regeneratorRuntime.awrap(_rnFetchBlob["default"].config({
            trusty: true
          }).fetch('GET', next_url, {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }).then(function (response) {
            var status = response.info().status;

            if (status == 200) {
              return response.json();
            } else {
              var mssg = response.json();
              (0, _reactNativeFlashMessage.showMessage)({
                message: 'Error',
                description: mssg.error,
                type: "danger",
                duration: 3000,
                titleStyle: {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 18
                },
                textStyle: {
                  textAlign: 'center'
                }
              });
              return null;
            }
          })["catch"](function (errorMessage, statusCode) {
            console.log(errorMessage);
            (0, _reactNativeFlashMessage.showMessage)({
              message: 'Error',
              description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
              type: "danger",
              duration: 3000,
              titleStyle: {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18
              },
              textStyle: {
                textAlign: 'center'
              }
            });
            return null;
          }));

        case 4:
          return _context.abrupt("return", _context.sent);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}

function getTags() {
  var state, token;
  return regeneratorRuntime.async(function getTags$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          state = _redux_store["default"].getState();
          token = state.userReducer.token;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_rnFetchBlob["default"].config({
            trusty: true
          }).fetch('GET', _data.URL.getTags, {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }).then(function (response) {
            var status = response.info().status;

            if (status == 200) {
              return response.json();
            } else {
              var mssg = response.json();
              (0, _reactNativeFlashMessage.showMessage)({
                message: 'Error',
                description: mssg.error,
                type: "danger",
                duration: 3000,
                titleStyle: {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 18
                },
                textStyle: {
                  textAlign: 'center'
                }
              });
              return null;
            }
          })["catch"](function (errorMessage, statusCode) {
            console.log(errorMessage);
            (0, _reactNativeFlashMessage.showMessage)({
              message: 'Error',
              description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
              type: "danger",
              duration: 3000,
              titleStyle: {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18
              },
              textStyle: {
                textAlign: 'center'
              }
            });
            return null;
          }));

        case 4:
          return _context2.abrupt("return", _context2.sent);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function filterByTag(tag) {
  var state, token;
  return regeneratorRuntime.async(function filterByTag$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          state = _redux_store["default"].getState();
          token = state.userReducer.token;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_rnFetchBlob["default"].config({
            trusty: true
          }).fetch('GET', _data.URL.filterHistory + tag, {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }).then(function (response) {
            var status = response.info().status;

            if (status == 200) {
              return response.json();
            } else {
              var mssg = response.json();
              (0, _reactNativeFlashMessage.showMessage)({
                message: 'Error',
                description: mssg.error,
                type: "danger",
                duration: 3000,
                titleStyle: {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 18
                },
                textStyle: {
                  textAlign: 'center'
                }
              });
              return null;
            }
          })["catch"](function (errorMessage, statusCode) {
            console.log(errorMessage);
            (0, _reactNativeFlashMessage.showMessage)({
              message: 'Error',
              description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
              type: "danger",
              duration: 3000,
              titleStyle: {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18
              },
              textStyle: {
                textAlign: 'center'
              }
            });
            return null;
          }));

        case 4:
          return _context3.abrupt("return", _context3.sent);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function uploadAudio(audio) {
  var state, token, localpath;
  return regeneratorRuntime.async(function uploadAudio$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          state = _redux_store["default"].getState();
          token = state.userReducer.token;
          localpath = _rnFetchBlob["default"].fs.dirs.CacheDir + '/' + audio.localpath;
          _context4.next = 5;
          return regeneratorRuntime.awrap(_rnFetchBlob["default"].config({
            trusty: true
          }).fetch('POST', _data.URL.uploadAudio, {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + token
          }, [{
            name: 'file',
            filename: audio.localpath.replace('.' + audio.extension, ''),
            data: _rnFetchBlob["default"].wrap(localpath),
            type: 'audio/' + audio.extension
          }, {
            name: 'data',
            data: JSON.stringify(audio)
          }]).then(function (response) {
            var status = response.info().status;

            if (status == 201) {
              return response.json();
            } else {
              var mssg = response.json();
              (0, _reactNativeFlashMessage.showMessage)({
                message: 'Error',
                description: mssg.error,
                type: "danger",
                duration: 3000,
                titleStyle: {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 18
                },
                textStyle: {
                  textAlign: 'center'
                }
              });
              return null;
            }
          })["catch"](function (errorMessage, statusCode) {
            console.log(errorMessage);
            (0, _reactNativeFlashMessage.showMessage)({
              message: 'Error',
              description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
              type: "danger",
              duration: 3000,
              titleStyle: {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18
              },
              textStyle: {
                textAlign: 'center'
              }
            });
            return null;
          }));

        case 5:
          return _context4.abrupt("return", _context4.sent);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function downloadAudioFile(uid, localpath) {
  var state, token;
  return regeneratorRuntime.async(function downloadAudioFile$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          state = _redux_store["default"].getState();
          token = state.userReducer.token;
          _context5.next = 4;
          return regeneratorRuntime.awrap(_rnFetchBlob["default"].config({
            trusty: true,
            fileCache: true,
            // permite que la respuesta se almacena como un fichero
            path: localpath // el archivo se guarda directamente en ese path

          }).fetch('GET', _data.URL.downloadAudio + uid, {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }).then(function (response) {
            var status = response.info().status;

            if (status != 200) {
              var mssg = response.json();
              (0, _reactNativeFlashMessage.showMessage)({
                message: 'Error',
                description: mssg.error,
                type: "danger",
                duration: 3000,
                titleStyle: {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 18
                },
                textStyle: {
                  textAlign: 'center'
                }
              });
            }
          })["catch"](function (errorMessage, statusCode) {
            console.log(errorMessage);
            (0, _reactNativeFlashMessage.showMessage)({
              message: 'Error',
              description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
              type: "danger",
              duration: 3000,
              titleStyle: {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18
              },
              textStyle: {
                textAlign: 'center'
              }
            });
          }));

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function deleteAudioHistory(uid) {
  var state, token;
  return regeneratorRuntime.async(function deleteAudioHistory$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          state = _redux_store["default"].getState();
          token = state.userReducer.token;
          _context6.next = 4;
          return regeneratorRuntime.awrap(_rnFetchBlob["default"].config({
            trusty: true
          }).fetch('DELETE', _data.URL.deleteAudio + uid, {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }).then(function (response) {
            var status = response.info().status;

            if (status == 200) {
              /*
              showMessage({
                  message: response.json().message,
                  type: 'success',
                  duration: 2000,
                  titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
              });
              */
              return response.json();
            } else {
              var mssg = response.json();
              (0, _reactNativeFlashMessage.showMessage)({
                message: 'Error',
                description: mssg.error,
                type: "danger",
                duration: 3000,
                titleStyle: {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 18
                },
                textStyle: {
                  textAlign: 'center'
                }
              });
              return null;
            }
          })["catch"](function (errorMessage, statusCode) {
            console.log(errorMessage);
            (0, _reactNativeFlashMessage.showMessage)({
              message: 'Error',
              description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
              type: "danger",
              duration: 3000,
              titleStyle: {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18
              },
              textStyle: {
                textAlign: 'center'
              }
            });
            return null;
          }));

        case 4:
          return _context6.abrupt("return", _context6.sent);

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function deleteAllHistory() {
  var state, token;
  return regeneratorRuntime.async(function deleteAllHistory$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          state = _redux_store["default"].getState();
          token = state.userReducer.token;
          _context7.next = 4;
          return regeneratorRuntime.awrap(_rnFetchBlob["default"].config({
            trusty: true
          }).fetch('DELETE', _data.URL.deleteAll, {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }).then(function (response) {
            var status = response.info().status;

            if (status == 201) {
              /*
              showMessage({
                  message: response.json().message,
                  type: 'success',
                  duration: 2000,
                  titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
              });
              */
              return response.json();
            } else {
              var mssg = response.json();
              (0, _reactNativeFlashMessage.showMessage)({
                message: 'Error',
                description: mssg.error,
                type: "danger",
                duration: 3000,
                titleStyle: {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 18
                },
                textStyle: {
                  textAlign: 'center'
                }
              });
              return null;
            }
          })["catch"](function (errorMessage, statusCode) {
            console.log(errorMessage);
            (0, _reactNativeFlashMessage.showMessage)({
              message: 'Error',
              description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
              type: "danger",
              duration: 3000,
              titleStyle: {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18
              },
              textStyle: {
                textAlign: 'center'
              }
            });
            return null;
          }));

        case 4:
          return _context7.abrupt("return", _context7.sent);

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function updateName(uid, name) {
  var state, token, body;
  return regeneratorRuntime.async(function updateName$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          state = _redux_store["default"].getState();
          token = state.userReducer.token;
          body = {
            name: name
          };
          _context8.next = 5;
          return regeneratorRuntime.awrap(_rnFetchBlob["default"].config({
            trusty: true
          }).fetch('PUT', _data.URL.updateAudioName + uid, {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }, JSON.stringify(body)).then(function (response) {
            var status = response.info().status;

            if (status == 201) {
              /*
                  showMessage({
                      message: response.json().message,
                      type: 'success',
                      duration: 2000,
                      titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                  });
              */
              return response.json();
            } else {
              var mssg = response.json();
              (0, _reactNativeFlashMessage.showMessage)({
                message: 'Error',
                description: mssg.error,
                type: "danger",
                duration: 3000,
                titleStyle: {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 18
                },
                textStyle: {
                  textAlign: 'center'
                }
              });
              return null;
            }
          })["catch"](function (errorMessage, statusCode) {
            console.log(errorMessage);
            (0, _reactNativeFlashMessage.showMessage)({
              message: 'Error',
              description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
              type: "danger",
              duration: 3000,
              titleStyle: {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18
              },
              textStyle: {
                textAlign: 'center'
              }
            });
            return null;
          }));

        case 5:
          return _context8.abrupt("return", _context8.sent);

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function updateDescription(uid, description) {
  var state, token, body;
  return regeneratorRuntime.async(function updateDescription$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          state = _redux_store["default"].getState();
          token = state.userReducer.token;
          body = {
            description: description
          };
          _context9.next = 5;
          return regeneratorRuntime.awrap(_rnFetchBlob["default"].config({
            trusty: true
          }).fetch('PUT', _data.URL.updateDescription + uid, {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }, JSON.stringify(body)).then(function (response) {
            var status = response.info().status;

            if (status == 201) {
              /*
              showMessage({
                  message: response.json().message,
                  type: 'success',
                  duration: 2000,
                  titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
              });
              */
              return response.json();
            } else {
              var mssg = response.json();
              (0, _reactNativeFlashMessage.showMessage)({
                message: 'Error',
                description: mssg.error,
                type: "danger",
                duration: 3000,
                titleStyle: {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 18
                },
                textStyle: {
                  textAlign: 'center'
                }
              });
              return null;
            }
          })["catch"](function (errorMessage, statusCode) {
            console.log(errorMessage);
            (0, _reactNativeFlashMessage.showMessage)({
              message: 'Error',
              description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
              type: "danger",
              duration: 3000,
              titleStyle: {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18
              },
              textStyle: {
                textAlign: 'center'
              }
            });
            return null;
          }));

        case 5:
          return _context9.abrupt("return", _context9.sent);

        case 6:
        case "end":
          return _context9.stop();
      }
    }
  });
}

function searchAudio(name) {
  var state, token;
  return regeneratorRuntime.async(function searchAudio$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          state = _redux_store["default"].getState();
          token = state.userReducer.token;
          _context10.next = 4;
          return regeneratorRuntime.awrap(_rnFetchBlob["default"].config({
            trusty: true
          }).fetch('GET', _data.URL.searchAudio + name, {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }).then(function (response) {
            var status = response.info().status;

            if (status == 200) {
              return response.json();
            } else {
              var mssg = response.json();
              (0, _reactNativeFlashMessage.showMessage)({
                message: 'Error',
                description: mssg.error,
                type: "danger",
                duration: 3000,
                titleStyle: {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 18
                },
                textStyle: {
                  textAlign: 'center'
                }
              });
              return null;
            }
          })["catch"](function (errorMessage, statusCode) {
            console.log(errorMessage);
            (0, _reactNativeFlashMessage.showMessage)({
              message: 'Error',
              description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
              type: "danger",
              duration: 3000,
              titleStyle: {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18
              },
              textStyle: {
                textAlign: 'center'
              }
            });
            return null;
          }));

        case 4:
          return _context10.abrupt("return", _context10.sent);

        case 5:
        case "end":
          return _context10.stop();
      }
    }
  });
}