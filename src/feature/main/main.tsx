import { useSelector } from 'react-redux';
import { IState } from '../../redux/store';
import placeholder from '../../assets/img/placeholder.jpg';
import { LanguageEnum } from '../../redux/slices/localization/localizationTypes';
import { locales } from './locales';

export default function Main() {
  const language = useSelector((state: IState) => state.localization.lang as LanguageEnum);

  return (
    <div>
      <div>{locales[language].title}</div>
      <img src={placeholder} alt="placeholder" />
    </div>
  );
}
