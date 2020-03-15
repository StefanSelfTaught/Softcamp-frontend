import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Drawer, Form, Button, Col, Row, Input } from 'antd';

import { updateUserDetailsStartAsync } from '../../../redux/auth/auth.actions.js';

const UserDetails = ({
	closeDrawer,
	userData,
	updateUserDetailsStartAsync,
	loading
}) => {
	const [form] = Form.useForm();

	const onFinishHandle = ({ name, email }) => {
		updateUserDetailsStartAsync(name, email);
	};

	useEffect(() => {
		form.setFieldsValue({
			email: userData.email,
			name: userData.name,
			role: userData.role,
			joined: userData.created
		});
	}, []);

	return (
		<Form onFinish={onFinishHandle} form={form} layout="vertical">
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						name="name"
						label="Name"
						rules={[
							{
								required: true,
								message: 'Please enter your name!',
								whitespace: true
							}
						]}>
						<Input value={'bro'} />
					</Form.Item>
				</Col>
				<Col span={12}>
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
						<Input placeholder="Email" />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						rules={[
							{
								required: true
							}
						]}
						name="role"
						label="Role">
						<Input disabled />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						rules={[
							{
								required: true
							}
						]}
						name="joined"
						label="Joined on">
						<Input disabled />
					</Form.Item>
				</Col>
			</Row>
			<div
				style={{
					textAlign: 'right'
				}}>
				<Button onClick={closeDrawer} style={{ marginRight: 8 }}>
					Cancel
				</Button>
				<Button
					type="primary"
					loading={loading}
					htmlType="submit">
					{loading ? 'Loading' : 'Save Changes'}
				</Button>
			</div>
		</Form>
	);
};

UserDetails.proptTypes = {
	closeDrawer: PropTypes.func.isRequired,
	userData: PropTypes.object.isRequired,
	updateUserDetailsStartAsync: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	userData: state.auth.userData,
	loading: state.auth.loading
});

export default connect(mapStateToProps, { updateUserDetailsStartAsync })(
	UserDetails
);
