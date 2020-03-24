import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Row, Skeleton } from 'antd';

import withSkeletonLoading from '../HOC/withSkeletonLoading.component.jsx';
import BootcampCard from '../BootcampCard/BootcampCard.Component.jsx';

import {
	selectBootcamps,
	selectBootcampsLoading,
	selectBootcampsError
} from '../../redux/bootcamps/bootcamps.selectors.js';

const BootcampCardLoading = withSkeletonLoading(BootcampCard);

const BootcampCollection = ({ bootcamps, loading, error }) => {
	return (
		<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
			{!error ? (
				loading ? (
					<Skeleton active paragraph={{ rows: 10 }} />
				) : (
					bootcamps.map(({ _id, ...props }) => {
						return (
							<BootcampCardLoading loading={loading} key={_id} {...props} />
						);
					})
				)
			) : (
				<h1>Network Error</h1>
			)}
		</Row>
	);
};

BootcampCollection.proptTypes = {
	loading: PropTypes.bool.isRequired,
	bootcamps: PropTypes.array.isRequired,
	error: PropTypes.string.isRequired
};

const mapStateToProps = createStructuredSelector({
	bootcamps: selectBootcamps,
	loading: selectBootcampsLoading,
	error: selectBootcampsError
});

export default connect(mapStateToProps)(BootcampCollection);
