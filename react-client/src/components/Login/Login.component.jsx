import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { logInStartAsync } from '../../redux/auth/auth.actions.js';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './Login.styles.css';

const layout = {
	labelCol: {
		span: 7
	},
	wrapperCol: {
		span: 16,
		offset: 2
	}
};

const tailLayout = {
	wrapperCol: {
		offset: 2,
		span: 8
	}
};

const Login = ({ logInStartAsync, auth }) => {
	const [form] = Form.useForm();

	const onFinish = values => {
		logInStartAsync(values);
	};

	return (
		<Form
			{...layout}
			form={form}
			name="normal_login"
			className="login-form"
			initialValues={{ remember: true }}
			onFinish={onFinish}
			size={'large'}>
			<Form.Item
				style={{ marginBottom: 15 }}
				label="E-mail"
				name="email"
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
				<Input
					prefix={<UserOutlined className="site-form-item-icon" />}
					placeholder="Email"
				/>
			</Form.Item>
			<Form.Item
				style={{ marginBottom: 15 }}
				label="Password"
				name="password"
				rules={[{ required: true, message: 'Please enter your Password!' }]}>
				<Input.Password
					prefix={<LockOutlined className="site-form-item-icon" />}
					placeholder="Password"
				/>
			</Form.Item>
			<Form.Item {...tailLayout}>
				<Button
					type="primary"
					loading={auth.loading}
					htmlType="submit"
					className="login-form-button">
					{auth.loading ? 'Loading' : 'Log in'}
				</Button>
				<p style={{ marginTop: 20 }}>Or register now!</p>
			</Form.Item>
		</Form>
	);
};

Login.proptTypes = {
	auth: PropTypes.object.isRequired,
	logInStartAsync: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logInStartAsync })(Login);
