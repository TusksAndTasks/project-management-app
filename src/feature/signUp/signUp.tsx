import { useSelector } from 'react-redux';
import { IState } from '../../redux/store';
import { LanguageEnum } from '../../redux/slices/localization/localizationTypes';
import { locales } from './locales';

export default function SignUp() {
  const language = useSelector((state: IState) => state.localization.lang as LanguageEnum);
  return <div>{locales[language].title}</div>;
}
