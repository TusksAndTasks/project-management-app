import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { localizationActions } from '../../redux/features/localization/localization-Slice';

export default function Header() {
  const language = useSelector((state: RootState) => state.localization.lang);
  const langDispatch = useDispatch() as AppDispatch;

  return (
    <header>
      <Link to="/" className="header-link">
        {language === 'eng' ? 'Main' : 'Главная'}
      </Link>
      <Link to="/Profile" className="header-link">
        {language === 'eng' ? 'Profile' : 'Профиль'}
      </Link>
      <Link to="/LogIn" className="header-link">
        {language === 'eng' ? 'Log In' : 'Вход'}
      </Link>
      <Link to="/SignUp" className="header-link">
        {language === 'eng' ? 'Sing Up' : 'Регистрация'}
      </Link>
      <button
        type="button"
        onClick={() => {
          if (language === 'eng') {
            langDispatch(localizationActions.setToRussian());
          } else {
            langDispatch(localizationActions.setToEnglish());
          }
        }}
      >
        Change language
      </button>
    </header>
  );
}
