import { createSlice } from '@reduxjs/toolkit';
import { getCookie } from '../../../helpers/helperFunctions/authHelper';

const initialState: { token: string } = {
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state) => {
      const token = getCookie('login');
      if (token) {
        state.token = token;
      } else {
        state.token = '';
      }
    },
    deleteAuthToken: (state) => {
      document.cookie = `${encodeURIComponent('login')}=${encodeURIComponent('')}`;
      state.token = '';
    },
  },
});

export const authReducers = authSlice.reducer;
export const { setAuthToken, deleteAuthToken } = authSlice.actions;
