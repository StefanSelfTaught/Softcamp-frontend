import AlertMessageActionTypes from './alertMessage.types';

export const showAlertMessage = (message, alertType) => ({
  type: AlertMessageActionTypes.SHOW_ALERT_MESSAGE,
  message,
  alertType,
});

export const onCloseAlertMessage = () => ({
  type: AlertMessageActionTypes.ON_CLOSE_ALERT_MESSAGE,
});
