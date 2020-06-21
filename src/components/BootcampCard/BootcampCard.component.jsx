import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

import { Card, Col } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

// Connect all BootcampCards to redux ( bad )

const BootcampCard = ({ name, careers, averageCost, photo, id, push }) => (
  <Col flex="auto">
    <Card
      hoverable
      onClick={() => {
        push(`bootcamps/${id}`);
      }}
      cover={
        <img
          alt={name}
          style={{ objectFit: 'cover', width: 250, height: 160 }}
          src={`https://softcamp-api.herokuapp.com/uploads/${photo}`}
        />
      }
      style={{ width: 250, marginBottom: 50 }}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
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
};

export default connect(null, { push })(BootcampCard);
