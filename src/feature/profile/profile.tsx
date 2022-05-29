import React, { useEffect } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useUserData } from '../../helpers/hooks/useUserData';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import './profile.scss';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';
import { IUserUpdateState } from '../../redux/slices/users/usersTypes';

export default function Profile() {
  const [authToken] = useAuthToken();
  const [usersData, getUsersList, updateCurrentUser] = useUserData();
  const [language] = useLocales();

  useEffect(() => {
    getUsersList(authToken);
  }, []);

  return (
    <>
      <h1>{locales[language].title}</h1>

      {usersData.loading ? (
        <>
          <LoadingOutlined style={{ fontSize: '2em', color: '#8A4900', marginRight: '10px' }} />
          {locales[language].loading}
        </>
      ) : (
        <div>
          {usersData.users
            .filter((item) => item.login === localStorage.getItem('user'))
            .map((user) => (
              <Form
                name="updateUserForm"
                key={user.id}
                initialValues={{ remember: true }}
                onFinish={(data: IUserUpdateState) => updateCurrentUser(data)}
                autoComplete="off"
                labelAlign="left"
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 24 }}
                fields={[
                  {
                    name: ['login'],
                    value: user.login,
                  },
                  {
                    name: ['name'],
                    value: user.name,
                  },
                  {
                    name: ['password'],
                    value: '',
                  },
                  {
                    name: ['id'],
                    value: user.id,
                  },
                  {
                    name: ['token'],
                    value: authToken,
                  },
                ]}
              >
                <Form.Item name="login" label={locales[language].login} className="form-label">
                  <Typography>
                    <pre>{user.login}</pre>
                  </Typography>
                </Form.Item>
                <Form.Item name="id" style={{ display: 'none' }}>
                  <Input />
                </Form.Item>
                <Form.Item name="token" style={{ display: 'none' }}>
                  <Input />
                </Form.Item>
                <Form.Item name="name" label={locales[language].name} className="form-label">
                  <Input />
                </Form.Item>
                <Form.Item
                  name="password"
                  label={locales[language].password}
                  className="form-label"
                >
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 11 }}>
                  <Button type="primary" className="btn btn-primary" htmlType="submit">
                    {locales[language].button}
                  </Button>
                </Form.Item>
              </Form>
            ))}
        </div>
      )}
    </>
  );
}
