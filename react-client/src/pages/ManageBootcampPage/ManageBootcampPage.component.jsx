import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Layout, Typography } from 'antd';

import Content from '../../components/Content/Content.component';
import ManageBootcamp from '../../components/ManageBootcamp/ManageBootcamp.component';
import NoBootcamp from '../../components/ManageBootcamp/NoBootcamp.component';
import CreateBootcamp from '../../components/ManageBootcamp/CreateBootcamp.component';

import { fetchUserBootcampsStartAsync } from '../../redux/bootcamps/bootcamps.actions';

const { Header } = Layout;
const { Title } = Typography;

const ManageBootcampPage = ({ fetchUserBootcampsStartAsync, userBootcamp }) => {
  const [create, setCreate] = useState(false);

  useEffect(() => {
    fetchUserBootcampsStartAsync();
  }, [fetchUserBootcampsStartAsync]);

  const handleCreateNow = () => {
    setCreate(true);
  };

  return (
    <>
      <Header className='site-layout-background' style={{ padding: '0' }}>
        <Title style={{ margin: '14px 16px', textAlign: 'center' }} level={4}>
          Manage your bootcamp
        </Title>
      </Header>
      <Content>
        {create ? (
          <CreateBootcamp />
        ) : userBootcamp ? (
          <ManageBootcamp bootcampId={userBootcamp.id} bootcampName={userBootcamp.name} />
        ) : (
          <NoBootcamp handleCreateNow={handleCreateNow} />
        )}
      </Content>
    </>
  );
};

const mapStateToProps = (state) => ({
  userBootcamp: state.bootcamps.userBootcamps.bootcampData,
});

export default connect(mapStateToProps, { fetchUserBootcampsStartAsync })(
  ManageBootcampPage
);
