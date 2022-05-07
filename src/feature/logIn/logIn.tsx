import { useSelector } from 'react-redux';
import { IState } from '../../redux/store';
import localizationFile from '../../services/localization/localizationFile';
import { LanguageEnum } from '../../redux/slices/localization/localizationTypes';

export default function LogIn() {
  const language = useSelector((state: IState) => state.localization.lang as LanguageEnum);
  return <div>{localizationFile[language].logIn.title}</div>;
}
