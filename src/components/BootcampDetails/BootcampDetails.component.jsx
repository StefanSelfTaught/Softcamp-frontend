import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Skeleton, Typography, Col, Row } from 'antd';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import Course from 'components/BootcampDetails/Course.component';

import { fetchbootcampDetailsStartAsync } from 'redux/bootcamps/bootcamps.actions';

import {
  selectBootcampDetails,
  selectBootcampDetailsLoading,
  selectBootcampDetailsError,
} from 'redux/bootcamps/bootcamps.selectors';

const { Title, Paragraph, Text } = Typography;

const BootcampDetails = ({
  bootcamp,
  loading,
  fetchbootcampDetailsStartAsync,
  urlParam,
}) => {
  const {
    name = 'name',
    description = 'description',
    photo = 'no-photo.jpg',
    courses = [],
    careers = [],
    averageCost = 'some averageCost number',
    location = { coordinates: [0, 0] },
  } = bootcamp;

  useEffect(() => {
    fetchbootcampDetailsStartAsync(urlParam);
  }, [fetchbootcampDetailsStartAsync, urlParam]);

  return (
    <>
      <Row>
        <Col span={16}>
          <Skeleton loading={loading} active>
            <Title level={1}>{name}</Title>
            <Paragraph>{description}</Paragraph>
          </Skeleton>
          <Skeleton loading={loading} active>
            <Title level={4}>Careers:</Title>
            <ul>
              {careers.map((career, index) => (
                <li key={index}>{career}</li>
              ))}
            </ul>
          </Skeleton>
          <Title style={{ marginBottom: 25 }} level={4}>
            Average Course Cost: <Text>${averageCost}</Text>
          </Title>
          <div>
            {courses.map(({ _id, ...props }) => (
              <Course key={_id} {...props} />
            ))}
          </div>
        </Col>
        <Col span={8}>
          <img
            style={{ width: 400, height: 250 }}
            alt={name}
            src={`http://localhost:5000/uploads/${photo}`}
          />
        </Col>
      </Row>
      <Map
        center={[location.coordinates[1], location.coordinates[0]]}
        zoom={12}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[location.coordinates[1], location.coordinates[0]]}
        >
          <Popup>{name}</Popup>
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
