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
import './designComponents.scss';

const onFinish = () => {};
const onFinishFailed = () => {};

function DesignComponents() {
  return (
    <div className="demo-container">
      <h1>General Components</h1>
      <div>
        <h2>Button</h2>
        <DatePicker />
        <Button type="primary">Primary Button</Button>
      </div>
      <div className="demo-icons">
        <h2>Icons</h2>
        <LoginOutlined />
        <PlusCircleOutlined />
        <CloseCircleOutlined />
        <DeleteOutlined />
        <FormOutlined />
      </div>
      <div>
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
      <div>
        <h2>Upload</h2>
        <Upload>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </div>
    </div>
  );
}

export default DesignComponents;
