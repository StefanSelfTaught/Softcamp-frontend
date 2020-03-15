import AuthActionTypes from './auth.type.js';
import axios from '../../utils/axiosInstance.js';
import { push } from 'connected-react-router';
import { showAlertMessage } from '../alertMessage/alertMessage.actions.js';
import { batch } from 'react-redux';

const logInStart = () => ({
	type: AuthActionTypes.LOG_IN_START
});

const logInSuccess = userData => ({
	type: AuthActionTypes.LOG_IN_SUCCESS,
	payload: userData
});

const logInFailure = err => ({
	type: AuthActionTypes.LOG_IN_FAILURE,
	payload: err
});

const logOutStart = () => ({
	type: AuthActionTypes.LOG_OUT_START
});

const logOutSuccess = () => ({
	type: AuthActionTypes.LOG_OUT_SUCCESS
});

const logOutFailure = error => ({
	type: AuthActionTypes.LOG_OUT_FAILURE,
	payload: error
});

const getUserLoggedInStart = () => ({
	type: AuthActionTypes.USER_LOGGED_IN_START
});

const getUserLoggedInSuccess = userData => ({
	type: AuthActionTypes.USER_LOGGED_IN_SUCCESS,
	payload: userData
});

const getUserLoggedInFailure = () => ({
	type: AuthActionTypes.USER_LOGGED_IN_FAILURE
});

export const showDrawer = () => ({
	type: AuthActionTypes.SHOW_DRAWER
});

export const hideDrawer = () => ({
	type: AuthActionTypes.HIDE_DRAWER
});

export const updateUserDetailsStartAsync = (name, email) => {
	return async dispatch => {
		dispatch({
			type: AuthActionTypes.UPDATE_USER_DETAILS_START
		});

		dispatch(showAlertMessage('Saving Changes...', 'loading'));

		try {
			const response = await axios({
				method: 'PUT',
				url: '/auth/updatedetails',
				data: {
					name,
					email
				}
			});

			const data = await response.data;

			dispatch({
				type: AuthActionTypes.UPDATE_USER_DETAILS_SUCCESS,
				payload: data
			});

			dispatch(showAlertMessage('Changes Saved', 'success'));
		} catch (error) {
			const errorResponse = error.response.data || 'Something went wrong';

			dispatch({
				type: AuthActionTypes.UPDATE_USER_DETAILS_FAILURE,
				payload: errorResponse
			});

			dispatch(showAlertMessage(errorResponse.error, 'error'));
		}
	};
};

export const getUserLoggedInStartAsync = () => {
	return async dispatch => {
		getUserLoggedInStart();
		try {
			const response = await axios.get('/auth/me');

			const data = await response.data;

			dispatch(getUserLoggedInSuccess(data));
		} catch (error) {
			dispatch(getUserLoggedInFailure());
		}
	};
};

export const logOutStartAsync = () => {
	return async dispatch => {
		dispatch(logOutStart());

		dispatch(showAlertMessage('Logging out...', 'loading'));

		try {
			await axios.get('/auth/logout');

			batch(() => {
				dispatch(logOutSuccess());

				dispatch(push('/bootcamps'));
			});

			dispatch(showAlertMessage('Logged out', 'success'));
		} catch (error) {
			const errorResponse = error.response.data || 'Something went wrong';

			dispatch(logOutFailure(errorResponse));

			dispatch(showAlertMessage(errorResponse.error, 'error'));
		}
	};
};

export const registerStartAsync = userData => {
	return async dispatch => {
		dispatch(showAlertMessage('Registering...', 'loading'));

		dispatch({
			type: AuthActionTypes.REGISTER_START
		});

		try {
			const response = await axios({
				method: 'POST',
				url: '/auth/register',
				data: {
					name: userData.name,
					email: userData.email,
					password: userData.password,
					role: userData.role
				}
			});

			const data = await response.data;

			batch(() => {
				dispatch({
					type: AuthActionTypes.REGISTER_SUCCESS,
					payload: data
				});

				dispatch(push('/bootcamps'));
			});

			dispatch(showAlertMessage(`Logged in as ${data.name}`, 'success'));
		} catch (error) {
			const errorResponse = error.response.data || 'Something went wrong';

			dispatch({
				type: AuthActionTypes.REGISTER_FAILURE,
				payload: errorResponse
			});

			dispatch(showAlertMessage(errorResponse.error, 'error'));
		}
	};
};

export const logInStartAsync = userData => {
	return async dispatch => {
		dispatch(logInStart());

		dispatch(showAlertMessage('Logging in...', 'loading'));

		try {
			const response = await axios({
				method: 'POST',
				url: '/auth/login',
				data: {
					email: userData.email,
					password: userData.password
				}
			});

			const data = await response.data;

			batch(() => {
				dispatch(logInSuccess(data));

				dispatch(push('/bootcamps'));
			});

			dispatch(showAlertMessage(`Logged in as ${data.name}`, 'success'));
		} catch (error) {
			const errorResponse = error.response.data || 'Something went wrong';

			dispatch(logInFailure(errorResponse));

			dispatch(showAlertMessage(errorResponse.error, 'error'));
		}
	};
};

// const makeServerRequest = ({
// 	requestTypes,
// 	routeTypes,
// 	alertTypes,
// 	callApi,
// 	payload = {}
// }) => async (dispatch, getState) => {

// 	const [requestType, successType, failureType] = requestTypes;

// 	if(routeTypes.length) {
// 		const [route] = routeTypes;
// 	}

// 	if(alertTypes.length) {
// 		const [setAlert] = alertTypes;
// 	}

// 	dispatch({
// 		...payload,
// 		type: requestType
// 	});

// 	try {
// 		const response = await callApi();

// 		dispatch({
// 			...payload,
// 			type: successType
// 		});
// 	} catch (error) {
// 		const errorResponse = error.response.data || 'Something went wrong';

// 		dispatch({
// 			...payload,
// 			type: failureType
// 		});
// 	}
// };
