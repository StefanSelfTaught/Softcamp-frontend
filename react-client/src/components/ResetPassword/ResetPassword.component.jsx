import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Form, Button, Input } from 'antd';

import { resetPasswordStartAsync } from '../../redux/manageUserInfo/manageUserInfo.actions';
import { selectLoading } from '../../redux/manageUserInfo/manageUserInfo.selectors';

const ResetPassword = ({ loading, resetPasswordStartAsync }) => {
  const { token } = useParams();

  const onFinishHandle = ({ newPassword }) => {
    resetPasswordStartAsync(newPassword, token);
  };

  return (
    <Form
      style={{ width: 350, margin: '0 auto' }}
      layour='vertical'
      size='large'
      onFinish={onFinishHandle}
      layout='vertical'
    >
      <Form.Item
        name='newPassword'
        label='New Password'
        rules={[
          {
            required: true,
            message: 'Please enter your new password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder='Enter new password' />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: 17 }}
        name='confirm'
        label='Confirm new password'
        dependencies={['newPassword']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your new password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (
                !value
                || getFieldValue('newPassword') === value
              ) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error('The two passwords that you entered do not match!'),
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder='Confirm new password' />
      </Form.Item>
      <div>
        <Button
          loading={loading}
          htmlType='submit'
          type='primary'
        >
          {loading ? 'Loading' : 'Reset Password'}
        </Button>
      </div>
    </Form>
  );
};

const mapStateToProps = state => ({
  loading: selectLoading(state),
});

ResetPassword.proptTypes = {
  resetPasswordStartAsync: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, {
  resetPasswordStartAsync,
})(ResetPassword);
