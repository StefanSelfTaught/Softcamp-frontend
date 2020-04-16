import React, { useState } from 'react';

import { Collapse, Button } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import './Collapse.styles.css';

const { Panel } = Collapse;

const CollapseComponent = () => {
  const [panelActiveKey, setpanelActiveKey] = useState([]);

  const handlePanelToggle = () => {
    if (!panelActiveKey.length) {
      return setpanelActiveKey(['1']);
    }
    return setpanelActiveKey([]);
  };

  return (
    <div>
      <Button icon={<FilterOutlined />} onClick={handlePanelToggle}>
        Filters
      </Button>
      <Collapse
        activeKey={panelActiveKey}
        onChange={(key) => setpanelActiveKey(key)}
        style={{ marginBottom: 30, marginTop: 10 }}
        bordered={false}
      >
        <Panel showArrow={false} key='1'>
          <p>bro this is text</p>
          <p>bro this is text</p>
          <p>bro this is text</p>
          <input type='text' />
          <select name='bro' id='aa'>
            <option value='ceva'>aaa</option>
            <option value='asd'>ads</option>
            <option value='adsd'>asdasd</option>
          </select>
        </Panel>
      </Collapse>
    </div>
  );
};

export default CollapseComponent;
