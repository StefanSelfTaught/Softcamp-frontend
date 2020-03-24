import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Drawer, Avatar, Tabs } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import UserDetails from './DrawerContent/UserDetails.component.jsx';
import ChangePassword from './DrawerContent/ChangePassword.component.jsx';

import { hideDrawer } from '../../redux/manageUserInfo/manageUserInfo.actions.js';
import { selectDrawerShow } from '../../redux/manageUserInfo/manageUserInfo.selectors.js';

const { TabPane } = Tabs;

const DrawerPanel = ({ hideDrawer, drawerShow }) => {
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
			visible={drawerShow}>
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
	drawerShow: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	drawerShow: selectDrawerShow(state)
});

export default connect(mapStateToProps, { hideDrawer })(DrawerPanel);
