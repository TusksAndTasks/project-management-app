import './navHeader.scss';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import Search from 'antd/lib/input/Search';
import { useEffect, useState } from 'react';
import { LanguageEnum } from '../../redux/slices/localization/localizationTypes';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';

export default function NavHeader() {
  const [language, setLang] = useLocales();
  const [isLogged, setIsLogged] = useState<boolean>(true);

  useEffect(() => {}, [isLogged]);

  return (
    <>
      <div className="logo" />
      <Menu defaultSelectedKeys={['/']} mode="horizontal" className="nav-left">
        <Menu.Item key="/">
          {locales[language].mainLink}
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="/Boards">
          {locales[language].boards}
          <Link to="/Boards" />
        </Menu.Item>
        <Menu.Item key="/Tasks">
          {locales[language].tasks}
          <Link to="/Tasks" />
        </Menu.Item>
        <Menu.Item key="/People">
          {locales[language].people}
          <Link to="/People" />
        </Menu.Item>
      </Menu>
      <Search />
      <Menu mode="horizontal" className="nav-right">
        <Menu.Item
          onClick={() => {
            if (language === LanguageEnum.ENG) {
              setLang(LanguageEnum.RUS);
            } else {
              setLang(LanguageEnum.ENG);
            }
          }}
        >
          Change language
        </Menu.Item>
        {isLogged ? (
          <Menu.Item
            key="/"
            onClick={() => {
              setIsLogged(false);
            }}
          >
            LogOut
            <Link to="/" />
          </Menu.Item>
        ) : (
          <Menu.Item key="/LogIn">
            {locales[language].logInLink}
            <Link to="/LogIn" />
          </Menu.Item>
        )}
        {!isLogged && (
          <Menu.Item key="/SignUp">
            {locales[language].signUpLink}
            <Link to="/SignUp" />
          </Menu.Item>
        )}
      </Menu>
    </>
  );
}
