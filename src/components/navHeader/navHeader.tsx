import './navHeader.scss';
import { Link } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { LanguageEnum } from '../../redux/slices/localization/localizationTypes';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';

export default function NavHeader() {
  const { Header } = Layout;
  const [language, setLang] = useLocales();

  return (
    <Header>
      <Menu defaultSelectedKeys={['/People']} mode="horizontal">
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
        <Menu.Item key="/Profile">
          {locales[language].profileLink}
          <Link to="/Profile" />
        </Menu.Item>
        <Menu.Item key="/LogIn">
          {locales[language].logInLink}
          <Link to="/LogIn" />
        </Menu.Item>
        <Menu.Item key="/SignUp">
          {locales[language].signUpLink}
          <Link to="/SignUp" />
        </Menu.Item>
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
      </Menu>
    </Header>
  );
}
