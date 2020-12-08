import { httpRequest, showError } from './templates/httpTemplate';
import { refreshToken } from '_redux_actions';
import moment from 'moment';
import store from '_redux_store';
import { URL } from '_data';

async function refresh(token) {

	let configProps = { trusty: true };
	let method = 'PUT';
	let url = URL.refresh;
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
			store.dispatch(refreshToken(response.body.access_token, response.body.expires_in));
			return response.body.access_token;
		default:
			showError('Error', response.body.error);
			return null;
	}
}

export async function checkTokenExpired() {
	const state = store.getState();
	let token = state.userReducer.token;
	let expires_in = state.userReducer.expires_in;

	// Se descuenta mm minutos al expires_in para dejar un margen de error
	// Si se ha sobrepasado ese tiempo se renueva el token
	let mm = 10;
	if (moment.now() >= expires_in - 1000*mm/*60*/) {
		return await refresh(token);
	} else {
		return token;
	}
}
