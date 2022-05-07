import { useSelector } from 'react-redux';
import { IState } from '../../redux/store';
import placeholder from '../../assets/img/placeholder.jpg';
import localizationFile from '../../services/localization/localizationFile';
import { LanguageEnum } from '../../redux/slices/localization/localizationTypes';

export default function Main() {
  const language = useSelector((state: IState) => state.localization.lang as LanguageEnum);

  return (
    <div>
      <div>{localizationFile[language].main.title}</div>
      <img src={placeholder} alt="placeholder" />
    </div>
  );
}
