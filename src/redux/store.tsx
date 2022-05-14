import { configureStore } from '@reduxjs/toolkit';
import { localizationReducers } from './slices/localization/localizationSlice';
import { signUpReducer } from './slices/signUp/signUpSlice';

const store = configureStore({
  reducer: {
    localization: localizationReducers,
    signUp: signUpReducer,
  },
});

export { store };
export type IState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
