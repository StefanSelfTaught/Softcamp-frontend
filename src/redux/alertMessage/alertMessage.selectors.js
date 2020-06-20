import { createSelector } from 'reselect';

const alertMessage = (state) => state.alertMessage;

export const selectShowAlert = createSelector(
  alertMessage,
  (alertMessage) => alertMessage.showAlert,
);

export const selectMessage = createSelector(
  alertMessage,
  (alertMessage) => alertMessage.message,
);

export const selectAlertType = createSelector(
  alertMessage,
  (alertMessage) => alertMessage.alertType,
);
