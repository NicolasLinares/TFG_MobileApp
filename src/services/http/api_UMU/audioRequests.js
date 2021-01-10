import { httpRequest, showError } from '../templates/httpTemplate';
import { checkTokenExpired } from './tokenRequest';
import { URL } from '_constants';
import * as FS from '_constants';

import RNFetchBlob from 'rn-fetch-blob';


export async function getHistory(next_url) {

    let token = await checkTokenExpired();

    let configProps = { trusty: true };
    let method = 'GET';
    let url = next_url;
    let headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token };
    let body = null;

    let response = await httpRequest(configProps, method, url, headers, body);

    if (response == null) {
        showError('Error de conexión', 'Compruebe su conexión de red o inténtelo de nuevo más tarde');
        return null;
    }

    switch (response.status) {
        case 200:
            return response.body;
        default:
            showError('Error', response.body.error);
            return null;
    }
}

export async function getTags() {

    let token = await checkTokenExpired();

    let configProps = { trusty: true };
    let method = 'GET';
    let url = URL.bd.getTags;
    let headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token };
    let body = null;

    let response = await httpRequest(configProps, method, url, headers, body);

    if (response == null) {
        showError('Error de conexión', 'Compruebe su conexión de red o inténtelo de nuevo más tarde');
        return null;
    }

    switch (response.status) {
        case 200:
            return response.body;
        default:
            showError('Error', response.body.error);
            return null;
    }
}

export async function filterByTag(tag) {

    let token = await checkTokenExpired();

    let configProps = { trusty: true };
    let method = 'GET';
    let url = URL.bd.filterHistory + tag;
    let headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token };
    let body = null;

    let response = await httpRequest(configProps, method, url, headers, body);

    if (response == null) {
        showError('Error de conexión', 'Compruebe su conexión de red o inténtelo de nuevo más tarde');
        return null;
    }

    switch (response.status) {
        case 200:
            return response.body;
        default:
            showError('Error', response.body.error);
            return null;
    }
}

export async function uploadAudio(audio) {

    let token = await checkTokenExpired();

    let configProps = { trusty: true };
    let method = 'POST';
    let url = URL.bd.uploadAudio;
    let headers = { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + token };

    let absolute_path = FS.DIRECTORY + '/' + audio.localpath;

    let body = [
        {
            name: 'file',
            filename: audio.localpath.replace('.' + audio.extension, ''),
            data: RNFetchBlob.wrap(absolute_path),
            type: 'audio/' + audio.extension
        },
        {
            name: 'data',
            data: JSON.stringify(audio),
        }
    ]

    let response = await httpRequest(configProps, method, url, headers, body);

    if (response == null) {
        showError('Error de conexión', 'Compruebe su conexión de red o inténtelo de nuevo más tarde');
        return null;
    }

    switch (response.status) {
        case 201:
            console.log(JSON.stringify(response.body));
            return response.body;
        default:
            console.log(JSON.stringify(response.body.error));

            showError('Error', response.body.error);
            return null;
    }
}

export async function downloadAudioFile(uid, localpath) {

    let token = await checkTokenExpired();

    let configProps = {
        trusty: true,
        fileCache: true,  // permite que la respuesta se almacene como un fichero
        path: localpath  // el archivo se guarda directamente en ese path
    };

    let method = 'GET';
    let url = URL.bd.downloadAudio + uid;
    let headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token };
    let body = null;

    let response = await httpRequest(configProps, method, url, headers, body);

    if (response == null) {
        showError('Error de conexión', 'Compruebe su conexión de red o inténtelo de nuevo más tarde');
    }

    switch (response.status) {
        case 200:
            console.log('Audio descargado correctamente');
            break;
        default:
            console.log('Se ha producido un error en la descarga');
            showError('Error', response.body.error);
            break;
    }
}

export async function deleteAudioHistory(uid) {

    let token = await checkTokenExpired();

    let configProps = { trusty: true };
    let method = 'DELETE';
    let url = URL.bd.deleteAudio + uid;
    let headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token };
    let body = null;

    let response = await httpRequest(configProps, method, url, headers, body);

    if (response == null) {
        showError('Error de conexión', 'Compruebe su conexión de red o inténtelo de nuevo más tarde');
        return null;
    }

    switch (response.status) {
        case 200:
            return response.body;
        default:
            showError('Error', response.body.error);
            return null;
    }
}

export async function deleteAllHistory() {

    let token = await checkTokenExpired();

    let configProps = { trusty: true };
    let method = 'DELETE';
    let url = URL.bd.deleteAll;
    let headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token };
    let body = null;

    let response = await httpRequest(configProps, method, url, headers, body);

    if (response == null) {
        showError('Error de conexión', 'Compruebe su conexión de red o inténtelo de nuevo más tarde');
        return null;
    }

    switch (response.status) {
        case 200:
            return response.body;
        default:
            showError('Error', response.body.error);
            return null;
    }
}

export async function updateName(uid, name) {

    let token = await checkTokenExpired();

    let configProps = { trusty: true };
    let method = 'PUT';
    let url = URL.bd.updateAudioName + uid;
    let headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token };
    let body = JSON.stringify({ name: name });

    let response = await httpRequest(configProps, method, url, headers, body);

    if (response == null) {
        showError('Error de conexión', 'Compruebe su conexión de red o inténtelo de nuevo más tarde');
        return null;
    }

    switch (response.status) {
        case 201:
            return response.body;
        default:
            showError('Error', response.body.error);
            return null;
    }
}

export async function updateDescription(uid, description) {

    let token = await checkTokenExpired();

    let configProps = { trusty: true };
    let method = 'PUT';
    let url = URL.bd.updateDescription + uid;
    let headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token };
    let body = JSON.stringify({ description: description });

    let response = await httpRequest(configProps, method, url, headers, body);

    if (response == null) {
        showError('Error de conexión', 'Compruebe su conexión de red o inténtelo de nuevo más tarde');
        return null;
    }

    switch (response.status) {
        case 201:
            return response.body;
        default:
            showError('Error', response.body.error);
            return null;
    }
}

export async function searchAudio(name) {

    let token = await checkTokenExpired();

    let configProps = { trusty: true };
    let method = 'GET';
    let url = URL.bd.searchAudio + name;
    let headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token };
    let body = null;

    let response = await httpRequest(configProps, method, url, headers, body);

    if (response == null) {
        showError('Error de conexión', 'Compruebe su conexión de red o inténtelo de nuevo más tarde');
        return null;
    }

    switch (response.status) {
        case 200:
            return response.body;
        default:
            showError('Error', response.body.error);
            return null;
    }
}