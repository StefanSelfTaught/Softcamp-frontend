import { useEffect } from 'react';

import { message } from 'antd';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { onCloseAlertMessage } from '../../redux/alertMessage/alertMessage.actions.js';

const key = 'key';

message.config({
	maxCount: 2
});

const AlertMessage = ({ showAlert, alertMessage, alertType, onCloseAlertMessage }) => {

	useEffect(() => {
		if (showAlert) {
			switch (alertType) {
				case 'loading':
					message.loading({ content: `${alertMessage}`, key });
					break
				case 'success':
					message.success({ content: `${alertMessage}`, key, duration: 3 })
						.then(() => onCloseAlertMessage())
					break
				case 'error':
					message.error({ content: `${alertMessage}`, key, duration: 3 })
						.then(() => onCloseAlertMessage())
					break
				default:
					return null
			}
		}
	});

	return null;
};

const mapStateToProps = state => ({
	showAlert: state.alertMessage.showAlert,
	alertMessage: state.alertMessage.message,
	alertType: state.alertMessage.alertType
});

AlertMessage.proptTypes = {
	showAlert: PropTypes.bool.isRequired,
	alertMessage: PropTypes.string.isRequired
};

export default connect(mapStateToProps, { onCloseAlertMessage })(AlertMessage);
