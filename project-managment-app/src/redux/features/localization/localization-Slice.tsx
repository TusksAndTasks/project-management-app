import { createSlice } from '@reduxjs/toolkit';

const initialLocalizationState = {
  lang: 'eng',
};

const localizationSlice = createSlice({
  name: 'localization',
  initialState: initialLocalizationState,
  reducers: {
    setToRussian: (state) => {
      state.lang = 'rus';
    },
    setToEnglish: (state) => {
      state.lang = 'eng';
    },
  },
});

export const localizationReducers = localizationSlice.reducer;
export const localizationActions = localizationSlice.actions;
