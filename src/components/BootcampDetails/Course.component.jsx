import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Divider } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Course = ({
  title,
  description,
  weeks,
  minimumSkill,
  tuition,
  scholarshipAvailable,
}) => {
  return (
    <>
      <div style={{ backgroundColor: '#f0f2f5', marginBottom: 25 }}>
        <Title
          style={{
            backgroundColor: '#25b864',
            color: '#fff',
            padding: 10,
          }}
          level={3}
        >
          {title}
        </Title>
        <div style={{ padding: 12 }}>
          <div>
            <Title level={4}>Duration: {weeks} weeks</Title>
            <Paragraph>{description}</Paragraph>
          </div>
          <ul>
            <li>Cost: $ {tuition}</li>
            <li>Minimum Skill: {minimumSkill}</li>
            <li>
              Scholarship Available:{' '}
              {scholarshipAvailable ? (
                <CheckCircleTwoTone
                  style={{ fontSize: 20 }}
                  twoToneColor="#52c41a"
                />
              ) : (
                <CloseCircleTwoTone
                  style={{ fontSize: 20 }}
                  twoToneColor="#eb2f96"
                />
              )}
            </li>
          </ul>
        </div>
      </div>
      <Divider />
    </>
  );
};

Course.proptTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  weeks: PropTypes.number.isRequired,
  minimumSkill: PropTypes.string.isRequired,
  tuition: PropTypes.number.isRequired,
  scholarshipAvailable: PropTypes.bool.isRequired,
};

export default Course;
