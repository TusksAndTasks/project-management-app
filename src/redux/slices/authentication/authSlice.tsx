import { createSlice } from '@reduxjs/toolkit';

const initialState: { token: string } = {
  token: '',
};

function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`)
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
} // https://learn.javascript.ru/cookie

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
