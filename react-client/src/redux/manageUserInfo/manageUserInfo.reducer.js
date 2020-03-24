import ManageUserInfoActionsTypes from './manageUserInfo.types';

const initialState = {
  forgotPasswordEmailSent: false,
  forgetPasswordModalShow: false,
  accountDrawerShow: false,
  loading: false,
  error: false,
};

const manageUserInfoReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case ManageUserInfoActionsTypes.SHOW_DRAWER:
      return {
        ...state,
        accountDrawerShow: true,
      };
    case ManageUserInfoActionsTypes.HIDE_DRAWER:
      return {
        ...state,
        accountDrawerShow: false,
      };
    case ManageUserInfoActionsTypes.SHOW_MODAL:
      return {
        ...state,
        forgetPasswordModalShow: true,
      };
    case ManageUserInfoActionsTypes.HIDE_MODAL:
      return {
        ...state,
        forgetPasswordModalShow: false,
      };
    case ManageUserInfoActionsTypes.UPDATE_USER_DETAILS_START:
    case ManageUserInfoActionsTypes.UPDATE_USER_PASSWORD_START:
    case ManageUserInfoActionsTypes.SEND_FORGOT_PASSWORD_EMAIL_START:
    case ManageUserInfoActionsTypes.RESET_PASSWORD_START:
      return {
        ...state,
        loading: true,
      };
    case ManageUserInfoActionsTypes.UPDATE_USER_DETAILS_FAILURE:
    case ManageUserInfoActionsTypes.UPDATE_USER_PASSWORD_FAILURE:
    case ManageUserInfoActionsTypes.SEND_FORGOT_PASSWORD_EMAIL_FAILURE:
    case ManageUserInfoActionsTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ManageUserInfoActionsTypes.UPDATE_USER_PASSWORD_SUCCESS:
    case ManageUserInfoActionsTypes.UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        accountDrawerShow: false,
        loading: false,
        error: false,
      };
    case ManageUserInfoActionsTypes.SEND_FORGOT_PASSWORD_EMAIL_SUCCESS:
      return {
        ...state,
        forgotPasswordEmailSent: true,
        loading: false,
        error: false,
      };
    case ManageUserInfoActionsTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ManageUserInfoActionsTypes.RESET_FORGOT_PASSWORD_MODAL:
      return {
        ...state,
        forgotPasswordEmailSent: false,
      };
    default:
      return state;
  }
};

export default manageUserInfoReducer;
