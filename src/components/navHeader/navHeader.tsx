import './navHeader.scss';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import Search from 'antd/lib/input/Search';
import { useState } from 'react';
import {
  FileDoneOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  ScheduleOutlined,
  SettingOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { LanguageEnum } from '../../redux/slices/localization/localizationTypes';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';

export default function NavHeader() {
  const [language, setLang] = useLocales();
  const [isLogged, setIsLogged] = useState<boolean>(true);

  return (
    <>
      <div className="logo" />
      <Menu defaultSelectedKeys={['main']} mode="horizontal" className="nav-left">
        <Menu.Item key="main" icon={<HomeOutlined />}>
          {locales[language].mainLink}
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="boards" icon={<ScheduleOutlined />}>
          {locales[language].boards}
          <Link to="/Boards" />
        </Menu.Item>
        <Menu.Item key="tasks" icon={<FileDoneOutlined />}>
          {locales[language].tasks}
          <Link to="/Tasks" />
        </Menu.Item>
        <Menu.Item key="people" icon={<TeamOutlined />}>
          {locales[language].people}
          <Link to="/People" />
        </Menu.Item>
      </Menu>
      <Search />
      <Menu mode="horizontal" className="nav-right">
        <Menu.Item
          key="language"
          onClick={() => {
            if (language === LanguageEnum.ENG) {
              setLang(LanguageEnum.RUS);
            } else {
              setLang(LanguageEnum.ENG);
            }
          }}
        >
          {language === LanguageEnum.ENG ? 'EN' : 'RU'}
        </Menu.Item>
        {isLogged && (
          <Menu.Item key="profile" icon={<SettingOutlined />}>
            {locales[language].profileLink}
            <Link to="/Profile" />
          </Menu.Item>
        )}
        {isLogged ? (
          <Menu.Item
            key="home"
            icon={<LogoutOutlined />}
            onClick={() => {
              setIsLogged(false);
            }}
          >
            <Link to="/" />
          </Menu.Item>
        ) : (
          <Menu.SubMenu icon={<LoginOutlined />} key="SubMenu">
            <Menu.Item
              key="logIn"
              icon={<UserOutlined />}
              onClick={() => {
                setIsLogged(true);
              }}
            >
              {locales[language].logInLink}
            </Menu.Item>
            <Menu.Item key="signUp" icon={<UsergroupAddOutlined />}>
              {locales[language].signUpLink}
              <Link to="/SignUp" />
            </Menu.Item>
          </Menu.SubMenu>
        )}
      </Menu>
    </>
  );
}
