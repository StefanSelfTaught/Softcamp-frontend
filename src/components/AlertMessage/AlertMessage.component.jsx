import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { message } from 'antd';

import { onCloseAlertMessage } from 'redux/alertMessage/alertMessage.actions';
import {
  selectAlertType,
  selectMessage,
  selectShowAlert,
} from 'redux/alertMessage/alertMessage.selectors';

message.config({
  maxCount: 1,
});

const AlertMessage = ({
  showAlert,
  alertMessage,
  alertType,
  onCloseAlertMessage,
}) => {
  useEffect(() => {
    if (showAlert) {
      switch (alertType) {
        case 'loading':
          message.loading({ content: `${alertMessage}` });
          break;
        case 'success':
          message.success({ content: `${alertMessage}` }).then(() => {
            onCloseAlertMessage();
          });
          break;
        case 'error':
          message.error({ content: `${alertMessage}` }).then(() => {
            onCloseAlertMessage();
          });
          break;
        default:
          return null;
      }
    }
  }, [showAlert, alertMessage, alertType, onCloseAlertMessage]);

  return null;
};

const mapStateToProps = createStructuredSelector({
  showAlert: selectShowAlert,
  alertMessage: selectMessage,
  alertType: selectAlertType,
});

AlertMessage.proptTypes = {
  showAlert: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  onCloseAlertMessage: PropTypes.func.isRequired,
  alertType: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, { onCloseAlertMessage })(
  AlertMessage,
);
