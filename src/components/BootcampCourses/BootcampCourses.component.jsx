import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Form,
  Input,
  Button,
  Col,
  Row,
  InputNumber,
  Checkbox,
  Radio,
  Divider,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { createBootcampCoursesStartAsync } from 'redux/bootcamps/bootcamps.actions';

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
};

const BootcampCourses = ({ createBootcampCoursesStartAsync }) => {
  const { userBootcampId } = useParams();
  const [form] = Form.useForm();

  const onFinish = ({ courses }) => {
    if (courses) {
      createBootcampCoursesStartAsync(userBootcampId, courses);
    } else {
      alert('Please add a course');
    }
  };

  return (
    <div style={{ margin: 50 }}>
      <p>TO DO: Maybe add some bootcamps details at the top</p>
      <Form form={form} onFinish={onFinish} className="my-form">
        <Form.List name="courses">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Fragment key={field.key}>
                    <Divider>Course {index + 1}</Divider>
                    <Row>
                      <Col>
                        <Form.Item
                          name={[field.name, 'title']}
                          fieldKey={[field.fieldKey, 'title']}
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="Curse Title" />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item
                          name={[field.name, 'weeks']}
                          fieldKey={[field.fieldKey, 'weeks']}
                          rules={[{ required: true }]}
                        >
                          <InputNumber placeholder="weeks" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Item
                          name={[field.name, 'tuition']}
                          fieldKey={[field.fieldKey, 'tuition']}
                          rules={[{ required: true }]}
                        >
                          <InputNumber placeholder="Tuition" />
                        </Form.Item>
                        <Form.Item
                          label="Minimum Skill"
                          name={[field.name, 'minimumSkill']}
                          fieldKey={[field.fieldKey, 'minimumSkill']}
                          rules={[{ required: true }]}
                        >
                          <Radio.Group>
                            <Radio style={radioStyle} value="beginner">
                              Beginner
                            </Radio>
                            <Radio style={radioStyle} value="intermediate">
                              Intermediate
                            </Radio>
                            <Radio style={radioStyle} value="advanced">
                              Advanced
                            </Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Item
                          name={[field.name, 'scholarshipAvailable']}
                          fieldKey={[
                            field.fieldKey,
                            'scholarshipAvailable',
                          ]}
                          initialValue={false}
                        >
                          <Checkbox>Scholarship Avaliable</Checkbox>
                        </Form.Item>
                        <Form.Item
                          name={[field.name, 'description']}
                          fieldKey={[field.fieldKey, 'description']}
                          rules={[{ required: true }]}
                        >
                          <Input.TextArea
                            rows={5}
                            placeholder="Description"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    {fields.length > 1 ? (
                      <Button
                        type="danger"
                        onClick={() => remove(field.name)}
                        icon={<MinusCircleOutlined />}
                      >
                        Remove course {index + 1}
                      </Button>
                    ) : null}
                  </Fragment>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    style={{ width: '100%' }}
                  >
                    <PlusOutlined /> Add course field
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create course/s
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

BootcampCourses.proptTypes = {
  createBootcampCoursesStartAsync: PropTypes.func.isRequired,
};

export default connect(null, { createBootcampCoursesStartAsync })(
  BootcampCourses,
);
