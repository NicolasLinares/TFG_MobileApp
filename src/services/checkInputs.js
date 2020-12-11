

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
    if (password.length < 8)
        return false;

    // Si tiene espacios en blanco no es válido
    if (withBlankSpaces(password))
        return false;

    // Si no tiene números no es válido
    // Al menos debe contener un dígito
    if (!withNumbers(password))
        return false;

    // Si no tiene caracteres normales no es válido
    // Al menos debe contener un caracter
    if (!withChars(password))
        return false;

    // Si no tiene caracteres especiales no es válido
    // Al menos debe contener un caracter especial
    if (!withSpecialChars(password))
        return false;

    // Resto de comprobaciones ...

    return true;
}