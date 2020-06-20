import React from 'react';

import { Layout } from 'antd';
import { HeartFilled } from '@ant-design/icons';

const { Footer } = Layout;

const FooterSection = () => (
  <Footer style={{ textAlign: 'center' }}>
    Softcamp ©2020. Created with <HeartFilled style={{ color: 'red' }} />{' '}
    by{' '}
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/StefanSelfTaught"
    >
      Stefan Pop
    </a>
  </Footer>
);

export default FooterSection;
