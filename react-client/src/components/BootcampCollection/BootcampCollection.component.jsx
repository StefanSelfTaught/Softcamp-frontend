import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectBootcamps,
	selectLoading,
	selectBootcampsError
} from '../../redux/bootcamps/bootcamps.selectors.js';

import PropTypes from 'prop-types';

import withSkeletonLoading from '../HOC/withSkeletonLoading.component.jsx';
import BootcampCard from '../BootcampCard/BootcampCard.Component.jsx';

import { Row, Skeleton } from 'antd';

const BootcampCardLoading = withSkeletonLoading(BootcampCard);

const BootcampCollection = ({ bootcamps, loading, error }) => {
	return (
		<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
			{!error ? (
				!bootcamps.length ? (
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
	bootcamps: PropTypes.array.isRequired
};

const mapStateToProps = createStructuredSelector({
	bootcamps: selectBootcamps,
	loading: selectLoading,
	error: selectBootcampsError
});

export default connect(mapStateToProps)(BootcampCollection);
