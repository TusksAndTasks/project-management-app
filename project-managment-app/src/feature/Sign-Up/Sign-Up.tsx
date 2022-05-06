import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function SignUp() {
  const language = useSelector((state: RootState) => state.localization.lang);
  return <div>{language === 'eng' ? 'Sing Up page' : 'Страница регистрации'}</div>;
}
