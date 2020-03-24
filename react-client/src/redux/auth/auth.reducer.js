import AuthActionTypes from './auth.type';
import ManageUserInfoActionsTypes from '../manageUserInfo/manageUserInfo.types';

const initialState = {
  userData: [],
  isAuthenticated: false,
  error: false,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case AuthActionTypes.LOG_IN_START:
    case AuthActionTypes.REGISTER_START:
    case AuthActionTypes.USER_LOGGED_IN_START:
    case AuthActionTypes.LOG_OUT_START:
      return {
        ...state,
        userData: [],
        isAuthenticated: false,
        loading: true,
        error: false,
      };
    case AuthActionTypes.LOG_IN_SUCCESS:
    case AuthActionTypes.REGISTER_SUCCESS:
    case AuthActionTypes.USER_LOGGED_IN_SUCCESS:
    case ManageUserInfoActionsTypes.UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userData: payload,
        isAuthenticated: true,
        loading: false,
        error: false,
      };
    case AuthActionTypes.LOG_IN_FAILURE:
    case AuthActionTypes.REGISTER_FAILURE:
    case AuthActionTypes.LOG_OUT_FAILURE:
      return {
        ...state,
        userData: [],
        isAuthenticated: false,
        loading: false,
        error: payload,
      };
    case AuthActionTypes.LOG_OUT_SUCCESS:
      return {
        ...state,
        userData: [],
        isAuthenticated: false,
        loading: false,
        error: false,
      };
    case AuthActionTypes.USER_LOGGED_IN_FAILURE:
      return {
        ...state,
        userData: [],
        isAuthenticated: false,
        loading: false,
        error: false,
      };
    default:
      return state;
  }
};

export default authReducer;
