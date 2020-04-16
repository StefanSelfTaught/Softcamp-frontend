import React from 'react';

import { Card, Col } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

const CardSkeleton = () => (
  <Col flex='auto'>
    <Card
      loading
      cover={
        <img
          alt='bro'
          style={{ objectFit: 'cover', width: 250, height: 160 }}
          src='http://localhost:5000/uploads/no-photo.jpg'
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
      <Meta style={{ whiteSpace: 'nowrap' }} title='bro' description='bro' />
      {/* </Tooltip> */}
      <span style={{ marginTop: '20px', display: 'inline-block' }}>bro</span>
    </Card>
  </Col>
);

export default CardSkeleton;
