
import {
    Platform,
    Alert,
    Linking
} from 'react-native';

import {
    request,
    RESULTS,
    requestMultiple,
    PERMISSIONS
} from 'react-native-permissions';



function showMessage(title, perm) {

    let message = '';

    switch (perm) {
        case PERMISSIONS.IOS.CAMERA:
        case PERMISSIONS.ANDROID.CAMERA:
            message = 'El acceso a la cámara es necesario para escanear el código de barras del paciente'
            break;

        case PERMISSIONS.IOS.MICROPHONE:
        case PERMISSIONS.ANDROID.RECORD_AUDIO:
            message = 'El acceso al micrófono es necesario para grabar las notas de voz';
            break;
        default:
            break;
    }

    Alert.alert(
        title,
        message,
        [
            {
                text: 'Cancelar',
            },
            {
                text: 'Habilitar en ajustes',
                onPress: () => {
                    Linking.openSettings();
                },
            },
        ]
    );
}


async function check(permission) {
    return await request(permission).then((result) => {
        switch (result) {
            case RESULTS.UNAVAILABLE:
                console.log('Permiso no disponible: ' + permission);
                return false;
            case RESULTS.DENIED:
                console.log('Permiso denegado: ' + permission);
                showMessage('Permiso denegado', permission);
                return false;
            case RESULTS.GRANTED:
                console.log('Permiso garantizado: ' + permission);
                return true;
            case RESULTS.BLOCKED:
                console.log('Permiso bloqueado: ' + permission);
                showMessage('Permiso bloqueado', permission);
                return false;
            default:
                break;
        }
    });
}

export async function checkMicrophonePermissions() {

    const permission = Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MICROPHONE
        : PERMISSIONS.ANDROID.RECORD_AUDIO;

    return await check(permission);
}

export async function checkCameraPermissions() {

    const permission = Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;

    return await check(permission);
}

export async function checkAllPermissions() {

    const permissions = Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.MICROPHONE, PERMISSIONS.IOS.CAMERA]
        : [PERMISSIONS.ANDROID.RECORD_AUDIO, PERMISSIONS.ANDROID.CAMERA];


    await requestMultiple(permissions).then((statuses) => {
        for (var perm in permissions) {

            let result = statuses[permissions[perm]];

            switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log('Permiso no disponible: ' + permissions[perm]);
                    break;
                case RESULTS.DENIED:
                    console.log('Permiso denegado: ' + permissions[perm]);
                    showMessage('Permiso denegado', permissions[perm]);
                    break;
                case RESULTS.GRANTED:
                    console.log('Permiso garantizado: ' + permissions[perm]);
                    break;
                case RESULTS.BLOCKED:
                    console.log('Permiso bloqueado: ' + permissions[perm]);
                    showMessage('Permiso bloqueado', permissions[perm]);
                    break;
                default:
                    break;
            }
        }
    });
}