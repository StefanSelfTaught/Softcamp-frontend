import React from 'react';

import { Layout, Typography } from 'antd';

import Content from 'components/Content/Content.component';
import BootcampCourses from 'components/BootcampCourses/BootcampCourses.component';

const { Header } = Layout;
const { Title } = Typography;

const ManageBootcampCoursesPage = () => (
  <>
    <Header
      className="site-layout-background"
      style={{ padding: '0' }}
    >
      <Title
        style={{ margin: '14px 16px', textAlign: 'center' }}
        level={4}
      >
        Manage your bootcamp courses
      </Title>
    </Header>
    <Content>
      <BootcampCourses />
    </Content>
  </>
);

export default ManageBootcampCoursesPage;
