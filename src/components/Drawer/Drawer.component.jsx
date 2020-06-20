import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Drawer, Avatar, Tabs } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import UserDetails from 'components/Drawer/DrawerContent/UserDetails.component';
import ChangePassword from 'components/Drawer/DrawerContent/ChangePassword.component';

import { hideDrawer } from 'redux/manageUserInfo/manageUserInfo.actions';
import { selectDrawerShow } from 'redux/manageUserInfo/manageUserInfo.selectors';

const { TabPane } = Tabs;

const DrawerPanel = ({ drawerShow, hideDrawer }) => {
  const onClose = () => {
    hideDrawer();
  };

  const drawerTitle = (
    <>
      <Avatar style={{ marginRight: 12 }} icon={<UserOutlined />} />
      Manage your account
    </>
  );

  return (
    <Drawer
      title={drawerTitle}
      placement="right"
      closable
      width="40%"
      destroyOnClose
      onClose={onClose}
      visible={drawerShow}
    >
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
  drawerShow: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  drawerShow: selectDrawerShow(state),
});

export default connect(mapStateToProps, { hideDrawer })(DrawerPanel);
