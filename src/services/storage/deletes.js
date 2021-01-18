import * as FS from '_constants';

import store from '_redux_store';
import { deleteAudio, cleanTags, cleanHistory } from '_redux_actions';

import { httpService } from '_services';
import { existsLocally } from './stat';

import RNFetchBlob from 'rn-fetch-blob';

/*
    Elimina el fichero si existe
*/
export function deleteFile(localpath) {

    let exists = existsLocally(localpath);

    if (exists) {
        RNFetchBlob.fs.unlink(localpath)
        .then(() => {
            console.log('Audio borrado correctamente del dispositivo')
        })
        .catch((err) => {
            alert('No se ha podido eliminar el audio');
        });
    }
}

/*
    Elimina la lista pasada como parámetro del almacenamiento local del dispositivo,
    así como del estado global (redux)
*/
export async function deleteListFiles(audiolist) {

    for (i in audiolist) {
        await RNFetchBlob.fs.unlink(FS.DIRECTORY + '/' + audiolist[i].localpath)
            .then(() => {
                // Eliminar del estado global
                store.dispatch(deleteAudio(audiolist[i].key));
                console.log(audiolist[i].localpath + ' borrado correctamente del dispositivo')
            })
            .catch((err) => { console.log(err) });
    }
}

/*
    Elimina la lista pasada como parámetro del almacenamiento local del dispositivo,
    así como del estado global (redux)
*/
export async function deleteAllFiles(audiolist) {

    await RNFetchBlob.fs.lstat(FS.DIRECTORY)
        .then(async (stats) => {

            // Se borran los audios que se encuentren localmente
            for (i in stats) {
                if (stats[i].type === 'file') {
                    await RNFetchBlob.fs.unlink(FS.DIRECTORY + '/' + stats[i].filename)
                        .then(() => console.log(stats[i].filename + ' borrado correctamente del dispositivo'))
                        .catch((err) => { console.log(err) });
                }
            }

            // Se borra de la base de datos del servidor
            let response = await httpService.deleteAllHistory();
            if (response !== null) {
                // Se limpia el historial y los filtros
                store.dispatch(cleanHistory());
                store.dispatch(cleanTags());
            }

        })
        .catch((err) => { console.log(err) });
}