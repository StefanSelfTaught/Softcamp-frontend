import React from 'react';

import { Card, Col, Skeleton } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import 'components/CardSkeleton/CardSkeleton.styles.css';

const { Meta } = Card;

const CardSkeleton = () => (
  <Col flex='auto'>
    <Card
      loading
      cover={
        <Skeleton.Avatar active shape='square' />
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
