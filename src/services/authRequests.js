import RNFetchBlob from 'rn-fetch-blob';
import { URL } from '_data';

import { showMessage } from "react-native-flash-message";

import store from '_redux_store';


export async function login(email, password) {

	let body = {
		email: email,
		password: password
	};

	return await RNFetchBlob.config({
		trusty: true
	})
		.fetch(
			'POST',
			URL.login,
			{
				'Content-Type': 'application/json'
			},
			JSON.stringify(body)
		)
		.then((response) => {
			let status = response.info().status;

			if (status == 200) {
				return response.json();
			} else {
				let mssg = response.json();
				showMessage({
					message: 'Error',
					description: mssg.error,
					type: "danger",
					duration: 3000,
					titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
					textStyle: { textAlign: 'center' },
				});

				return null;
			}
		})
		.catch((errorMessage, statusCode) => {
			console.log(errorMessage);

			showMessage({
				message: 'Error',
				description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
				type: "danger",
				duration: 3000,
				titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
				textStyle: { textAlign: 'center' },
			});

			return null;
		});
}

export async function logout() {

	const state = store.getState();
	let token = state.userReducer.token;

	return await RNFetchBlob.config({
		trusty: true
	})
		.fetch(
			'DELETE',
			URL.logout,
			{
				Authorization: 'Bearer ' + token,
			}
		)
		.then((response) => {
			let status = response.info().status;

			if (status == 200) {
				/*
				showMessage({
					message: response.json().message,
					type: "success",
					duration: 3000,
					titleStyle: {textAlign: 'center', fontWeight: 'bold', fontSize: 18},
				});
				*/
				return response.json();
			} else {
				let mssg = response.json();
				showMessage({
					message: 'Error',
					description: mssg.error,
					type: "danger",
					duration: 3000,
					titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
					textStyle: { textAlign: 'center' },
				});

				return null;
			}
		})
		.catch((errorMessage, statusCode) => {
			console.log(errorMessage);

			showMessage({
				message: 'Error',
				description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
				type: "danger",
				duration: 3000,
				titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
				textStyle: { textAlign: 'center' },
			});

			return null;
		});
}

export async function signin(name, surname, email, password, speciality, country) {

	let body = {
		name: name,
		surname: surname,
		email: email,
		password: password,
		speciality: speciality,
		country: country
	};

	return await RNFetchBlob.config({
		trusty: true
	})
		.fetch(
			'POST',
			URL.register,
			{
				'Content-Type': 'application/json'
			},
			JSON.stringify(body)
		)
		.then((response) => {
			let status = response.info().status;

			if (status == 201) {
				/*
				showMessage({
					message: response.json().message,
					type: "success",
					duration: 3000,
					titleStyle: {textAlign: 'center', fontWeight: 'bold', fontSize: 18},
				  });
				*/
				return response.json();
			} else {
				let mssg = response.json();
				showMessage({
					message: 'Error',
					description: mssg.error,
					type: "danger",
					duration: 3000,
					titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
					textStyle: { textAlign: 'center' },
				});

				return null;
			}
		})
		.catch((errorMessage, statusCode) => {
			console.log(errorMessage);

			showMessage({
				message: 'Error',
				description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
				type: "danger",
				duration: 3000,
				titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
				textStyle: { textAlign: 'center' },
			});

			return null;
		});
}

export async function changePassword(old_pass, new_pass) {

	const state = store.getState();
	let token = state.userReducer.token;


	let body = {
		old: old_pass,
		new: new_pass
	};

	return await RNFetchBlob.config({
		trusty: true
	})
		.fetch(
			'PUT',
			URL.changePassword,
			{
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token

			},
			JSON.stringify(body)
		)
		.then((response) => {
			let status = response.info().status;
			if (status == 200) {

				showMessage({
					message: response.json().message,
					type: "success",
					duration: 3000,
					titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
				});

				return status;
			} else {
				let mssg = response.json();
				showMessage({
					message: 'Error',
					description: mssg.error,
					type: "danger",
					duration: 3000,
					titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
					textStyle: { textAlign: 'center' },
				});

				return status; // 400 o 401
			}
		})
		.catch((errorMessage, statusCode) => {
			console.log(errorMessage);

			showMessage({
				message: 'Error',
				description: 'Compruebe su conexión de red o inténtelo de nuevo más tarde',
				type: "danger",
				duration: 3000,
				titleStyle: { textAlign: 'center', fontWeight: 'bold', fontSize: 18 },
				textStyle: { textAlign: 'center' },
			});

			return null;
		});
}