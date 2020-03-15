import React from 'react';

import { Layout } from 'antd';
import { HeartFilled } from '@ant-design/icons';

const { Footer } = Layout;

const FooterSection = () => {
	return (
		<Footer style={{ textAlign: 'center' }}>
			DevCamper ©2020. Created with <HeartFilled style={{ color: 'red' }} /> by
			Stefan Pop
		</Footer>
	);
};

export default FooterSection;
