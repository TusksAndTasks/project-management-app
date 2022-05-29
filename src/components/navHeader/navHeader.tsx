import './navHeader.scss';
import { Link } from 'react-router-dom';
import { Button, Image, Menu, Modal, Switch } from 'antd';
import {
  EnvironmentOutlined,
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
import logo from '../../assets/img/logo-kanban.png';
import getItem from './menuItems/menuItems';

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

  const itemsLeft = [
    getItem(
      <>
        <Image width={55} src={logo} />
        <Link to="/" />
      </>,
      'logo'
    ),
    getItem(
      <>
        {locales[language].mainLink}
        <Link to="/" />
      </>,
      'main',
      <HomeOutlined />
    ),
    getItem(
      <>
        {locales[language].people}
        <Link to="/Team" />
      </>,
      'people',
      <TeamOutlined />
    ),
  ];
  const itemsRightAuth = [
    getItem(
      <Switch
        onChange={changeMode}
        checkedChildren={LanguageEnum.ENG}
        unCheckedChildren={LanguageEnum.RUS}
        defaultChecked
      />,
      'switchlang'
    ),
    getItem(
      <>
        {locales[language].profileLink}
        <Link to="/Profile" />
      </>,
      'profile',
      <SettingOutlined />
    ),
    getItem(
      <>
        {locales[language].goHome}
        <Link to="/" />
      </>,
      'gohome',
      <EnvironmentOutlined />
    ),
    getItem(
      <>
        {locales[language].signOut}
        <Link to="/" />
      </>,
      'signout',
      <LogoutOutlined />
    ),
  ];
  const itemsRightNoAuth = [
    getItem(
      <Switch
        onChange={changeMode}
        checkedChildren={LanguageEnum.ENG}
        unCheckedChildren={LanguageEnum.RUS}
        defaultChecked
      />,
      'switchlang'
    ),
    getItem(
      <>
        {locales[language].logInLink}
        <Link to="/LogIn" />
      </>,
      'login',
      <LoginOutlined />
    ),
    getItem(
      <>
        {locales[language].signUpLink}
        <Link to="/SignUp" />
      </>,
      'signup',
      <UsergroupAddOutlined />
    ),
  ];
  return (
    <>
      <Menu mode="horizontal" className="nav-left" items={itemsLeft} />
      {authToken && (
        <Button className="btn btn-primary btn-create" onClick={() => showModal()}>
          <PlusCircleFilled />
          {locales[language].createBoard}
        </Button>
      )}
      {authToken ? (
        <Menu
          mode="horizontal"
          className="nav-right"
          items={itemsRightAuth}
          onClick={(item) => item.key === 'signout' && deleteUserToken()}
        />
      ) : (
        <Menu mode="horizontal" className="nav-right" items={itemsRightNoAuth} />
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
