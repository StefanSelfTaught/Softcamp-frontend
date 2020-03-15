import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Layout, Skeleton } from 'antd';

import { selectBootcampDetails } from '../../redux/bootcamps/bootcamps.selectors.js';

const { Header } = Layout;

const BootcampDetails = ({ bootcamp, loading }) => {
	const { id, name, description, email, phone, website } = bootcamp;

	return loading ? (
		<Skeleton active paragraph={{ rows: 6 }} />
	) : (
		<>
			<Header className="site-layout-background" style={{ padding: '0' }}>
				<p>{name}</p>
			</Header>
			<ul>
				<li>Id: {id}</li>
				<li>Name: {name}</li>
				<li>Description: {description}</li>
				<li>Email: {email}</li>
				<li>Name: {name}</li>
				<li>Phone: {phone}</li>
				<li>Website: {website}</li>
			</ul>
		</>
	);
};

BootcampDetails.proptTypes = {
	bootcamp: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	bootcamp: selectBootcampDetails(state),
	loading: state.bootcamps.bootcampDetails.loading
});

export default connect(mapStateToProps)(
	BootcampDetails
);
