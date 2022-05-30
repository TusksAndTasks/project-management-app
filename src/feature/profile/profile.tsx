import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import './profile.scss';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';
import { profileHelp } from '../../helpers/helperFunctions/profileHelper';
import { IJtwToken } from '../../components/taskForm/taskFormTypes';
import ConformModal from '../../components/conformModal/conformModal';
import { useUserData } from '../../helpers/hooks/useUserData';
import { IUserUpdateState } from '../../redux/slices/user/userTypes';

export default function Profile() {
  const [authToken, getUserToken] = useAuthToken();
  const [userData, getCurrentUser, updateCurrentUser, deleteCurrentUser] = useUserData();
  const [language] = useLocales();
  const decodedToken = (jwt_decode(authToken) as IJtwToken).userId;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleUpdate = () => {
    if (!userData.loading) {
      setIsUpdated(true);
      setTimeout(() => {
        setIsUpdated(false);
      }, 3000);
    }
  };

  const handleOkDelete = async () => {
    document.cookie = `${encodeURIComponent('login')}=${encodeURIComponent('')}`;
    getUserToken();
    navigate('/');
  };

  useEffect(() => {
    getCurrentUser({ id: decodedToken, token: authToken });
  }, []);

  const getLists = profileHelp();
  const { ruleList } = getLists(language);
  const { name, password } = ruleList;

  return (
    <>
      <h1>{locales[language].title}</h1>

      {userData.loading ? (
        <>
          <LoadingOutlined style={{ fontSize: '2em', color: '#8A4900', marginRight: '10px' }} />
          {locales[language].loading}
        </>
      ) : (
        <div>
          <Form
            name="updateUserForm"
            key={userData.user.id}
            initialValues={{ remember: true }}
            onFinish={(data: IUserUpdateState) => {
              handleUpdate();
              return updateCurrentUser(data);
            }}
            autoComplete="off"
            labelAlign="left"
            wrapperCol={{ span: 24 }}
            labelCol={{ span: 24 }}
            className="form-profile"
            fields={[
              {
                name: ['login'],
                value: userData.user.login,
              },
              {
                name: ['name'],
                value: userData.user.name,
              },
              {
                name: ['password'],
                value: '',
              },
              {
                name: ['id'],
                value: userData.user.id,
              },
              {
                name: ['token'],
                value: authToken,
              },
            ]}
          >
            <Form.Item name="login" label={locales[language].login} className="form-label">
              <Typography>
                <pre>{userData.user.login}</pre>
              </Typography>
            </Form.Item>
            <Form.Item name="id" style={{ display: 'none' }}>
              <Input />
            </Form.Item>
            <Form.Item name="token" style={{ display: 'none' }}>
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label={locales[language].name}
              className="form-label"
              rules={name}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label={locales[language].password}
              className="form-label"
              rules={password}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" className="btn btn-create-inverse" htmlType="submit">
                {locales[language].button}
              </Button>
              <Button
                type="primary"
                className="btn btn-primary btn-delete"
                onClick={() => showModal()}
              >
                {locales[language].deleteButton}
              </Button>
              <Link to="/" className="button-reset">
                <Button htmlType="button" className="btn btn-primary btn-reset">
                  {locales[language].resetButton}
                </Button>
              </Link>
            </Form.Item>
            <Modal
              title={locales[language].deleteTitle}
              visible={isModalVisible}
              onCancel={handleClose}
              footer={[]}
            >
              <ConformModal
                deleteItem={deleteCurrentUser}
                authToken={authToken}
                handleOk={handleOkDelete}
                itemToDel={{ id: userData.user.id }}
                name={userData.user.name}
              />
            </Modal>
          </Form>

          {isUpdated && <h3 className="success-message">{locales[language].successUpdate}</h3>}
        </div>
      )}
    </>
  );
}
