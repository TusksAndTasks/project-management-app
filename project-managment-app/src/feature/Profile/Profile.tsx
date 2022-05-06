import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function Profile() {
  const language = useSelector((state: RootState) => state.localization.lang);

  return <div>{language === 'eng' ? 'Profile page' : 'Страница профиля'}</div>;
}
