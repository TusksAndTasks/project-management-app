import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISignUpData, ISignUpResponse, ISignUpState } from './singUpTypes';

const initialState: ISignUpState = {
  loading: false,
  userData: {} as ISignUpResponse,
  error: '',
};

const createUser = createAsyncThunk<ISignUpResponse, ISignUpData, Record<string, never>>(
  'signUp/createUser',
  async (data: ISignUpData) => {
    const response = await fetch('http://88.99.225.196:4000/signup', {
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
    /* по идее если респонс не ок, должна автоматически выбрасываться ошибка и прерывать createUser.
    Но почему-то вся эта история спокойнейшим образом умудряется завершиться .json'ом ошибки.
    Так что rejected кейс не работает, если не ловить респонс не ok-статуса и не кидать ошибку */
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
