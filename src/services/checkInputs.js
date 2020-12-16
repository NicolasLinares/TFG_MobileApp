import {
	Alert
} from 'react-native';

/*
    Devuelve true si tiene espacios en blanco
*/
export function withBlankSpaces(str) {
    var patt = /\s/;
    return patt.test(str);
}

/*
    Devuelve true si tiene numeros
*/
function withNumbers(str) {
    var patt = new RegExp("[0-9]");
    return patt.test(str);
}

/*
    Devuelve true si tiene caracteres
*/
function withChars(str) {
    var patt = new RegExp("[a-zA-Z]");
    return patt.test(str);
}

/*
    Devuelve true si tiene caracteres
*/
function withSpecialChars(str) {
    var patt = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return patt.test(str);
}


export function validatePassword(password) {

    // Si tiene menos de N caracteres no es válido
    if (password.length < 8) {
        Alert.alert('Contraseña no válida', 'La contraseña debe contener al menos 8 caracteres');
        return false;
    }

    // Si tiene espacios en blanco no es válido
    if (withBlankSpaces(password)) {
        Alert.alert('Contraseña no válida', 'La contraseña no puede contener espacios en blanco');
        return false;
    }

    // Si no tiene números no es válido
    // Al menos debe contener un dígito
    if (!withNumbers(password)) {
        Alert.alert('Contraseña no válida', 'La contraseña debe contener letras, números y caracteres especiales');
        return false;
    }

    // Si no tiene caracteres normales no es válido
    // Al menos debe contener un caracter
    if (!withChars(password)) {
        Alert.alert('Contraseña no válida', 'La contraseña debe contener letras, números y caracteres especiales');
        return false;
    }

    // Si no tiene caracteres especiales no es válido
    // Al menos debe contener un caracter especial
    if (!withSpecialChars(password)) {
        Alert.alert('Contraseña no válida', 'La contraseña debe contener letras, números y caracteres especiales');
        return false;
    }

    // Resto de comprobaciones ...

    return true;
}

export function validateEmail(email) {
    var patt = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    if (!patt.test(email)) {
        Alert.alert('Correo no válido', 'Introduce un correo electrónico válido');
        return false;
    } else 
        return true;
}