import { locales } from '../../feature/logIn/locales';
import { ISignRules } from '../../feature/signUp/signUpFormTypes';
import { LanguageEnum } from '../../redux/slices/localization/localizationTypes';
import { ILogInCache } from './types';

export function logInHelp() {
  const cache = {} as ILogInCache;

  return (language: LanguageEnum) => {
    if (language in cache) {
      return cache[language];
    }

    const result = {
      nameList: {
        login: 'login',
        password: 'password',
      },

      ruleList: {
        login: [
          {
            required: true,
            message: locales[language].loginRequired,
          },
          {
            type: 'string',
            min: 8,
            message: locales[language].loginMin,
          },
          {
            type: 'string',
            pattern: /^[\w/S@]+$/i,
            message: locales[language].loginPattern,
          },
        ],
        password: [
          {
            required: true,
            message: locales[language].passwordRequired,
          },
          {
            type: 'string',
            min: 8,
            message: locales[language].passwordMin,
          },
          {
            type: 'string',
            pattern: /^[a-z0-9!@"#^&*§$%&_()=?/+-]+$/i,
            message: locales[language].passwordPattern,
          },
        ],
      } as ISignRules,
    };
    cache[language] = result;
    return result;
  };
}
