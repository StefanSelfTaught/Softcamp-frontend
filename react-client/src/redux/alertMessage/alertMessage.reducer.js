import AlertMessageActionTypes from './alertMessage.types';

const initialState = {
  showAlert: false,
  alertType: null,
  message: [],
};

const alertMessageReducer = (state = initialState, action) => {
  const { type, message, alertType } = action;

  switch (type) {
    case AlertMessageActionTypes.SHOW_ALERT_MESSAGE:
      return {
        ...state,
        showAlert: true,
        alertType,
        message: [message],
      };
    case AlertMessageActionTypes.ON_CLOSE_ALERT_MESSAGE:
      return {
        ...state,
        showAlert: false,
        alertType: null,
        message: [],
      };
    default:
      return state;
  }
};

export default alertMessageReducer;
