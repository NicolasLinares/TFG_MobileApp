import RNFetchBlob from 'rn-fetch-blob';
import { URL } from '_data';

import { showMessage } from "react-native-flash-message";

import store from '_redux_store';


export async function getHistory(next_url) {

    const state = store.getState();

    let token = state.userReducer.token;

    return await RNFetchBlob.config({
        trusty: true
    })
        .fetch(
            'GET',
            next_url,
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        )
        .then((response) => {
            let status = response.info().status;

            if (status == 200) {
                return response.json();
            } else {
                let mssg = response.json();
                showMessage({
                    message: 'Error',
                    description: mssg.error,
                    type: "danger",
                    duration: 3000,
                    titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                    textStyle: { textAlign: 'center' },
                });

                return null;
            }
        })
        .catch((errorMessage, statusCode) => {
            console.log(errorMessage);

            showMessage({
                message: 'Error',
                description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
                type: "danger",
                duration: 3000,
                titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                textStyle: { textAlign: 'center' },
            });

            return null;
        });
}

export async function getTags() {

    const state = store.getState();
    let token = state.userReducer.token;

    return await RNFetchBlob.config({
        trusty: true
    })
        .fetch(
            'GET',
            URL.getTags,
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        )
        .then((response) => {
            let status = response.info().status;

            if (status == 200) {
                return response.json();
            } else {
                let mssg = response.json();
                showMessage({
                    message: 'Error',
                    description: mssg.error,
                    type: "danger",
                    duration: 3000,
                    titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                    textStyle: { textAlign: 'center' },
                });

                return null;
            }
        })
        .catch((errorMessage, statusCode) => {
            console.log(errorMessage);

            showMessage({
                message: 'Error',
                description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
                type: "danger",
                duration: 3000,
                titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                textStyle: { textAlign: 'center' },
            });

            return null;
        });
}

export async function filterByTag(tag) {

    const state = store.getState();
    let token = state.userReducer.token;

    return await RNFetchBlob.config({
        trusty: true
    })
        .fetch(
            'GET',
            URL.filterHistory + tag,
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        )
        .then((response) => {
            let status = response.info().status;

            if (status == 200) {
                return response.json();
            } else {
                let mssg = response.json();
                showMessage({
                    message: 'Error',
                    description: mssg.error,
                    type: "danger",
                    duration: 3000,
                    titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                    textStyle: { textAlign: 'center' },
                });

                return null;
            }
        })
        .catch((errorMessage, statusCode) => {
            console.log(errorMessage);

            showMessage({
                message: 'Error',
                description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
                type: "danger",
                duration: 3000,
                titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                textStyle: { textAlign: 'center' },
            });

            return null;
        });
}

export async function uploadAudio(audio) {

    const state = store.getState();
    let token = state.userReducer.token;

    let localpath = RNFetchBlob.fs.dirs.CacheDir + '/' + audio.localpath;

    return await RNFetchBlob.config({
        trusty: true
    })
        .fetch(
            'POST',
            URL.uploadAudio,
            {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,
            },
            [
                {
                    name: 'file',
                    filename: audio.localpath.replace('.' + audio.extension, ''),
                    data: RNFetchBlob.wrap(localpath),
                    type: 'audio/' + audio.extension
                },
                {
                    name: 'data',
                    data: JSON.stringify(audio),
                }
            ]
        )
        .then((response) => {

            let status = response.info().status;

            if (status == 201) {
                return response.json();
            } else {
                let mssg = response.json();
                showMessage({
                    message: 'Error',
                    description: mssg.error,
                    type: "danger",
                    duration: 3000,
                    titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                    textStyle: { textAlign: 'center' },
                });

                return null;
            }
        })
        .catch((errorMessage, statusCode) => {
            console.log(errorMessage);

            showMessage({
                message: 'Error',
                description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
                type: "danger",
                duration: 3000,
                titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                textStyle: { textAlign: 'center' },
            });

            return null;
        });
}

export async function downloadAudioFile(uid, localpath) {

    const state = store.getState();
    let token = state.userReducer.token;

    await RNFetchBlob.config({
        trusty: true,
        fileCache: true,  // permite que la respuesta se almacena como un fichero
        path: localpath  // el archivo se guarda directamente en ese path
    })
        .fetch(
            'GET',
            URL.downloadAudio + uid,
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        )
        .then((response) => {

            let status = response.info().status;

            if (status != 200) {
                let mssg = response.json();
                showMessage({
                    message: 'Error',
                    description: mssg.error,
                    type: "danger",
                    duration: 3000,
                    titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                    textStyle: { textAlign: 'center' },
                });
            }
        })
        .catch((errorMessage, statusCode) => {
            console.log(errorMessage);

            showMessage({
                message: 'Error',
                description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
                type: "danger",
                duration: 3000,
                titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                textStyle: { textAlign: 'center' },
            });
        });
}

export async function deleteAudioHistory(uid) {

    const state = store.getState();
    let token = state.userReducer.token;

    return await RNFetchBlob.config({
        trusty: true
    })
        .fetch(
            'DELETE',
            URL.deleteAudio + uid,
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        )
        .then((response) => {
            let status = response.info().status;
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
                let mssg = response.json();
                showMessage({
                    message: 'Error',
                    description: mssg.error,
                    type: "danger",
                    duration: 3000,
                    titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                    textStyle: { textAlign: 'center' },
                });

                return null;
            }
        })
        .catch((errorMessage, statusCode) => {
            console.log(errorMessage);

            showMessage({
                message: 'Error',
                description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
                type: "danger",
                duration: 3000,
                titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                textStyle: { textAlign: 'center' },
            });

            return null;
        });
}

export async function updateName(uid, name) {

    const state = store.getState();
    let token = state.userReducer.token;


    let body = {
        name: name
    };

    return await RNFetchBlob.config({
        trusty: true
    })
        .fetch(
            'PUT',
            URL.updateAudioName + uid,
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            JSON.stringify(body)
        )
        .then((response) => {
            let status = response.info().status;

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
                let mssg = response.json();
                showMessage({
                    message: 'Error',
                    description: mssg.error,
                    type: "danger",
                    duration: 3000,
                    titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                    textStyle: { textAlign: 'center' },
                });

                return null;
            }
        })
        .catch((errorMessage, statusCode) => {
            console.log(errorMessage);

            showMessage({
                message: 'Error',
                description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
                type: "danger",
                duration: 3000,
                titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                textStyle: { textAlign: 'center' },
            });

            return null;
        });
}

export async function updateDescription(uid, description) {

    const state = store.getState();
    let token = state.userReducer.token;


    let body = {
        description: description
    };

    return await RNFetchBlob.config({
        trusty: true
    })
        .fetch(
            'PUT',
            URL.updateDescription + uid,
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            JSON.stringify(body)
        )
        .then((response) => {
            let status = response.info().status;

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
                let mssg = response.json();
                showMessage({
                    message: 'Error',
                    description: mssg.error,
                    type: "danger",
                    duration: 3000,
                    titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                    textStyle: { textAlign: 'center' },
                });

                return null;
            }
        })
        .catch((errorMessage, statusCode) => {
            console.log(errorMessage);

            showMessage({
                message: 'Error',
                description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
                type: "danger",
                duration: 3000,
                titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                textStyle: { textAlign: 'center' },
            });

            return null;
        });
}

export async function searchAudio(name) {

    const state = store.getState();

    let token = state.userReducer.token;

    return await RNFetchBlob.config({
        trusty: true
    })
        .fetch(
            'GET',
            URL.searchAudio + name,
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        )
        .then((response) => {
            let status = response.info().status;

            if (status == 200) {
                return response.json();
            } else {
                let mssg = response.json();
                showMessage({
                    message: 'Error',
                    description: mssg.error,
                    type: "danger",
                    duration: 3000,
                    titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                    textStyle: { textAlign: 'center' },
                });

                return null;
            }
        })
        .catch((errorMessage, statusCode) => {
            console.log(errorMessage);

            showMessage({
                message: 'Error',
                description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
                type: "danger",
                duration: 3000,
                titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
                textStyle: { textAlign: 'center' },
            });

            return null;
        });
}