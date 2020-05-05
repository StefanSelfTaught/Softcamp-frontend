import { push } from 'connected-react-router';
import ManageUserInfoActionsTypes from 'redux/manageUserInfo/manageUserInfo.types';
import axios from 'utils/axiosInstance';
import { showAlertMessage } from 'redux/alertMessage/alertMessage.actions';
import { selectUserData } from 'redux/auth/auth.selectors';

// Drawer Action Creators
export const showDrawer = () => ({
  type: ManageUserInfoActionsTypes.SHOW_DRAWER,
});

export const hideDrawer = () => ({
  type: ManageUserInfoActionsTypes.HIDE_DRAWER,
});

// Modal Action Creators
export const showModal = () => ({
  type: ManageUserInfoActionsTypes.SHOW_MODAL,
});

export const hideModal = () => ({
  type: ManageUserInfoActionsTypes.HIDE_MODAL,
});

// Reset Forgot Password Modal Action
export const resetForgotPasswordModal = () => ({
  type: ManageUserInfoActionsTypes.RESET_FORGOT_PASSWORD_MODAL,
});

// updateUserDetailsStartAsync Async Function
export const updateUserDetailsStartAsync = (name, email) => async (
  dispatch,
  getState,
) => {
  const userData = selectUserData(getState());

  if (userData.name === name && userData.email === email) {
    dispatch(hideDrawer());

    return Promise.resolve();
  }

  dispatch({
    type: ManageUserInfoActionsTypes.UPDATE_USER_DETAILS_START,
  });

  dispatch(showAlertMessage('Saving Changes...', 'loading'));

  try {
    const response = await axios({
      method: 'PUT',
      url: '/auth/updatedetails',
      data: {
        name,
        email,
      },
    });

    const data = await response.data;

    dispatch({
      type: ManageUserInfoActionsTypes.UPDATE_USER_DETAILS_SUCCESS,
      payload: data,
    });

    dispatch(showAlertMessage('Changes Saved', 'success'));
  } catch (error) {
    const errorResponse =
      error.response.data || 'Something went wrong';

    dispatch({
      type: ManageUserInfoActionsTypes.UPDATE_USER_DETAILS_FAILURE,
      payload: errorResponse,
    });

    dispatch(showAlertMessage(errorResponse.error, 'error'));
  }
};

// updateUserPasswordStartAsync Async Function
export const updateUserPasswordStartAsync = (
  currentPassword,
  newPassword,
) => async (dispatch) => {
  dispatch({
    type: ManageUserInfoActionsTypes.UPDATE_USER_PASSWORD_START,
  });

  dispatch(showAlertMessage('Changing Password', 'loading'));

  try {
    const response = await axios({
      method: 'PUT',
      url: '/auth/updatepassword',
      data: {
        currentPassword,
        newPassword,
      },
    });

    const data = await response.data;

    dispatch({
      type: ManageUserInfoActionsTypes.UPDATE_USER_PASSWORD_SUCCESS,
      payload: data,
    });

    dispatch(showAlertMessage('Password Changed', 'success'));
  } catch (error) {
    const errorResponse =
      error.response.data || 'Something went wrong';

    dispatch({
      type: ManageUserInfoActionsTypes.UPDATE_USER_PASSWORD_FAILURE,
      payload: errorResponse,
    });

    dispatch(showAlertMessage(errorResponse.error, 'error'));
  }
};

// sendForgotPasswordEmail Async Function
export const sendForgotPasswordEmailStartAsync = (email) => async (
  dispatch,
) => {
  dispatch({
    type: ManageUserInfoActionsTypes.SEND_FORGOT_PASSWORD_EMAIL_START,
  });

  try {
    const response = await axios({
      method: 'POST',
      url: '/auth/forgotpassword',
      data: {
        email,
      },
    });

    const data = await response.data;

    dispatch({
      type:
        ManageUserInfoActionsTypes.SEND_FORGOT_PASSWORD_EMAIL_SUCCESS,
      payload: data,
    });

    dispatch(showAlertMessage(data.data, 'success'));
  } catch (error) {
    const errorResponse =
      error.response.data || 'Something went wrong';

    dispatch({
      type:
        ManageUserInfoActionsTypes.SEND_FORGOT_PASSWORD_EMAIL_FAILURE,
      payload: errorResponse,
    });

    dispatch(showAlertMessage(errorResponse.error, 'error'));
  }
};

// Reset Password Action Creators
const resetPasswordStart = () => ({
  type: ManageUserInfoActionsTypes.RESET_PASSWORD_START,
});

const resetPasswordSuccess = (userData) => ({
  type: ManageUserInfoActionsTypes.RESET_PASSWORD_SUCCESS,
  payload: userData,
});

const resetPasswordFailure = (error) => ({
  type: ManageUserInfoActionsTypes.RESET_PASSWORD_FAILURE,
  payload: error,
});

// resetPasswordStartAsync Async Function
export const resetPasswordStartAsync = (password, token) => async (
  dispatch,
) => {
  dispatch(resetPasswordStart());

  dispatch(showAlertMessage('Loading', 'loading'));

  try {
    const response = await axios({
      method: 'PUT',
      url: `/auth/resetpassword/${token}`,
      data: {
        password,
      },
    });

    const data = await response.data;

    dispatch(resetPasswordSuccess(data));

    dispatch(showAlertMessage('Password Changed!', 'success'));

    dispatch(push('/login'));
  } catch (error) {
    const errorResponse =
      error.response.data || 'Something went wrong';

    dispatch(resetPasswordFailure(error));

    dispatch(showAlertMessage(errorResponse.error, 'error'));
  }
};
