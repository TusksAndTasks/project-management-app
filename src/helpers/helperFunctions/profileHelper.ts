import { locales } from '../../feature/signUp/locales';
import { ISignRules } from '../../feature/signUp/signUpFormTypes';
import { LanguageEnum } from '../../redux/slices/localization/localizationTypes';
import { ILogInCache } from './types';

export function profileHelp() {
  const cache = {} as ILogInCache;

  return (language: LanguageEnum) => {
    if (language in cache) {
      return cache[language];
    }

    const result = {
      nameList: {
        login: 'login',
        password: 'password',
        name: 'name',
        id: 'id',
        token: 'token',
      },

      ruleList: {
        name: [
          {
            required: true,
            message: locales[language].nameRequired,
          },
          {
            type: 'string',
            min: 3,
            message: locales[language].nameRequired,
          },
          {
            type: 'string',
            pattern: /^[a-z-\s]+$/i,
            message: locales[language].namePattern,
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
