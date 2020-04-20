import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  Collapse,
  Button,
  Slider,
  InputNumber,
  Select,
  Checkbox,
  Row,
  Col,
} from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import { fetchBootcampsStartAsync } from '../../redux/bootcamps/bootcamps.actions';

import './Collapse.styles.css';

const { Option } = Select;
const { Panel } = Collapse;

const CollapseComponent = ({ fetchBootcampsStartAsync }) => {
  const [panelActiveKey, setpanelActiveKey] = useState([]);
  const [firstPrice, setFirstPrice] = useState(1000);
  const [secondPrice, setSecondPrice] = useState(15000);
  const [courses, setCourses] = useState(null);
  const [otherFilters, setOtherFilters] = useState(null);

  const handlePanelToggle = () => {
    if (!panelActiveKey.length) {
      return setpanelActiveKey(['1']);
    }
    return setpanelActiveKey([]);
  };

  useEffect(() => {
    if (courses || otherFilters) {
      fetchBootcampsStartAsync({
        prices: [firstPrice, secondPrice],
        courses,
        otherFilters,
      });
    }
  }, [courses, otherFilters]);

  return (
    <div>
      <Button icon={<FilterOutlined />} onClick={handlePanelToggle}>
        Filters
      </Button>
      <Collapse
        destroyInactivePanel
        activeKey={panelActiveKey}
        onChange={(key) => setpanelActiveKey(key)}
        style={{ marginBottom: 30, marginTop: 10 }}
        bordered={false}
      >
        <Panel showArrow={false} key='1'>
          <Row justify='center'>
            <Col flex='auto'>
              <div style={{ width: 230 }}>
                <p>
                  <b>Average Price</b>
                </p>
                <Slider
                  range
                  tipFormatter={(value) => `$${value}000`}
                  min={1}
                  max={15}
                  step={1}
                  value={[firstPrice / 1000, secondPrice / 1000]}
                  onAfterChange={() => fetchBootcampsStartAsync({
                    prices: [firstPrice, secondPrice],
                    courses,
                    otherFilters,
                  })}
                  onChange={(value) => {
                    const [firstValue, secondValue] = value;
                    setFirstPrice(firstValue * 1000);
                    setSecondPrice(secondValue * 1000);
                  }}
                />
                <InputNumber
                  formatter={(value) => `$ ${value}`}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  min={1000}
                  max={15000}
                  value={firstPrice}
                  step={1000}
                  onChange={(value) => setFirstPrice(value || 0)}
                />
                &nbsp;&nbsp; - &nbsp;&nbsp;
                <InputNumber
                  formatter={(value) => `$ ${value}`}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  min={1000}
                  max={15000}
                  value={secondPrice}
                  step={1000}
                  onChange={(value) => setSecondPrice(value || 0)}
                />
              </div>
            </Col>
            <Col flex='auto'>
              <div>
                <p>
                  <b>Select Careers</b>
                </p>
                <Select
                  style={{ minWidth: 250, maxWidth: 330 }}
                  mode='multiple'
                  placeholder='Select careers'
                  optionLabelProp='label'
                  onChange={(value) => {
                    setCourses(value);
                  }}
                >
                  <Option value='Web Development' label='Web Development'>
                    Web Development
                  </Option>
                  <Option value='Mobile Development' label='Mobile Development'>
                    Mobile Development
                  </Option>
                  <Option value='UI/UX' label='UI/UX'>
                    UI/UX
                  </Option>
                  <Option value='Data Science' label='Data Science'>
                    Data Science
                  </Option>
                  <Option value='Business' label='Business'>
                    Business
                  </Option>
                  <Option value='Other' label='Other'>
                    Other
                  </Option>
                </Select>
              </div>
            </Col>
            <Col flex='auto'>
              <div>
                <p>
                  <b>Others</b>
                </p>
                <Checkbox.Group onChange={(values) => setOtherFilters(values)}>
                  <Row>
                    <Checkbox value='housing' style={{ lineHeight: '32px' }}>
                      Housing
                    </Checkbox>
                  </Row>
                  <Row>
                    <Checkbox value='jobAssistance' style={{ lineHeight: '32px' }}>
                      Job Assistance
                    </Checkbox>
                  </Row>
                  <Row>
                    <Checkbox value='jobGuarantee' style={{ lineHeight: '32px' }}>
                      Job Guarantee
                    </Checkbox>
                  </Row>
                  <Row>
                    <Checkbox value='acceptGi' style={{ lineHeight: '32px' }}>
                      Accepts GI Bill
                    </Checkbox>
                  </Row>
                </Checkbox.Group>
              </div>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </div>
  );
};

export default connect(null, { fetchBootcampsStartAsync })(CollapseComponent);
