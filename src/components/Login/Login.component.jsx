import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import 'components/Login/Login.styles.css';

import { logInStartAsync } from 'redux/auth/auth.actions';
import { showModal } from 'redux/manageUserInfo/manageUserInfo.actions';
import { selectLoading } from 'redux/auth/auth.selectors';

const Login = ({ loading, logInStartAsync, showModal, push }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    logInStartAsync(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      size="large"
    >
      <Form.Item
        style={{ marginBottom: 15 }}
        label="E-mail"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please enter your E-mail!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 15 }}
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter your Password!',
          },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          loading={loading}
          htmlType="submit"
          className="login-form-button"
        >
          {loading ? 'Loading' : 'Log in'}
        </Button>
        <div
          style={{
            display: 'flex',
            marginTop: 10,
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="link"
            style={{
              color: '#25b864',
              cursor: 'pointer',
              padding: 0,
            }}
            onClick={() => push('/register')}
          >
            Or register now!
          </Button>
          <Button
            type="link"
            style={{
              color: '#25b864',
              cursor: 'pointer',
              padding: 0,
            }}
            onClick={() => showModal()}
          >
            Forgot password
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

Login.proptTypes = {
  loading: PropTypes.bool.isRequired,
  logInStartAsync: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: selectLoading(state),
});

const mapDispatchToProps = {
  logInStartAsync,
  showModal,
  push,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
