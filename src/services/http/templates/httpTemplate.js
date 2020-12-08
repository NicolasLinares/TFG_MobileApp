import RNFetchBlob from 'rn-fetch-blob';
import { showMessage } from "react-native-flash-message";
import { COLORS } from '_styles';

export async function httpRequest(configProps, method, url, headers, body) {

	return await RNFetchBlob.config(configProps)
		.fetch(
			method,
			url,
			headers,
			body
		)
		.then((response) => {
			let status = response.info().status;

			// Esta comprobación es para evitar que cuando se desargue el audio,
			// por el método "downloadAudioFile()", aparezca un warning porque el cuerpo
			// del mensaje no es un json sino un blob
			let body = response.info().respType === 'blob' ? null : response.json();

			return { status, body };

		})
		.catch((errorMessage) => {
			console.log(errorMessage);
			return null;
		});
}

export function showError(title, error) {
	showMessage({
		message: title,
		description: error,
		duration: 3000,
		style: { backgroundColor: COLORS.danger },
		titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
		textStyle: { textAlign: 'center' },
	});
}

export function showSuccess(success) {
	showMessage({
		message: success,
		duration: 3000,
		type: 'success',
		titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
		textStyle: { textAlign: 'center' },
	});
}