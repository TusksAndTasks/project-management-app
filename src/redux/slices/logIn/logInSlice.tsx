import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ILogInData, ILogInResponse, ILogInState } from './logInTypes';

const initialState: ILogInState = {
  loading: false,
  error: '',
};

const logUser = createAsyncThunk<ILogInResponse, ILogInData, Record<string, never>>(
  'logIn/logUser',
  async (data) => {
    const response = await fetch(
      'https://cors-anywhere.herokuapp.com/http://88.99.225.196:4000/signin',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      return response.json();
    }
    const err = await response.json();
    throw new Error(err.message);
  }
);

const logInSlice = createSlice({
  name: 'logIn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logUser.fulfilled, (state, action) => {
      document.cookie = `${encodeURIComponent('login')}=${encodeURIComponent(
        action.payload.token
      )}`;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(logUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export const logInReducer = logInSlice.reducer;
export { logUser };
