import { httpRequest, showError, showSuccess } from './templates/httpTemplate';
import { checkTokenExpired } from './tokenRequest';
import { URL } from '_constants';

export async function login(email, password) {

	let configProps = { trusty: true };
	let method = 'POST';
	let url = URL.login;
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

export async function signin(name, surname, email, password, speciality, country) {

	let configProps = { trusty: true };
	let method = 'POST';
	let url = URL.register;
	let headers = { 'Content-Type': 'application/json' };
	let body = JSON.stringify({
		name: name,
		surname: surname,
		email: email,
		password: password,
		speciality: speciality,
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

	let token = await checkTokenExpired();

	let configProps = { trusty: true };
	let method = 'DELETE';
	let url = URL.logout;
	let headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token };
	let body = null;

	let response = await httpRequest(configProps, method, url, headers, body);

	if (response == null) {
		showError('Error de conexión', 'Compruebe su conexión de red o inténtelo de nuevo más tarde');
		return null;
	}

	switch (response.status) {
		case 200:
			console.log('Token invalidado')
			return response.body;
		default:
			showError('Error', response.body.error);
			return null;
	}
}

export async function changePassword(old_pass, new_pass) {

	let token = await checkTokenExpired();

	let configProps = { trusty: true };
	let method = 'PUT';
	let url = URL.changePassword;
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