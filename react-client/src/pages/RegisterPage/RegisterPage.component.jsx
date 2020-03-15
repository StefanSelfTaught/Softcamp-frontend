import React from 'react';

import { Layout, Typography } from 'antd';

import Content from '../../components/Content/Content.component.jsx';
import Register from '../../components/Register/Register.component.jsx';

const { Header } = Layout;
const { Title } = Typography;

const RegisterPage = () => {
	return (
		<>
			<Header className="site-layout-background" style={{ padding: '0' }}>
				<Title style={{ margin: '14px 16px', textAlign: 'center' }} level={4}>
					Register to list your bootcamp or rate, review and favorite bootcamps 
				</Title>
			</Header>
			<Content>
				<Register />
			</Content>
		</>
	);
};

export default RegisterPage;
