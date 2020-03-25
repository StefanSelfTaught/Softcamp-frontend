import React from 'react';

import { Layout, Typography } from 'antd';

import Content from '../../components/Content/Content.component';
import ResetPassword from '../../components/ResetPassword/ResetPassword.component';

const { Header } = Layout;
const { Title } = Typography;

const ResetPasswordPage = () => (
  <>
    <Header
      className='site-layout-background'
      style={{ padding: '0' }}
    >
      <Title
        style={{ margin: '14px 16px', textAlign: 'center' }}
        level={4}
      >
        Reset your password
      </Title>
    </Header>
    <Content>
      <ResetPassword />
    </Content>
  </>
);

export default ResetPasswordPage;
