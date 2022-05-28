import './navHeader.scss';
import { Link } from 'react-router-dom';
import { Button, Menu, Modal, Switch } from 'antd';
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  PlusCircleFilled,
  SettingOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import { LanguageEnum } from '../../redux/slices/localization/localizationTypes';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';
import { BoardCreatorForm } from '../boardCreatorForm.tsx/boardCreatorForm';
import { useBoardsList } from '../../helpers/hooks/useBoardsList';

export default function NavHeader() {
  const [language, setLang] = useLocales();
  const [authToken, , deleteUserToken] = useAuthToken();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [, , createBoard] = useBoardsList();
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleClose = () => {
    setIsModalVisible(false);
  };

  const changeMode = (value: boolean) => {
    setLang(value ? LanguageEnum.ENG : LanguageEnum.RUS);
  };
  return (
    <>
      <div className="logo" />
      <Menu defaultSelectedKeys={['main']} mode="horizontal" className="nav-left">
        <Menu.Item key="main" icon={<HomeOutlined />}>
          {locales[language].mainLink}
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="people" icon={<TeamOutlined />}>
          {locales[language].people}
          <Link to="/Team" />
        </Menu.Item>
      </Menu>
      {authToken && (
        <Button className="btn btn-primary btn-create" onClick={() => showModal()}>
          <PlusCircleFilled />
          {locales[language].createBoard}
        </Button>
      )}
      {authToken ? (
        <Menu mode="horizontal" className="nav-right">
          <Menu.Item>
            <Switch
              onChange={changeMode}
              checkedChildren={LanguageEnum.ENG}
              unCheckedChildren={LanguageEnum.RUS}
              defaultChecked
            />
          </Menu.Item>
          <Menu.Item key="profile" icon={<SettingOutlined />}>
            {locales[language].profileLink}
            <Link to="/Profile" />
          </Menu.Item>

          <Menu.Item key="home" icon={<LogoutOutlined />} onClick={deleteUserToken}>
            {locales[language].signOut}
            <Link to="/" />
          </Menu.Item>
        </Menu>
      ) : (
        <Menu mode="horizontal" className="nav-right">
          <Menu.Item>
            <Switch
              onChange={changeMode}
              checkedChildren={LanguageEnum.ENG}
              unCheckedChildren={LanguageEnum.RUS}
              defaultChecked
            />
          </Menu.Item>

          <Menu.Item key="logIn" icon={<LoginOutlined />}>
            {locales[language].logInLink}
            <Link to="/LogIn" />
          </Menu.Item>

          <Menu.Item key="signUp" icon={<UsergroupAddOutlined />}>
            {locales[language].signUpLink}
            <Link to="/SignUp" />
          </Menu.Item>
        </Menu>
      )}
      <Modal
        title={locales[language].createBoard}
        visible={isModalVisible}
        onCancel={handleClose}
        footer={[]}
      >
        <BoardCreatorForm createBoard={createBoard} authToken={authToken} handleOk={handleClose} />
      </Modal>
    </>
  );
}
