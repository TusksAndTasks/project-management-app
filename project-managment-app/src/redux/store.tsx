import { configureStore } from '@reduxjs/toolkit';
import { localizationReducers } from './features/localization/localization-Slice';

const store = configureStore({
  reducer: {
    localization: localizationReducers,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
