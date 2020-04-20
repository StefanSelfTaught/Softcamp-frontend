import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Content from '../../components/Content/Content.component';

import { fetchbootcampDetailsStartAsync } from '../../redux/bootcamps/bootcamps.actions';

import BootcampDetails from '../../components/BootcampDetails/BootcampDetails.component';

const BootcampDetailsPage = ({
  match: {
    params: { bootcampId },
  },
}) => (
  <Content>
    <BootcampDetails urlParam={bootcampId} />
  </Content>
);

BootcampDetailsPage.proptTypes = {
  match: PropTypes.object.isRequired,
  fetchbootcampDetailsStartAsync: PropTypes.func.isRequired,
};

export default connect(null, { fetchbootcampDetailsStartAsync })(
  BootcampDetailsPage,
);
