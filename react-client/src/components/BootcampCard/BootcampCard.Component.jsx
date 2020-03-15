import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Card, Col } from 'antd';

import { push } from 'connected-react-router'

import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined
} from '@ant-design/icons';

const { Meta } = Card;

const BootcampCard = ({ push, router, name, careers, averageCost, photo, id }) => {
	return (
		<Col flex="auto">
			<Card
				onClick={() => {
					push(`${router}/${id}`);
				}}
				cover={
					<img
						alt={name}
						style={{ objectFit: 'cover', width: 250, height: 160 }}
						src={`http://localhost:5000/uploads/${photo}`}
					/>
				}
				style={{ width: 250, marginBottom: 50 }}
				actions={[
					<SettingOutlined key="setting" />,
					<EditOutlined key="edit" />,
					<EllipsisOutlined key="ellipsis" />
				]}>
				{/* <Tooltip placement='bottom' title={careers.join(', ')}> */}
					<Meta
						style={{ whiteSpace: 'nowrap' }}
						title={name}
						description={careers.join(', ')}
					/>
				{/*</Tooltip>*/}
				<span style={{ marginTop: '20px', display: 'inline-block' }}>
					$ {averageCost}
				</span>
			</Card>
		</Col>
	);
};

BootcampCard.proptTypes = {
	name: PropTypes.string.isRequired,
	careers: PropTypes.string.isRequired,
	averageCost: PropTypes.number.isRequired,
	photo: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	push: PropTypes.func.isRequired,
	router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	router: state.router.location.pathname
})

export default connect(mapStateToProps, {push})(BootcampCard)
