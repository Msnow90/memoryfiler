import axios from 'axios';

import { authError, serverError } from './errors'; // use this to pass in any error messages from this reducer's axio calls

// login, register are thunks, do not actually go into reducer

const LOAD_USER_AND_TOKEN = 'LOAD_USER_AND_TOKEN'; // load both user and token into store

// ****** consider moving error functionality into a separate reducer ***** //
const RECEIVED_ERR = 'RECEIVED_ERR'; // received err from any thunk requests

const LOGOUT = 'LOGOUT'; // remove all user data and token from store -- make sure component handles local storage
const CLEAR_ERRORS = 'CLEAR_ERRORS'; // just removes errors from auth store. Embedded in every Link Object for smooth erasal.

const loadUserAndToken = ({user, token}) => {
	localStorage.setItem('token', token);

	return {
		type: LOAD_USER_AND_TOKEN,
		user,
		token
	}
}

export const receivedErr = (err) => {
	return {
		type: RECEIVED_ERR,
		err: err
	}
}

export const logoutFromReducer = () => {

	localStorage.removeItem('token');
	
	return {
		type: LOGOUT
	}
}

export const clearErrors = ()  => {
	return {
		type: CLEAR_ERRORS
	}
}


export default (auth = {username: "", userid: "", token: "", err: ""}, action) => {

	switch(action.type) {

		case LOAD_USER_AND_TOKEN:
			return Object.assign({}, {userid: action.user._id, username: action.user.username, token: action.token})

		case RECEIVED_ERR:
			return Object.assign({}, auth, {err: action.err.message})

		case LOGOUT:
			return Object.assign({}, {username: "", userid: "", token: ""})

		case CLEAR_ERRORS:
			return Object.assign({}, auth, {err: ""})

		default:
			return auth;
	}
}

// used to verify token at startup
export const verifyToken = (token) => {
	return (dispatch) => {

		return axios.post('/verify', {token})
			.then(result => {
				return handleAuth(result, dispatch);
			})
			.catch(err => {
				dispatch(serverError(err));
			})
	}
}

// login via username, password
export const loginToServer = (username, password) => {
	return (dispatch) => {

		return axios.post('/login', {username, password})
			.then(result => {
				return handleAuth(result, dispatch);
			})
			.catch(err => {
				if (err.resolved)
					throw new Error();

				dispatch(serverError(err));
				throw new Error();
			})
	}
}

// login via username, password
export const registerToServer = (username, password, email) => {
	return (dispatch) => {

		return axios.post('/register', {username, password, email})
			.then(result => {
				return handleAuth(result, dispatch);
			})

			.catch(err => {
				if (err.resolved)
					throw new Error();

				dispatch(serverError(err));
				throw new Error();		
			})
	}
}


function handleAuth(result, dispatch) {
	return new Promise(function(resolve, reject) {
		if (result && result.data && result.data.err) {
			dispatch(authError(result.data.err));

			// this obj and reject is to tell the next catch to not run the serverError dispatch
			var obj = { resolved: true };
			return reject(obj);
		}
		const authObj = result.data;
	
		dispatch(loadUserAndToken(authObj))
	
		resolve(authObj);
	})
}