import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Layout, Typography } from 'antd';

import { selectBootcampMatchUser } from '../../redux/bootcamps/bootcamps.selectors';

import Content from '../../components/Content/Content.component';
import ManageBootcamp from '../../components/ManageBootcamp/ManageBootcamp.component';
import NoBootcamp from '../../components/ManageBootcamp/NoBootcamp.component';
import CreateBootcamp from '../../components/ManageBootcamp/CreateBootcamp.component';

const { Header } = Layout;
const { Title } = Typography;

const ManageBootcampPage = ({ bootcampOwner }) => {
  const [create, setCreate] = useState(false);

  const handleCreateNow = () => {
    setCreate(true);
  };

  return (
    <>
      <Header
        className='site-layout-background'
        style={{ padding: '0' }}
      >
        <Title
          style={{ margin: '14px 16px', textAlign: 'center' }}
          level={4}
        >
          Manage your bootcamp
        </Title>
      </Header>
      <Content>
        {create ? (
          <CreateBootcamp />
        ) : bootcampOwner ? (
          <ManageBootcamp />
        ) : (
          <NoBootcamp handleCreateNow={handleCreateNow} />
        )}
      </Content>
    </>
  );
};

const mapStateToProps = state => ({
  bootcampOwner: !!selectBootcampMatchUser(state),
});

export default connect(mapStateToProps)(ManageBootcampPage);
