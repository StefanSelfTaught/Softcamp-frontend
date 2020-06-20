import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Layout, Typography, Spin } from 'antd';

import Content from 'components/Content/Content.component';
import ManageBootcamp from 'components/ManageBootcamp/ManageBootcamp.component';
import NoBootcampState from 'components/ManageBootcamp/NoBootcampState.component';

import { fetchUserBootcampsStartAsync } from 'redux/bootcamps/bootcamps.actions';

const { Header } = Layout;
const { Title } = Typography;

const ManageBootcampPage = ({
  fetchUserBootcampsStartAsync,
  userBootcamp,
  loading,
}) => {
  useEffect(() => {
    fetchUserBootcampsStartAsync();
  }, [fetchUserBootcampsStartAsync]);

  return (
    <>
      <Header className="site-layout-background" style={{ padding: '0' }}>
        <Title
          style={{ margin: '14px 16px', textAlign: 'center' }}
          level={4}
        >
          Manage your bootcamp
        </Title>
      </Header>
      <Content>
        {loading ? (
          <Spin
            style={{ margin: '10% auto', width: '100%' }}
            size="large"
            tip="Loading..."
          />
        ) : userBootcamp ? (
          <ManageBootcamp
            name={userBootcamp.name}
            id={userBootcamp.id}
            careers={userBootcamp.careers}
            averageCost={userBootcamp.averageCost}
            photo={userBootcamp.photo}
          />
        ) : (
          <NoBootcampState />
        )}
      </Content>
    </>
  );
};

ManageBootcampPage.propTypes = {
  fetchUserBootcampsStartAsync: PropTypes.func.isRequired,
  userBootcamp: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  userBootcamp: state.bootcamps.userBootcamps.bootcampData,
  loading: state.bootcamps.userBootcamps.loading,
});

export default connect(mapStateToProps, {
  fetchUserBootcampsStartAsync,
})(ManageBootcampPage);
