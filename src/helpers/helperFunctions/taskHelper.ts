import { locales } from '../../components/taskForm/locales';
import { ITaskRules } from '../../components/taskForm/taskFormTypes';
import { LanguageEnum } from '../../redux/slices/localization/localizationTypes';
import { ITaskCache } from './types';

export function taskHelp() {
  const cache = {} as ITaskCache;

  return (language: LanguageEnum) => {
    if (language in cache) {
      return cache[language];
    }

    const result = {
      nameList: {
        title: 'title',
        description: 'description',
      },

      ruleList: {
        title: [
          {
            required: true,
            message: locales[language].titleRequired,
          },
        ],
        description: [
          {
            required: true,
            message: locales[language].descriptionRequired,
          },
        ],
      } as ITaskRules,
    };
    cache[language] = result;
    return result;
  };
}
