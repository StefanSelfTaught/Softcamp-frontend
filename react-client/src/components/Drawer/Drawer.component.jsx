import React from 'react';
import PropTypes from 'prop-types';

import { Drawer, Avatar, Tabs } from 'antd';

import { UserOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import { hideDrawer } from '../../redux/auth/auth.actions.js';

import UserDetails from './DrawerContent/UserDetails.component.jsx';
import ChangePassword from './DrawerContent/ChangePassword.component.jsx';

const { TabPane } = Tabs;

const DrawerPanel = ({ hideDrawer, accountDrawerShow }) => {
	
	const onClose = () => {
		hideDrawer();
	};

	return (
		<Drawer
			title={
				<>
					<Avatar style={{ marginRight: 12 }} icon={<UserOutlined />} />
					Manage your account
				</>
			}
			placement="right"
			closable={true}
			width={'40%'}
			destroyOnClose={true}
			onClose={onClose}
			visible={accountDrawerShow}>
			<Tabs defaultActiveKey="1">
				<TabPane tab="User Details" key="1">
					<UserDetails closeDrawer={onClose} />
				</TabPane>
				<TabPane tab="Change Password" key="2">
					<ChangePassword closeDrawer={onClose} />
				</TabPane>
			</Tabs>
		</Drawer>
	);
};

DrawerPanel.proptTypes = {
	hideDrawer: PropTypes.func.isRequired,
	accountDrawerShow: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	accountDrawerShow: state.auth.accountDrawerShow
});

export default connect(mapStateToProps, { hideDrawer })(DrawerPanel);
