import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function LogIn() {
  const language = useSelector((state: RootState) => state.localization.lang);
  return <div>{language === 'eng' ? 'Log In page' : 'Страница авторизации'}</div>;
}
