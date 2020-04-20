import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Card, Col } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import selectPathName from '../../redux/router/router.selectors';

const { Meta } = Card;

const BootcampCard = ({
  route,
  name,
  careers,
  averageCost,
  photo,
  id,
  push,
}) => (
  <Col flex='auto'>
    <Card
      hoverable
      onClick={() => {
        push(`${route}/${id}`);
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
        <SettingOutlined key='setting' />,
        <EditOutlined key='edit' />,
        <EllipsisOutlined key='ellipsis' />,
      ]}
    >
      {/* <Tooltip placement='bottom' title={careers.join(', ')}> */}
      <Meta
        style={{ whiteSpace: 'nowrap' }}
        title={name}
        description={careers.join(', ')}
      />
      {/* </Tooltip> */}
      <span style={{ marginTop: '20px', display: 'inline-block' }}>
        $ {averageCost}
      </span>
    </Card>
  </Col>
);

BootcampCard.proptTypes = {
  name: PropTypes.string.isRequired,
  careers: PropTypes.string.isRequired,
  averageCost: PropTypes.number.isRequired,
  photo: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  push: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  route: selectPathName,
});

export default connect(mapStateToProps, { push })(BootcampCard);
