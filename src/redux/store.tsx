import { configureStore } from '@reduxjs/toolkit';
import { localizationReducers } from './slices/localization/localizationSlice';

const store = configureStore({
  reducer: {
    localization: localizationReducers,
  },
});

export { store };
export type IState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
