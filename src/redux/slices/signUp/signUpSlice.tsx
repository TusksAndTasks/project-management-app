import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { URLs } from '../../../helpers/requestURLs';
import { ISignUpData, ISignUpResponse, ISignUpState } from './singUpTypes';

const initialState: ISignUpState = {
  loading: false,
  userData: {} as ISignUpResponse,
  error: '',
};

const createUser = createAsyncThunk<ISignUpResponse, ISignUpData, Record<string, never>>(
  'signUp/createUser',
  async (data) => {
    const response = await fetch(URLs.signUp, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return response.json();
    }
    const err = await response.json();
    throw new Error(err.message);
  }
);

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.error = '';
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.userData = {} as ISignUpResponse;
      state.error = action.error.message as string;
    });
  },
});

export const signUpReducer = signUpSlice.reducer;
export { createUser };
