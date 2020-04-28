import { push } from 'connected-react-router';
import AuthActionTypes from 'redux/auth/auth.type';
import axios from 'utils/axiosInstance';
import { showAlertMessage } from 'redux/alertMessage/alertMessage.actions';

// Get user Action Creators
const getUserLoggedInStart = () => ({
  type: AuthActionTypes.USER_LOGGED_IN_START,
});

const getUserLoggedInSuccess = (userData) => ({
  type: AuthActionTypes.USER_LOGGED_IN_SUCCESS,
  payload: userData,
});

const getUserLoggedInFailure = () => ({
  type: AuthActionTypes.USER_LOGGED_IN_FAILURE,
});

// Get user Async Function
export const getUserLoggedInStartAsync = () => async (dispatch) => {
  getUserLoggedInStart();
  try {
    const response = await axios.get('/auth/me');

    const data = await response.data;

    dispatch(getUserLoggedInSuccess(data));
  } catch (error) {
    dispatch(getUserLoggedInFailure());
  }
};

// Log out Action Creators
const logOutStart = () => ({
  type: AuthActionTypes.LOG_OUT_START,
});

const logOutSuccess = () => ({
  type: AuthActionTypes.LOG_OUT_SUCCESS,
});

const logOutFailure = (error) => ({
  type: AuthActionTypes.LOG_OUT_FAILURE,
  payload: error,
});

// Log out async function
export const logOutStartAsync = () => async (dispatch) => {
  dispatch(logOutStart());

  dispatch(showAlertMessage('Logging out...', 'loading'));

  try {
    await axios.get('/auth/logout');

    dispatch(logOutSuccess());

    dispatch(push('/bootcamps'));

    dispatch(showAlertMessage('Logged out', 'success'));
  } catch (error) {
    const errorResponse = error.response.data || 'Something went wrong';

    dispatch(logOutFailure(errorResponse));

    dispatch(showAlertMessage(errorResponse.error, 'error'));
  }
};

// Register async function
export const registerStartAsync = (userData) => async (dispatch) => {
  dispatch(showAlertMessage('Registering...', 'loading'));

  dispatch({
    type: AuthActionTypes.REGISTER_START,
  });

  try {
    const response = await axios({
      method: 'POST',
      url: '/auth/register',
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
      },
    });

    const data = await response.data;

    dispatch({
      type: AuthActionTypes.REGISTER_SUCCESS,
      payload: data,
    });

    dispatch(push('/bootcamps'));

    dispatch(showAlertMessage(`Logged in as ${data.name}`, 'success'));
  } catch (error) {
    const errorResponse = error.response.data || 'Something went wrong';

    dispatch({
      type: AuthActionTypes.REGISTER_FAILURE,
      payload: errorResponse,
    });

    dispatch(showAlertMessage('Bro', 'error'));
  }
};

// Log in Action Creators
const logInStart = () => ({
  type: AuthActionTypes.LOG_IN_START,
});

const logInSuccess = (userData) => ({
  type: AuthActionTypes.LOG_IN_SUCCESS,
  payload: userData,
});

const logInFailure = (err) => ({
  type: AuthActionTypes.LOG_IN_FAILURE,
  payload: err,
});

// Log in async function
export const logInStartAsync = (userData) => async (dispatch) => {
  dispatch(logInStart());

  dispatch(showAlertMessage('Logging in...', 'loading'));

  try {
    const response = await axios({
      method: 'POST',
      url: '/auth/login',
      data: {
        email: userData.email,
        password: userData.password,
      },
    });

    const data = await response.data;

    dispatch(logInSuccess(data));

    dispatch(push('/bootcamps'));

    dispatch(showAlertMessage(`Logged in as ${data.name}`, 'success'));
  } catch (error) {
    const errorResponse = error.response.data || 'Something went wrong';

    dispatch(logInFailure(errorResponse));

    dispatch(showAlertMessage(errorResponse.error, 'error'));
  }
};
