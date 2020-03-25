import React from 'react';
import PropTypes from 'prop-types';

import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

const ContentSection = ({ children }) => (
  <>
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }} />
      <div
        className='site-layout-background'
        style={{ padding: 24, minHeight: 360 }}
      >
        {children}
      </div>
    </Content>
  </>
);

ContentSection.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentSection;
