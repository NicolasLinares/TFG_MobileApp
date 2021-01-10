import { httpRequest, showError } from '../templates/httpTemplate';
import { checkTokenExpired } from './tokenRequest';
import { URL } from '_constants';
import * as FS from '_constants';

import RNFetchBlob from 'rn-fetch-blob';


export async function getTranscript(audio_uid) {

    let token = await checkTokenExpired();

    let configProps = { trusty: true };
    let method = 'GET';
    let url = URL.bd.getTranscript + audio_uid;
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