import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Radio, Button } from 'antd';

import { connect } from 'react-redux';
import { registerStartAsync } from '../../redux/auth/auth.actions.js';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const Register = ({ registerStartAsync, auth }) => {

  const [form] = Form.useForm();

  const onFinish = values => {
    registerStartAsync(values)
  };

  return (
    <Form
      {...formItemLayout}
      style={{ maxWidth: 500, margin: '0 auto' }}
      form={form}
      name="register"
      onFinish={onFinish}
      size="large"
      scrollToFirstError>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!'
          },
          {
            required: true,
            message: 'Please enter your E-mail!'
          }
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="name"
        label='Name'
        rules={[
          {
            required: true,
            message: 'Please enter your name!',
            whitespace: true
          }
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please enter your password!'
          }
        ]}
        hasFeedback>
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                'The two passwords that you entered do not match!'
              );
            }
          })
        ]}>
        <Input.Password />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: 15, marginTop: 15 }}
        rules={[
          {
            required: true,
            message: 'Please choose a user role!'
          }
        ]}
        name="role"
        label="User Role">
        <Radio.Group>
          <Radio value="user">Regular User (Browse, Write reviews, etc)</Radio>
          <Radio value="publisher">Bootcamp Publisher</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" loading={auth.loading} htmlType="submit">
          {auth.loading ? 'Loading' : 'Register'}
        </Button>
      </Form.Item>
    </Form>
  );
};

Register.proptTypes = {
  auth: PropTypes.object.isRequired,
  registerStartAsync: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {registerStartAsync})(Register);
