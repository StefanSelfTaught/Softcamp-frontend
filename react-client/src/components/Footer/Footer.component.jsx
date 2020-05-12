import React from 'react';

import { Layout } from 'antd';
import { HeartFilled } from '@ant-design/icons';

const { Footer } = Layout;

const FooterSection = () => (
  <Footer style={{ textAlign: 'center' }}>
    DevCamper ©2020. Created with{' '}
    <HeartFilled style={{ color: 'red' }} /> by{' '}
    <a target="_blank" href="https://github.com/StefanSelfTaught">
      Stefan Pop
    </a>
  </Footer>
);

export default FooterSection;
