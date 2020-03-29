import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Layout, Skeleton } from 'antd';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import { fetchbootcampDetailsStartAsync } from '../../redux/bootcamps/bootcamps.actions';

import {
  selectBootcampDetails,
  selectBootcampDetailsLoading,
  selectBootcampDetailsError,
} from '../../redux/bootcamps/bootcamps.selectors';

const { Header } = Layout;

const BootcampDetails = ({
  bootcamp,
  loading,
  fetchbootcampDetailsStartAsync,
  urlParam,
}) => {
  useEffect(() => {
    fetchbootcampDetailsStartAsync(urlParam);
  }, [fetchbootcampDetailsStartAsync, urlParam]);

  return bootcamp === null || loading ? (
    <Skeleton active paragraph={{ rows: 6 }} />
  ) : (
    <>
      <Header className='site-layout-background' style={{ padding: '0' }}>
        <p>{bootcamp.name}</p>
      </Header>
      <ul>
        <li>Id: {bootcamp.id}</li>
        <li>Name: {bootcamp.name}</li>
        <li>Description: {bootcamp.description}</li>
        <li>Email: {bootcamp.email}</li>
        <li>Name: {bootcamp.name}</li>
        <li>Phone: {bootcamp.phone}</li>
        <li>Website: {bootcamp.website}</li>
      </ul>
      <Map
        center={[bootcamp.location.coordinates[1], bootcamp.location.coordinates[0]]}
        zoom={12}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[bootcamp.location.coordinates[1], bootcamp.location.coordinates[0]]}
        >
          <Popup>{bootcamp.name}</Popup>
        </Marker>
      </Map>
    </>
  );
};

BootcampDetails.proptTypes = {
  bootcamp: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bootcamp: selectBootcampDetails,
  loading: selectBootcampDetailsLoading,
  error: selectBootcampDetailsError,
});

export default connect(mapStateToProps, {
  fetchbootcampDetailsStartAsync,
})(BootcampDetails);
