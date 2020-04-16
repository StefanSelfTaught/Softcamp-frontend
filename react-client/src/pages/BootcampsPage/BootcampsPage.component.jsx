import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Layout, Typography } from 'antd';

import Content from '../../components/Content/Content.component';
import BootcampCollection from '../../components/BootcampCollection/BootcampCollection.component';

import { fetchBootcampsStartAsync } from '../../redux/bootcamps/bootcamps.actions';

const { Header } = Layout;
const { Title } = Typography;

const BootcampsPage = ({ fetchBootcampsStartAsync }) => {
  useEffect(() => {
    fetchBootcampsStartAsync();

    console.log('Effect');
  }, [fetchBootcampsStartAsync]);

  useEffect(() => {
    console.log('Effect2');
  }, []);

  return (
    <>
      <Header className='site-layout-background' style={{ padding: '0' }}>
        <Title style={{ margin: '14px 16px', textAlign: 'center' }} level={4}>
          Browse your dream bootcamps by distance or rating
        </Title>
      </Header>
      <Content>
        <BootcampCollection />
      </Content>
    </>
  );
};

BootcampCollection.proptTypes = {
  fetchBootcampsStartAsync: PropTypes.func.isRequired,
};

export default connect(null, { fetchBootcampsStartAsync })(BootcampsPage);
