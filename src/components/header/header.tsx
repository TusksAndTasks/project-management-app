import './header.scss';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IState } from '../../redux/store';
import { setLanguages } from '../../redux/slices/localization/localizationSlice';
import { LanguageEnum } from '../../redux/slices/localization/localizationTypes';
import localizationFile from '../../services/localization/localizationFile';

export default function Header() {
  const language = useSelector((state: IState) => state.localization.lang as LanguageEnum);
  const dispatch = useDispatch() as AppDispatch;

  return (
    <header>
      <NavLink to="/" className="header-link">
        {localizationFile[language].header.mainLink}
      </NavLink>
      <NavLink to="/Profile" className="header-link">
        {localizationFile[language].header.profileLink}
      </NavLink>
      <NavLink to="/LogIn" className="header-link">
        {localizationFile[language].header.logInLink}
      </NavLink>
      <NavLink to="/SignUp" className="header-link">
        {localizationFile[language].header.signUpLink}
      </NavLink>
      <button
        type="button"
        onClick={() => {
          if (language === 'English') {
            dispatch(setLanguages(LanguageEnum.RUS));
          } else {
            dispatch(setLanguages(LanguageEnum.ENG));
          }
        }}
      >
        Change language
      </button>
    </header>
  );
}
