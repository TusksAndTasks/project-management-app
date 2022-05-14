import './header.scss';
import { NavLink } from 'react-router-dom';
import { LanguageEnum } from '../../redux/slices/localization/localizationTypes';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';
import { useAuthToken } from '../../helpers/hooks/useAuthToken';

export default function Header() {
  const [language, setLang] = useLocales();
  const [, , deleteUserToken] = useAuthToken();

  return (
    <header>
      <NavLink to="/" className="header-link">
        {locales[language].mainLink}
      </NavLink>
      <NavLink to="/Profile" className="header-link">
        {locales[language].profileLink}
      </NavLink>
      <NavLink to="/LogIn" className="header-link">
        {locales[language].logInLink}
      </NavLink>
      <NavLink to="/SignUp" className="header-link">
        {locales[language].signUpLink}
      </NavLink>
      <button type="button" onClick={deleteUserToken}>
        {locales[language].signOut}
      </button>
      <button
        type="button"
        onClick={() => {
          if (language === LanguageEnum.ENG) {
            setLang(LanguageEnum.RUS);
          } else {
            setLang(LanguageEnum.ENG);
          }
        }}
      >
        Change language
      </button>
    </header>
  );
}
