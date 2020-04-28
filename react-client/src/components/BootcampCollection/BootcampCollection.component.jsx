import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Row, Button, Spin } from 'antd';

import BootcampCard from 'components/BootcampCard/BootcampCard.Component';
import CardSkeleton from 'components/CardSkeleton/CardSkeleton.component';
import Collapse from 'components/BootcampsFilter/Collapse.component';
import BootcampsSorting from 'components/BootcampsSorting/BootcampsSorting.component';

import {
  selectBootcamps,
  selectBootcampsLoading,
  selectBootcampsError,
  selectLastUpdated,
} from 'redux/bootcamps/bootcamps.selectors';
import { fetchBootcampsStartAsync } from 'redux/bootcamps/bootcamps.actions';

const BootcampCollection = ({
  bootcamps,
  loading,
  error,
  lastUpdated,
  fetchBootcampsStartAsync,
}) => (
  <>
    {lastUpdated && (
      <p style={{ marginBottom: 25 }}>
        Last updated at {new Date(lastUpdated).toLocaleTimeString()}
        <Button
          size='small'
          style={{ padding: '0 15px', marginLeft: 15 }}
          onClick={() => {
            fetchBootcampsStartAsync(null, '-createdAt', true);
          }}
          type='dashed'
        >
          Refresh
        </Button>
      </p>
    )}
    <BootcampsSorting />
    <Collapse />
    <Spin size='large' tip='Loading...' spinning={loading}>
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
          loading && !bootcamps.length ? (
            [...Array(6).keys()].map((skeletonKey) => <CardSkeleton key={skeletonKey} />)
          ) : bootcamps.length ? (
            bootcamps.map(({ _id, ...props }) => <BootcampCard key={_id} {...props} />)
          ) : !lastUpdated ? null : (
            <h1>No Bootcamps Founded!</h1>
          )
        ) : (
          <h1>Network Error</h1>
        )}
      </Row>
    </Spin>
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

export default connect(mapStateToProps, {
  fetchBootcampsStartAsync,
})(BootcampCollection);
