import { ISignRules } from '../../feature/signUp/signUpFormTypes';
import { LanguageEnum } from '../../redux/slices/localization/localizationTypes';

export type ILogInCache = {
  [key in LanguageEnum]: {
    nameList: {
      login: string;
      password: string;
    };
    ruleList: ISignRules;
  };
};

export type ISignUpCache = {
  [key in LanguageEnum]: {
    nameList: {
      name: string;
      login: string;
      password: string;
    };
    ruleList: ISignRules;
  };
};
