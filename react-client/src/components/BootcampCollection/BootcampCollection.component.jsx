import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { invalidateCache } from 'redux-cache';

import { Row, Button } from 'antd';

import BootcampCard from '../BootcampCard/BootcampCard.Component';
import CardSkeleton from '../CardSkeleton/CardSkeleton.component';
import Collapse from '../Collapse/Collapse.component';

import {
  selectBootcamps,
  selectBootcampsLoading,
  selectBootcampsError,
  selectLastUpdated,
} from '../../redux/bootcamps/bootcamps.selectors';
import { fetchBootcampsStartAsync } from '../../redux/bootcamps/bootcamps.actions';

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
      {lastUpdated && `Last updataed at ${new Date(lastUpdated).toLocaleTimeString()}`}
      <Button
        size='small'
        style={{ padding: '0 15px', marginLeft: 15 }}
        onClick={() => {
          invalidateCache('allBootcamps');
          fetchBootcampsStartAsync();
        }}
        loading={loading}
        type='dashed'
      >
        {loading ? 'Loading' : 'Refresh'}
      </Button>
    </p>
    <Collapse />
    <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
      justify='center'
      style={loading ? { opacity: 0.4 } : { opacity: 1 }}
    >
      {!error ? (
        loading ? (
          [...Array(6).keys()].map((skeletonKey) => <CardSkeleton key={skeletonKey} />)
        ) : (
          bootcamps.map(({ _id, ...props }) => <BootcampCard key={_id} {...props} />)
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

export default connect(mapStateToProps, {
  fetchBootcampsStartAsync,
  invalidateCache,
})(BootcampCollection);
