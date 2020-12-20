import RNFetchBlob from 'rn-fetch-blob';

/*
    Comprueba si el fichero existe en la ruta pasada como parámetro
*/
export async function existsLocally(localpath) {

    return await RNFetchBlob.fs.exists(localpath)
                .then((exist) => {
                    return exist;
                })
                .catch(() => {
                    alert('Error al comprobar si el archivo existe')
                    return null;
                });
}

/*
    Devuelve la información del archivo
*/
export async function getFileInfo(localpath) {
    return await RNFetchBlob.fs.stat(localpath);
}