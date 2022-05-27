import React, { useEffect } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { useUserData } from '../../helpers/hooks/useUserData';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import './profile.scss';

export default function Profile() {
  const [authToken] = useAuthToken();
  const [usersData, getUsersList] = useUserData();

  useEffect(() => {
    getUsersList(authToken);
  }, []);

  return usersData.loading ? (
    <div>Load..</div>
  ) : (
    <div>
      {usersData.users
        .filter((item) => item.login === localStorage.getItem('user'))
        .map((user) => (
          <Form
            name="updateUserForm"
            initialValues={{ remember: true }}
            autoComplete="off"
            labelAlign="left"
            wrapperCol={{ span: 24 }}
            labelCol={{ span: 24 }}
            fields={[
              {
                name: ['Login'],
                value: user.login,
              },
              {
                name: ['Name'],
                value: user.name,
              },
              {
                name: ['Password'],
                value: '',
              },
            ]}
          >
            <Form.Item name="Login" label="Login" className="form-label">
              <Typography>
                <pre>{user.login}</pre>
              </Typography>
            </Form.Item>
            <Form.Item name="Name" label="Name" className="form-label">
              <Input />
            </Form.Item>
            <Form.Item name="Password" label="Password" className="form-label">
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 11 }}>
              <Button type="primary" className="btn btn-primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        ))}
    </div>
  );
}
