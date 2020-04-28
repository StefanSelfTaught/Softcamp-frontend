import produce from 'immer';
import AlertMessageActionTypes from 'redux/alertMessage/alertMessage.types';

const initialState = {
  showAlert: false,
  alertType: null,
  message: [],
};

const alertMessageReducer = produce(
  (draftState, action) => {
    const { type, message, alertType } = action;

    switch (type) {
      case AlertMessageActionTypes.SHOW_ALERT_MESSAGE:
        draftState.showAlert = true;
        draftState.alertType = alertType;
        draftState.message = [message];
        return;
      case AlertMessageActionTypes.ON_CLOSE_ALERT_MESSAGE:
        draftState.showAlert = false;
        draftState.alertType = null;
        draftState.message = [];
        return;
      default:
        return draftState;
    }
  },
  {
    ...initialState,
  },
);

export default alertMessageReducer;
