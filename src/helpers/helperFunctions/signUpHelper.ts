import { locales } from '../../feature/signUp/locales';
import { ISignRules } from '../../feature/signUp/signUpFormTypes';
import { LanguageEnum } from '../../redux/slices/localization/localizationTypes';
import { ISignUpCache } from './helperTypes';

export function signUpHelp() {
  const cache = {} as ISignUpCache;

  return (language: LanguageEnum) => {
    if (language in cache) {
      return cache[language];
    }

    const result = {
      nameList: {
        name: 'name',
        login: 'login',
        password: 'password',
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
