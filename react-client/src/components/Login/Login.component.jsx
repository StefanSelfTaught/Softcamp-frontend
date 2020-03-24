import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './Login.styles.css';

import { logInStartAsync } from '../../redux/auth/auth.actions.js';
import { showModal } from '../../redux/manageUserInfo/manageUserInfo.actions.js';
import { selectLoading } from '../../redux/auth/auth.selectors.js';

const Login = ({ logInStartAsync, loading, showModal }) => {
	const [form] = Form.useForm();
	
	const onFinish = values => {
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
					prefix={<LockOutlined />}
					placeholder="Password"
				/>
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					loading={loading}
					htmlType="submit"
					className="login-form-button">
					{loading ? 'Loading' : 'Log in'}
				</Button>
				<div
					style={{
						display: 'flex',
						marginTop: 10,
						justifyContent: 'space-between'
					}}>
					<Link to="/register">Or register now!</Link>
					<p style={{ color: '#25b864', cursor: 'pointer' }} onClick={() => showModal()}>Forgot password</p>
				</div>
			</Form.Item>
		</Form>
	);
};

Login.proptTypes = {
	loading: PropTypes.bool.isRequired,
	logInStartAsync: PropTypes.func.isRequired,
	showModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	loading: selectLoading(state)
});

export default connect(mapStateToProps, { logInStartAsync, showModal })(Login);
