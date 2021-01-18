import { httpRequest, showError, showSuccess } from '../templates/httpTemplate';
import { URL } from '_constants';
import store from '_redux_store';

import { refreshToken } from '_redux_actions';


export async function login(email, password) {

	let configProps = { trusty: true };
	let method = 'POST';
	let url = URL.bd.login;
	let headers = { 'Content-Type': 'application/json' };
	let body = JSON.stringify({ email: email, password: password });

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

export async function signin(name, surname, email, password, specialty, country) {

	let configProps = { trusty: true };
	let method = 'POST';
	let url = URL.bd.register;
	let headers = { 'Content-Type': 'application/json' };
	let body = JSON.stringify({
		name: name,
		surname: surname,
		email: email,
		password: password,
		specialty: specialty,
		country: country
	});

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

export async function logout() {

    const state = store.getState();
	let token = state.userReducer.token;
	
	let configProps = { trusty: true };
	let method = 'DELETE';
	let url = URL.bd.logout;
	let headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token };
	let body = null;

	let response = await httpRequest(configProps, method, url, headers, body);

	if (response == null) {
		showError('Error de conexión', 'Compruebe su conexión de red o inténtelo de nuevo más tarde');
		return null;
	}

	switch (response.status) {
		case 200:
			console.log('Token invalidado');
			return response.body;
		default:
			showError('Error', response.body.error);
			return null;
	}
}

export async function refresh(token) {

	let configProps = { trusty: true };
	let method = 'PUT';
	let url = URL.bd.refresh;
	let headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token };
	let body = null;

	let response = await httpRequest(configProps, method, url, headers, body);

	if (response == null) {
		showError('Error de conexión', 'Compruebe su conexión de red o inténtelo de nuevo más tarde');
		return null;
	}

	switch (response.status) {
		case 200:
			console.log('Token actualizado. Expira en ' + response.body.expires_in + ' minutos')
			return response.body;
		case 401:
			return null;
		default:
			showError('Error de sesión', response.body.error);
			return null;
	}
}

export async function changePassword(old_pass, new_pass) {

    const state = store.getState();
	let token = state.userReducer.token;
	
	let configProps = { trusty: true };
	let method = 'PUT';
	let url = URL.bd.changePassword;
	let headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token };
	let body = JSON.stringify({
		old: old_pass,
		new: new_pass
	});

	let response = await httpRequest(configProps, method, url, headers, body);

	if (response == null) {
		showError('Error de conexión', 'Compruebe su conexión de red o inténtelo de nuevo más tarde');
		return null;
	}

	switch (response.status) {
		case 200:
			showSuccess(response.body.message);
			return response.body.message;
		default:
			showError('Error', response.body.error);
			return null;
	}
}