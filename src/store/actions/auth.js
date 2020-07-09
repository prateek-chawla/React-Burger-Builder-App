import * as actionTypes from "./actionTypes";
import axios from "axios";
import { FIREBASE_SIGN_IN_URL, FIREBASE_SIGN_UP_URL } from "../../urls";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (idToken, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: idToken,
		userId: userId,
	};
};

export const authFailed = error => {
	return {
		type: actionTypes.AUTH_FAILED,
		error: error,
	};
};
export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};
export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password, isSignUp) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		let url = FIREBASE_SIGN_IN_URL;
		if (isSignUp) url = FIREBASE_SIGN_UP_URL;
		axios
			.post(url, authData)
			.then(response => {
				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch(err => {
				dispatch(authFailed(err.response.data.error.message));
			});
	};
};
