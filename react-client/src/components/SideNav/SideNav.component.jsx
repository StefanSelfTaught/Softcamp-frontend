import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { logOutStartAsync, showDrawer } from '../../redux/auth/auth.actions.js';

import logo from '../../assets/logo1.png';
import logo2 from '../../assets/logo2.png';

import './SideNav.styles.css';

import { Layout, Menu } from 'antd';
import {
	BookOutlined,
	UserOutlined,
	WalletOutlined,
	LogoutOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideNav = ({ auth, logOutStartAsync, push, router, showDrawer }) => {
	const [collapsed, setCollapsed] = useState(false);

	// Try to use location hook from react-router-dom

	const userRoleNav = (
		<Menu
			defaultOpenKeys={['account']}
			selectedKeys={[router]}
			theme={'dark'}
			mode={'inline'}>
			<Menu.Item
				onClick={() => {
					push('/bootcamps');
				}}
				key={'/bootcamps'}>
				<BookOutlined />
				<span>Browse Bootcamps</span>
			</Menu.Item>
			<Menu.Item key="/courses">
				<WalletOutlined />
				<span>Browse Courses</span>
			</Menu.Item>
			<SubMenu
				key="account"
				title={
					<span>
						<UserOutlined />
						<span>{auth.userData.name}</span>
					</span>
				}>
				<Menu.Item
					key="/account/account-settings"
					onClick={() => {
						showDrawer();
					}}>
					Account Settings
				</Menu.Item>
			</SubMenu>
			<Menu.Item
				key="/logout"
				onClick={() => {
					logOutStartAsync();
				}}>
				<LogoutOutlined />
				<span>Log Out</span>
			</Menu.Item>
		</Menu>
	);

	const publisherRoleNav = (
		<Menu
			defaultOpenKeys={['account']}
			selectedKeys={[router]}
			theme={'dark'}
			mode={'inline'}>
			<Menu.Item
				onClick={() => {
					push('/bootcamps');
				}}
				key={'/bootcamps'}>
				<BookOutlined />
				<span>Browse Bootcamps</span>
			</Menu.Item>
			<Menu.Item key="/courses">
				<WalletOutlined />
				<span>Browse Courses</span>
			</Menu.Item>
			<SubMenu
				key="account"
				title={
					<span>
						<UserOutlined />
						<span>{auth.userData.name}</span>
					</span>
				}>
				<Menu.Item
					key="/account/account-settings"
					onClick={() => {
						showDrawer();
					}}>
					Account Settings
				</Menu.Item>
				<Menu.Item key="/manage-bootcamp">Manage Bootcamps</Menu.Item>
				<Menu.Item key="/manage-courses">Manage Courses</Menu.Item>
			</SubMenu>
			<Menu.Item
				key="/logout"
				onClick={() => {
					logOutStartAsync();
				}}>
				<LogoutOutlined />
				<span>Log Out</span>
			</Menu.Item>
		</Menu>
	);

	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={() => {
				setCollapsed(!collapsed);
			}}>
			<div className="logo">
				{collapsed ? (
					<img className="logo-img-2" src={logo2} alt="devcamper" />
				) : (
					<img className="logo-img" src={logo} alt="devcamper" />
				)}
			</div>

			{!auth.isAuthenticated ? (
				<Menu
					defaultOpenKeys={['account']}
					selectedKeys={[router]}
					theme={'dark'}
					mode={'inline'}>
					<Menu.Item
						onClick={() => {
							push('/bootcamps');
						}}
						key={'/bootcamps'}>
						<BookOutlined />
						<span>Browse Bootcamps</span>
					</Menu.Item>
					<Menu.Item key="/courses">
						<WalletOutlined />
						<span>Browse Courses</span>
					</Menu.Item>
					<SubMenu
						key="account"
						title={
							<span>
								<UserOutlined />
								<span>Account</span>
							</span>
						}>
						<Menu.Item
							onClick={() => {
								push('/login');
							}}
							key="/login">
							{' '}
							Login
						</Menu.Item>
						<Menu.Item
							onClick={() => {
								push('/register');
							}}
							key="/register">
							Register
						</Menu.Item>
					</SubMenu>
				</Menu>
			) : auth.userData.role === 'user' ? (
				userRoleNav
			) : (
				publisherRoleNav
			)}
		</Sider>
	);
};

SideNav.proptTypes = {
	auth: PropTypes.object.isRequired,
	logOutStartAsync: PropTypes.func.isRequired,
	push: PropTypes.func.isRequired,
	showDrawer: PropTypes.func.isRequired,
	router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	router: state.router.location.pathname
});

export default connect(mapStateToProps, { logOutStartAsync, push, showDrawer })(
	SideNav
);
