import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Pagination } from 'antd';

import {
  selectBootcampsCount,
  selectAveragePriceFilter,
  selectCareersFilter,
  selectOtherFilters,
  selectBootcampsSorting,
  selectAveragePriceState,
  selectBootcampsPage,
} from 'redux/bootcamps/bootcamps.selectors';
import {
  fetchBootcampsStartAsync,
  setBootcampsPage,
} from 'redux/bootcamps/bootcamps.actions';

import './Pagination.styles.css';

const PaginationComponent = ({
  bootcampsCount,
  fetchBootcampsStartAsync,
  sorting,
  averagePriceFilter,
  careersFilter,
  otherFilters,
  averagePriceState,
  currentPage,
  setBootcampsPage,
}) => {
  const scrollToTop = () => {
    const scrollTopValue =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTopValue > 0) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Pagination
      showQuickJumper
      pageSize={10}
      onChange={(page) => {
        setBootcampsPage(page);
        if (averagePriceState) {
          fetchBootcampsStartAsync(
            {
              prices: [],
              careers: careersFilter,
              otherFilters,
            },
            sorting,
            page,
          );
        } else {
          fetchBootcampsStartAsync(
            {
              prices: averagePriceFilter,
              careers: careersFilter,
              otherFilters,
            },
            sorting,
            page,
          );
        }
        scrollToTop();
      }}
      showTotal={(total, range) =>
        `${range[0]}-${range[1]} of ${total} items`
      }
      current={currentPage}
      total={bootcampsCount}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  bootcampsCount: selectBootcampsCount,
  averagePriceFilter: selectAveragePriceFilter,
  careersFilter: selectCareersFilter,
  otherFilters: selectOtherFilters,
  sorting: selectBootcampsSorting,
  averagePriceState: selectAveragePriceState,
  currentPage: selectBootcampsPage,
});

PaginationComponent.proptTypes = {
  bootcampsCount: PropTypes.number.isRequired,
  fetchBootcampsStartAsync: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  fetchBootcampsStartAsync,
  setBootcampsPage,
})(PaginationComponent);
