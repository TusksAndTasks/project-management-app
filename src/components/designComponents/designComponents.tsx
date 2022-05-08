import React from 'react';
import { Button, DatePicker, Form, Input, Checkbox, Upload } from 'antd';
import {
  CloseCircleOutlined,
  DeleteOutlined,
  FormOutlined,
  LoginOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import 'antd/dist/antd.min.css';

const onFinish = () => {};
const onFinishFailed = () => {};

function DesignComponents() {
  return (
    <div style={{ marginTop: '2rem', marginLeft: '2rem' }}>
      <h1>General Components</h1>
      <div style={{ marginTop: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #1890ff' }}>
        <h2>Button</h2>
        <DatePicker />
        <Button type="primary" style={{ marginLeft: 8 }}>
          Primary Button
        </Button>
      </div>
      <div style={{ marginTop: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #1890ff' }}>
        <h2>Icons</h2>
        <LoginOutlined style={{ fontSize: '2em', color: '#1890ff', padding: '0.5em' }} />
        <PlusCircleOutlined style={{ fontSize: '2em', color: '#1890ff', padding: '0.5em' }} />
        <CloseCircleOutlined style={{ fontSize: '2em', color: '#1890ff', padding: '0.5em' }} />
        <DeleteOutlined style={{ fontSize: '2em', color: '#1890ff', padding: '0.5em' }} />
        <FormOutlined style={{ fontSize: '2em', color: '#1890ff', padding: '0.5em' }} />
      </div>
      <div style={{ marginTop: ' 2rem', paddingBottom: '2rem', borderBottom: '1px solid #1890ff' }}>
        <h2>Form</h2>
        <Form
          name="basic"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 2, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ marginTop: '2rem', paddingBottom: '2rem' }}>
        <h2>Upload</h2>
        <Upload>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </div>
    </div>
  );
}

export default DesignComponents;
