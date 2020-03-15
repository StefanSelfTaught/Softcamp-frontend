import AuthActionTypes from './auth.type.js';

const initialState = {
	loading: false,
	userData: [],
	isAuthenticated: false,
	error: false,
	accountDrawerShow: false
};

const authReducer = (state = initialState, action) => {
	const { payload, type } = action;

	switch (type) {
		case AuthActionTypes.SHOW_DRAWER:
			return {
				...state,
				accountDrawerShow: true
			};
		case AuthActionTypes.HIDE_DRAWER:
			return {
				...state,
				accountDrawerShow: false
			};
		case AuthActionTypes.UPDATE_USER_DETAILS_START:
			return {
				...state,
				loading: true
			};
		case AuthActionTypes.UPDATE_USER_DETAILS_FAILURE:
			return {
				...state,
				error: payload,
				loading: false
			};
		case AuthActionTypes.LOG_IN_START:
		case AuthActionTypes.REGISTER_START:
			return {
				...state,
				loading: true,
				userData: [],
				isAuthenticated: false,
				error: false
			};
		case AuthActionTypes.LOG_IN_SUCCESS:
		case AuthActionTypes.REGISTER_SUCCESS:
		case AuthActionTypes.USER_LOGGED_IN_SUCCESS:
		case AuthActionTypes.UPDATE_USER_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				userData: payload,
				isAuthenticated: true,
				error: false
			};
		case AuthActionTypes.LOG_IN_FAILURE:
		case AuthActionTypes.REGISTER_FAILURE:
		case AuthActionTypes.LOG_OUT_FAILURE:
			return {
				...state,
				loading: false,
				userData: [],
				isAuthenticated: false,
				error: payload
			};
		case AuthActionTypes.LOG_OUT_START:
		case AuthActionTypes.LOG_OUT_SUCCESS:
			return {
				...state,
				userData: [],
				isAuthenticated: false,
				error: false
			};
		case AuthActionTypes.USER_LOGGED_IN_FAILURE:
			return {
				...state,
				userData: [],
				isAuthenticated: false,
				error: false,
				loading: false
			};
		default:
			return state;
	}
};

export default authReducer;
