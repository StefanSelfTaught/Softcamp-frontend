import React from 'react';

import { Layout, Typography } from 'antd';

import Content from '../../components/Content/Content.component.jsx';
import Login from '../../components/Login/Login.component.jsx';

const { Header } = Layout;
const { Title } = Typography;

const LoginPage = () => {
	return (
		<>
			<Header className="site-layout-background" style={{ padding: '0' }}>
				<Title style={{ margin: '14px 16px', textAlign: 'center' }} level={4}>
					Log in to list your bootcamp or rate, review and favorite bootcamps 
				</Title>
			</Header>
			<Content>
				<Login />
			</Content>
		</>
	);
};

export default LoginPage;
