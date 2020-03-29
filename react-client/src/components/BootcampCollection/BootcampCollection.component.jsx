import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { invalidateCache } from 'redux-cache';

import { Row, Skeleton, Button } from 'antd';

import withSkeletonLoading from '../HOC/withSkeletonLoading.component';
import BootcampCard from '../BootcampCard/BootcampCard.Component';

import {
  selectBootcamps,
  selectBootcampsLoading,
  selectBootcampsError,
  selectLastUpdated,
} from '../../redux/bootcamps/bootcamps.selectors';
import { fetchBootcampsStartAsync } from '../../redux/bootcamps/bootcamps.actions';

const BootcampCardLoading = withSkeletonLoading(BootcampCard);

const BootcampCollection = ({
  bootcamps,
  loading,
  error,
  lastUpdated,
  fetchBootcampsStartAsync,
  invalidateCache,
}) => (
  <>
      <p style={{ marginBottom: 25 }}>
        {lastUpdated &&
          `Last updated at ${new Date(lastUpdated).toLocaleTimeString()}`}
        .
        <Button
          style={{ height: 25, padding: '0 15px', marginLeft: 15 }}
          onClick={() => {
            invalidateCache('allBootcamps');
            fetchBootcampsStartAsync();
          }}
          loading={loading}
          type='dashed'
        >
          {loading ? 'Refreshing' : 'Refresh'}
        </Button>
      </p>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
        justify='center'
      >
        {!error ? (
          loading ? (
            <Skeleton active paragraph={{ rows: 10 }} />
          ) : (
            bootcamps.map(({ _id, ...props }) => (
              <BootcampCardLoading loading={loading} key={_id} {...props} />
            ))
          )
        ) : (
          <h1>Network Error</h1>
        )}
      </Row>
    </>
);

BootcampCollection.proptTypes = {
  loading: PropTypes.bool.isRequired,
  bootcamps: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  lastUpdated: PropTypes.number.isRequired,
  fetchBootcampsStartAsync: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  bootcamps: selectBootcamps,
  loading: selectBootcampsLoading,
  error: selectBootcampsError,
  lastUpdated: selectLastUpdated,
});

export default connect(mapStateToProps, { fetchBootcampsStartAsync, invalidateCache })(
  BootcampCollection,
);
