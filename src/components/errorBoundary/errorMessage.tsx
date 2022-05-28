import React from 'react';
import { locales } from './locales';
import { useLocales } from '../../helpers/hooks/useLocales';

export default function ErrorMessage() {
  const [language] = useLocales();

  return <div>{locales[language].errorMessage}</div>;
}
