import { useDispatch, useSelector } from 'react-redux';
import { setLanguages } from '../../redux/slices/localization/localizationSlice';
import { LanguageEnum } from '../../redux/slices/localization/localizationTypes';
import { AppDispatch, IState } from '../../redux/store';

export function useLocales(): [LanguageEnum, (locale: LanguageEnum) => void] {
  const language = useSelector((state: IState) => state.localization.lang as LanguageEnum);
  const dispatch = useDispatch() as AppDispatch;

  const setLang = (locale: LanguageEnum) => {
    dispatch(setLanguages(locale));
  };

  return [language, setLang];
}
