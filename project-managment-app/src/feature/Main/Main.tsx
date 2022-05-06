import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import placeholder from '../../assets/img/placeholder.jpg';

export default function Main() {
  const language = useSelector((state: RootState) => state.localization.lang);

  return (
    <div>
      <div>{language === 'eng' ? 'Main page' : 'Главная'}</div>
      <img src={placeholder} alt="placeholder" />
    </div>
  );
}
