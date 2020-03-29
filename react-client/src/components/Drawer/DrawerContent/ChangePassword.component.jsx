import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Form, Button, Col, Row, Input } from 'antd';

import { selectLoading } from '../../../redux/manageUserInfo/manageUserInfo.selectors';
import { updateUserPasswordStartAsync } from '../../../redux/manageUserInfo/manageUserInfo.actions';

const ChangePassword = ({ closeDrawer, loading, updateUserPasswordStartAsync }) => {
  const [form] = Form.useForm();

  const onFinishHandle = ({ currentPassword, newPassword }) => {
    updateUserPasswordStartAsync(currentPassword, newPassword);
  };

  return (
    <Form
      onFinish={onFinishHandle}
      form={form}
      layout='vertical'
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name='currentPassword'
            label='Current Password'
            rules={[
              {
                required: true,
                message: 'Please enter your current password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
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
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
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
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>
      <div
        style={{
          textAlign: 'right',
        }}
      >
        <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button
          loading={loading}
          htmlType='submit'
          type='primary'
        >
          {loading ? 'Loading' : 'Change Password'}
        </Button>
      </div>
    </Form>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
});

ChangePassword.proptTypes = {
  closeDrawer: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  updateUserPasswordStartAsync: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  updateUserPasswordStartAsync,
})(ChangePassword);
