import { createSlice } from '@reduxjs/toolkit';
import { ILanguage, LanguageEnum } from './localizationTypes';

const initialState: { lang: LanguageEnum } = {
  lang: LanguageEnum.ENG,
};

const localizationSlice = createSlice({
  name: 'localization',
  initialState,
  reducers: {
    setLanguages: (state, action: ILanguage) => {
      state.lang = action.payload;
    },
  },
});

export const localizationReducers = localizationSlice.reducer;
export const { setLanguages } = localizationSlice.actions;
