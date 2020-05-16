import React from 'react';
import PropTypes from 'prop-types';

import { Descriptions, Row, Col, Button } from 'antd';

import BootcampCard from 'components/BootcampCard/BootcampCard.component';

const ManageBootcamp = (props) => {
  return (
    <>
      <Row>
        <Col span={9}>
          <BootcampCard {...props} />
          <Button type="primary" danger>
            Delete Bootcamp
          </Button>
          <Button>Manage Bootcamp Courses</Button>
          <Button type="primary">Edit Bootcamp Details</Button>
        </Col>
        <Col span={15}>
          <Descriptions
            layout="vertical"
            title="Bootcamp info"
            bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="Name">
              The bootcamp name
            </Descriptions.Item>
            <Descriptions.Item label="Reviews">3</Descriptions.Item>
            <Descriptions.Item label="Average">$80.00</Descriptions.Item>
            <Descriptions.Item label="Location">
              Bucharest, Ro
            </Descriptions.Item>
            <Descriptions.Item label="Courses">
              Course 1
              <br />
              Course 2
              <br />
              Course 3
              <br />
              Total: 3 courses
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </>
  );
};

ManageBootcamp.propTypes = {
  props: PropTypes.object.isRequired,
};

export default ManageBootcamp;
