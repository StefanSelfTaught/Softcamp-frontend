import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Select } from 'antd';

import {
  selectAveragePriceFilter,
  selectCareersFilter,
  selectOtherFilters,
  selectBootcampsSorting,
  selectAveragePriceState,
} from 'redux/bootcamps/bootcamps.selectors';
import {
  sortBootcamps,
  fetchBootcampsStartAsync,
} from 'redux/bootcamps/bootcamps.actions';

const { Option } = Select;

class BootcampsSorting extends React.Component {
  componentDidUpdate(prevProps) {
    const {
      careersFilter,
      fetchBootcampsStartAsync,
      otherFilters,
      sorting,
      averagePriceState,
      averagePriceFilter,
    } = this.props;
    if (sorting !== prevProps.sorting) {
      if (averagePriceState) {
        fetchBootcampsStartAsync(
          {
            prices: [],
            careers: careersFilter,
            otherFilters,
          },
          sorting,
        );
      } else {
        fetchBootcampsStartAsync(
          {
            prices: averagePriceFilter,
            careers: careersFilter,
            otherFilters,
          },
          sorting,
        );
      }
    }
  }

  render() {
    const { sortBootcamps, sorting } = this.props;

    return (
      <Select
        value={sorting}
        onChange={(value) => {
          sortBootcamps(value);
        }}
        size='large'
        style={{ width: 150, marginRight: 25 }}
      >
        <Option disabled>Sort</Option>
        <Option value='-createdaaaAt'>Highest Rated</Option>
        <Option value='-createdAt'>Newest</Option>
        <Option value='averageCost'>Lowest Price</Option>
        <Option value='-averageCost'>Highest Price</Option>
      </Select>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  averagePriceFilter: selectAveragePriceFilter,
  careersFilter: selectCareersFilter,
  otherFilters: selectOtherFilters,
  sorting: selectBootcampsSorting,
  averagePriceState: selectAveragePriceState,
});

export default connect(mapStateToProps, { sortBootcamps, fetchBootcampsStartAsync })(
  BootcampsSorting,
);
