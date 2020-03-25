import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { Modal, Form, Input, Button, Alert } from 'antd';

import {
  hideModal,
  sendForgotPasswordEmailStartAsync,
  resetForgotPasswordModal,
} from '../../redux/manageUserInfo/manageUserInfo.actions';
import {
  selectLoading,
  selectForgotPasswordEmailSent,
  selectModalShow,
} from '../../redux/manageUserInfo/manageUserInfo.selectors';

const ModalComponent = ({
  modalShow,
  loading,
  emailSent,
}) => {
  const [form] = Form.useForm();

  // See docs on form hooks methods ant desin

  const handleCancel = () => {
    if (emailSent) {
      resetForgotPasswordModal();
    }
    hideModal();
  };

  const onCreate = ({ email }) => {
    sendForgotPasswordEmailStartAsync(email);
  };

  const handleSubmitClick = () => {
    form.validateFields().then(values => {
      form.resetFields();
      onCreate(values);
    });
  };

  return (
    <Modal
      title='Reset your password'
      destroyOnClose
      visible={modalShow}
      onCancel={handleCancel}
      footer={
        !emailSent
          ? [
            <Button key='back' onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              loading={loading}
              onClick={handleSubmitClick}
              key='submit'
              type='primary'
            >
              {loading ? 'Loading' : 'Submit'}
            </Button>,
          ]
          : [
            <Button
              type='primary'
              key='back'
              onClick={handleCancel}
            >
              Done
            </Button>,
          ]
      }
    >
      {!emailSent ? (
        <Form
          form={form}
          name='forgotPassword'
          layout='vertical'
          scrollToFirstError
        >
          <Form.Item
            name='email'
            label='E-mail'
            rules={[
              {
                type: 'email',
                message: 'The input is not valid email!',
              },
              {
                required: true,
                message: 'Please enter your email!',
              },
            ]}
          >
            <Input placeholder='Enter your email' />
          </Form.Item>
        </Form>
      ) : (
        <Alert
          message='Email successfully sent!'
          description='An email with a link was sent to the email provided before.'
          type='success'
          showIcon
        />
      )}
    </Modal>
  );
};

ModalComponent.proptTypes = {
  modalShow: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  sendForgotPasswordEmailStartAsync: PropTypes.func.isRequired,
  resetForgotPasswordModal: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  emailSent: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  modalShow: selectModalShow,
  loading: selectLoading,
  emailSent: selectForgotPasswordEmailSent,
});

const mapDispatchToProps = {
  hideModal,
  sendForgotPasswordEmailStartAsync,
  resetForgotPasswordModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalComponent);
