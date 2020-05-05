import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Layout, Menu } from 'antd';
import {
  BookOutlined,
  UserOutlined,
  WalletOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import logo from 'assets/logo1.png';
import logo2 from 'assets/logo2.png';
import 'components/SideNav/SideNav.styles.css';

import useLocalStorage from 'hooks/useLocalStorage.hook';
import { logOutStartAsync } from 'redux/auth/auth.actions';
import { showDrawer } from 'redux/manageUserInfo/manageUserInfo.actions';
import {
  selectUserData,
  selectIsAuthenticated,
} from 'redux/auth/auth.selectors';
import selectPathName from 'redux/router/router.selectors';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideNav = ({
  auth,
  route,
  push,
  isAuthenticated,
  logOutStartAsync,
  showDrawer,
}) => {
  const [collapsed, setCollapsed] = useLocalStorage(
    'sideNavCollapse',
    false,
  );

  // Try to use location hook from react-router-dom

  const userRoleNav = (
    <Menu
      defaultOpenKeys={['account']}
      selectedKeys={[route]}
      theme="dark"
      mode="inline"
    >
      <Menu.Item
        onClick={() => {
          push('/bootcamps');
        }}
        key="/bootcamps"
      >
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
            <span>{auth.name}</span>
          </span>
        }
      >
        <Menu.Item
          key="/account/account-settings"
          onClick={() => {
            showDrawer();
          }}
        >
          Account Settings
        </Menu.Item>
      </SubMenu>
      <Menu.Item
        key="/logout"
        onClick={() => {
          logOutStartAsync();
        }}
      >
        <LogoutOutlined />
        <span>Log Out</span>
      </Menu.Item>
    </Menu>
  );

  const publisherRoleNav = (
    <Menu
      defaultOpenKeys={['account']}
      selectedKeys={[route]}
      theme="dark"
      mode="inline"
    >
      <Menu.Item
        onClick={() => {
          push('/bootcamps');
        }}
        key="/bootcamps"
      >
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
            <span>{auth.name}</span>
          </span>
        }
      >
        <Menu.Item
          key="/account/account-settings"
          onClick={() => {
            showDrawer();
          }}
        >
          Account Settings
        </Menu.Item>
        <Menu.Item
          key="/manage-bootcamp"
          onClick={() => {
            push('/manage-bootcamp');
          }}
        >
          Manage Bootcamp
        </Menu.Item>
        <Menu.Item key="/manage-courses">Manage Courses</Menu.Item>
      </SubMenu>
      <Menu.Item
        key="/logout"
        onClick={() => {
          logOutStartAsync();
        }}
      >
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
      }}
    >
      <div className="logo">
        {collapsed ? (
          <img className="logo-img-2" src={logo2} alt="devcamper" />
        ) : (
          <img className="logo-img" src={logo} alt="devcamper" />
        )}
      </div>

      {!isAuthenticated ? (
        <Menu
          defaultOpenKeys={['account']}
          selectedKeys={[route]}
          theme="dark"
          mode="inline"
        >
          <Menu.Item
            onClick={() => {
              push('/bootcamps');
            }}
            key="/bootcamps"
          >
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
            }
          >
            <Menu.Item
              onClick={() => {
                push('/login');
              }}
              key="/login"
            >
              {' '}
              Login
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                push('/register');
              }}
              key="/register"
            >
              Register
            </Menu.Item>
          </SubMenu>
        </Menu>
      ) : auth.role === 'user' ? (
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
  isAuthenticated: PropTypes.bool.isRequired,
  showDrawer: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  auth: selectUserData,
  isAuthenticated: selectIsAuthenticated,
  route: selectPathName,
});

const mapDispatchToProps = {
  logOutStartAsync,
  push,
  showDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
