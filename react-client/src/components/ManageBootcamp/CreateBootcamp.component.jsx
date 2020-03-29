import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AlgoliaPlaces from 'algolia-places-react';

import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  Checkbox,
  Upload,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { selectBootcampsLoading } from '../../redux/bootcamps/bootcamps.selectors';
import { createBootcampStartAsync } from '../../redux/bootcamps/bootcamps.actions';

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

const CreateBootcamp = ({
  loading,
  createBootcampStartAsync,
}) => {
  const [form] = Form.useForm();

  let beforeInput = 'https://';
  const handleChangeBefore = value => {
    beforeInput = value;
  };

  let afterInput = '.com';
  const handleChangeAfter = value => {
    afterInput = value;
  };

  const handleAddressChange = ({ suggestion }) => {
    form.setFieldsValue({
      address: suggestion.value,
    });
  };

  const handleAddressClear = () => {
    form.setFieldsValue({
      address: '',
    });

    form.setFields([
      {
        name: ['address'],
        validateStatus: 'error',
        errors: ['Please choose an address from the list!'],
      },
    ]);
  };

  const selectBeforeInput = (
    <Select
      defaultValue='http://'
      onChange={handleChangeBefore}
      style={{ width: 90 }}
    >
      <Option value='http://'>http://</Option>
      <Option value='https://'>https://</Option>
    </Select>
  );

  const selectAfterInput = (
    <Select
      defaultValue='.com'
      onChange={handleChangeAfter}
      style={{ width: 80 }}
    >
      <Option value='.com'>.com</Option>
      <Option value='.net'>.net</Option>
      <Option value='.info'>.info</Option>
      <Option value='.org'>.org</Option>
    </Select>
  );

  const onFinishHandle = values => {
    const {
      name,
      description,
      address,
      phone,
      email,
      website,
      careers,
      checkbox,
      photo,
    } = values;

    const finalCheckbox = checkbox || [];
    const websiteOutput = beforeInput + website + afterInput;

    const bootcampData = {
      name,
      address,
      description,
      phone,
      email,
      website: websiteOutput,
      careers,
      housing: finalCheckbox.includes('housing'),
      jonAssistance: finalCheckbox.includes('jobAssistance'),
      acceptGi: finalCheckbox.includes('acceptGi'),
      jobGuarantee: finalCheckbox.includes('jobGuarantee'),
    };

    const formData = new FormData();

    formData.append('file', photo.file);
    formData.append(
      'bootcampData',
      JSON.stringify(bootcampData),
    );

    createBootcampStartAsync(formData);
  };

  const photoUploadProps = {
    name: 'file',
    accept: 'image/*',
    multiple: false,
    beforeUpload() {
      return false;
    },
  };

  return (
    <Form
      form={form}
      style={{ maxWidth: 1000, margin: '0 auto' }}
      onFinish={onFinishHandle}
      layout='vertical'
    >
      <Row gutter={150}>
        <Col span={12}>
          <Form.Item
            name='name'
            label='Name'
            rules={[
              {
                required: true,
                message: 'Please enter bootcamp name!',
              },
            ]}
          >
            <Input placeholder='Bootcamp Name' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='careers'
            label='Careers'
            rules={[
              {
                required: true,
                message: 'Please choose some careers!',
              },
            ]}
          >
            <Select
              mode='multiple'
              placeholder='Select careers'
              optionLabelProp='label'
            >
              <Option
                value='Web Development'
                label='Web Development'
              >
                Web Development
              </Option>
              <Option
                value='Mobile Development'
                label='Mobile Development'
              >
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
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={150}>
        <Col span={12}>
          <Form.Item
            name='address'
            label='Address'
            rules={[
              {
                required: true,
                message:
                  'Please choose an address from the list!',
              },
            ]}
          >
            <>
              <AlgoliaPlaces
                style={{ height: '33px' }}
                placeholder='Enter bootcamp address'
                options={{
                  appId: 'plRUACZC5HRH',
                  apiKey: 'e3a31c8a66d2339c7a8f53bc8fabb7c6',
                }}
                onChange={handleAddressChange}
                onClear={handleAddressClear}
              />
            </>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='website'
            label='Website'
            rules={[
              {
                required: true,
                message: 'Please enter your website!',
                whitespace: true,
              },
            ]}
          >
            <Input
              addonBefore={selectBeforeInput}
              addonAfter={selectAfterInput}
              placeholder='Website URL'
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={150}>
        <Col span={12}>
          <Form.Item
            name='phone'
            label='Phone Number'
            rules={[
              {
                required: true,
                message: 'Please enter your phone number!',
              },
            ]}
          >
            <Input placeholder='Phone' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='email'
            label='E-mail'
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please enter your E-mail!',
              },
            ]}
          >
            <Input placeholder='Contact Email' />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={150}>
        <Col span={12}>
          <Form.Item
            name='photo'
            label='Upload photo'
            rules={[
              {
                required: true,
                message: 'Please upload a photo!',
              },
            ]}
          >
            <Dragger {...photoUploadProps}>
              <p className='ant-upload-drag-icon'>
                <InboxOutlined />
              </p>
              <p className='ant-upload-text'>
                Click or drag file to this area to upload
              </p>
              <p className='ant-upload-hint' />
            </Dragger>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='checkbox'>
            <Checkbox.Group>
              <Row>
                <Checkbox
                  value='housing'
                  style={{ lineHeight: '32px' }}
                >
                  Housing
                </Checkbox>
              </Row>
              <Row>
                <Checkbox
                  value='jobAssistance'
                  style={{ lineHeight: '32px' }}
                >
                  Job Assistance
                </Checkbox>
              </Row>
              <Row>
                <Checkbox
                  value='jobGuarantee'
                  style={{ lineHeight: '32px' }}
                >
                  Job Guarantee
                </Checkbox>
              </Row>
              <Row>
                <Checkbox
                  value='acceptGi'
                  style={{ lineHeight: '32px' }}
                >
                  Accepts GI Bill
                </Checkbox>
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Form.Item
          style={{ width: '100%' }}
          name='description'
          label='Description'
          rules={[
            {
              required: true,
              message: 'Please enter a description!',
              whitespace: true,
            },
          ]}
        >
          <TextArea rows={10} />
        </Form.Item>
      </Row>
      <Button loading={loading} type='primary' htmlType='submit'>
        {loading ? 'Loading' : 'Create Bootcamp'}
      </Button>
    </Form>
  );
};

CreateBootcamp.proptTypes = {
  createBootcampStartAsync: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: selectBootcampsLoading(state),
});

export default connect(mapStateToProps, {
  createBootcampStartAsync,
})(CreateBootcamp);
