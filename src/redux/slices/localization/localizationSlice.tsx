import { createSlice } from '@reduxjs/toolkit';
import { ILanguage } from './localizationTypes';

const initialState = {
  lang: 'English',
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
