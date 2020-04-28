import React, { useState, useEffect, useRef, memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  Collapse,
  Button,
  Slider,
  InputNumber,
  Select,
  Checkbox,
  Row,
  Col,
  Switch,
} from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import useLocalStorage from 'hooks/useLocalStorage.hook';
import {
  fetchBootcampsStartAsync,
  setAveragePriceFilter,
  setCareersFilter,
  setOtherFilters,
  toggleAveragePriceFilter,
} from 'redux/bootcamps/bootcamps.actions';
import {
  selectFiltersApplied,
  selectAveragePriceFilter,
  selectCareersFilter,
  selectOtherFilters,
  selectBootcampsSorting,
  selectAveragePriceState,
} from 'redux/bootcamps/bootcamps.selectors';

import 'components/BootcampsFilter/Collapse.styles.css';

const { Option } = Select;
const { Panel } = Collapse;

const CollapseComponent = memo(
  ({
    fetchBootcampsStartAsync,
    filtersApplied,
    setAveragePriceFilter,
    toggleAveragePriceFilter,
    averagePriceState,
    setCareersFilter,
    setOtherFilters,
    averagePriceFilter,
    otherFilters,
    careersFilter,
    sorting,
  }) => {
    const [panelActiveKey, setpanelActiveKey] = useLocalStorage('showFilters', []);
    const filtersStart = useRef(false);

    const handlePanelToggle = () => {
      if (!panelActiveKey.length) {
        return setpanelActiveKey(['1']);
      }
      return setpanelActiveKey([]);
    };

    useEffect(() => {
      if (!filtersApplied) {
        setAveragePriceFilter(1000, 15000);
        setOtherFilters([]);
        setCareersFilter([]);
        toggleAveragePriceFilter(true);
      }
    }, [
      filtersApplied,
      setAveragePriceFilter,
      setOtherFilters,
      setCareersFilter,
      toggleAveragePriceFilter,
    ]);

    useEffect(() => {
      if (filtersStart.current) {

        const filters = averagePriceState
          ? { prices: [], careers: careersFilter, otherFilters }
          : { prices: averagePriceFilter, careers: careersFilter, otherFilters };

        fetchBootcampsStartAsync(filters, sorting);
      }
    }, [careersFilter, otherFilters, averagePriceState, fetchBootcampsStartAsync]);

    return (
      <>
        <Button size='large' icon={<FilterOutlined />} onClick={handlePanelToggle}>
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
                    disabled={averagePriceState}
                    range
                    tipFormatter={(value) => `$${value}000`}
                    min={1}
                    max={15}
                    step={1}
                    value={[averagePriceFilter[0] / 1000, averagePriceFilter[1] / 1000]}
                    onAfterChange={() =>
                      fetchBootcampsStartAsync({
                        prices: averagePriceFilter,
                        courses: careersFilter,
                        otherFilters,
                      }, sorting)
                    }
                    onChange={(value) => {
                      filtersStart.current = true;
                      const [firstValue, secondValue] = value;
                      setAveragePriceFilter(firstValue * 1000, secondValue * 1000);
                    }}
                  />
                  <InputNumber
                    disabled={averagePriceState}
                    formatter={(value) => `$ ${value}`}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    min={1000}
                    max={15000}
                    value={averagePriceFilter[0]}
                    step={1000}
                  />
                  &nbsp;&nbsp; - &nbsp;&nbsp;
                  <InputNumber
                    disabled={averagePriceState}
                    formatter={(value) => `$ ${value}`}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    min={1000}
                    max={15000}
                    value={averagePriceFilter[1]}
                    step={1000}
                  />
                  <div style={{ marginTop: 10 }}>
                    <Switch
                      checked={!averagePriceState}
                      onChange={() => {
                        filtersStart.current = true;
                        toggleAveragePriceFilter(!averagePriceState);
                      }}
                    />
                  </div>
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
                    value={careersFilter}
                    onChange={(value) => {
                      filtersStart.current = true;
                      setCareersFilter(value);
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
                  <Checkbox.Group
                    value={otherFilters}
                    onChange={(values) => {
                      filtersStart.current = true;
                      setOtherFilters(values);
                    }}
                  >
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
      </>
    );
  });

const mapStateToProps = createStructuredSelector({
  filtersApplied: selectFiltersApplied,
  averagePriceFilter: selectAveragePriceFilter,
  averagePriceState: selectAveragePriceState,
  careersFilter: selectCareersFilter,
  otherFilters: selectOtherFilters,
  sorting: selectBootcampsSorting,
});

const mapDispatchToProps = {
  fetchBootcampsStartAsync,
  setAveragePriceFilter,
  toggleAveragePriceFilter,
  setCareersFilter,
  setOtherFilters,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollapseComponent);
