import { Rule } from 'antd/lib/form';
import { locales } from '../../components/boardCreatorForm.tsx/locales';
import { LanguageEnum } from '../../redux/slices/localization/localizationTypes';
import { IBoardCache } from './types';

export function boardCreationHelp() {
  const cache = {} as IBoardCache;

  return (language: LanguageEnum) => {
    if (language in cache) {
      return cache[language];
    }

    const result = [
      {
        rules: [
          {
            required: true,
            message: locales[language].titleRequired,
          },
        ] as Rule[],
        name: 'title',
        label: locales[language].title,
      },
      {
        rules: [
          {
            required: true,
            message: locales[language].descriptionRequired,
          },
        ] as Rule[],
        name: 'description',
        label: locales[language].description,
      },
    ];

    cache[language] = result;
    return result;
  };
}

export function getHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
}
