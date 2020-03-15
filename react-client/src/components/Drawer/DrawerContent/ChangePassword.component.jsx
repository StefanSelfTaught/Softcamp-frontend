import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Drawer, Form, Button, Col, Row, Input } from 'antd';

const ChangePassword = ({ closeDrawer }) => {
	const [form] = Form.useForm();

	const onFinishHandle = () => {
		console.log('Finish');
	};

	return (
		<Form onFinish={onFinishHandle} form={form} layout="vertical">
			<Row gutter={16}>
				<Col span={24}>
					<Form.Item
						name="currentPassword"
						label="Current Password"
						rules={[
							{
								required: true,
								message: 'Please enter your current password!'
							}
						]}>
						<Input.Password />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={24}>
					<Form.Item
						name="newPassword"
						label="New Password"
						rules={[
							{
								required: true,
								message: 'Please enter your new password!'
							}
						]}
						hasFeedback>
						<Input.Password />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={24}>
					<Form.Item
						name="confirm"
						label="Confirm new password"
						dependencies={['newPassword']}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'Please confirm your new password!'
							},
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (!value || getFieldValue('newPassword') === value) {
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
				</Col>
			</Row>
			<div
				style={{
					textAlign: 'right'
				}}>
				<Button onClick={closeDrawer} style={{ marginRight: 8 }}>
					Cancel
				</Button>
				<Button htmlType="submit" type="primary">
					Change Password
				</Button>
			</div>
		</Form>
	);
};

ChangePassword.proptTypes = {
	closeDrawer: PropTypes.func.isRequired
};

export default ChangePassword;
