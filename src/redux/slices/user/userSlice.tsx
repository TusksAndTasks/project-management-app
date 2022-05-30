import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { URLs } from '../../../helpers/requestURLs';
import { getHeaders } from '../../../helpers/helperFunctions/boardHelper';
import { IUserData, IUserShowState, IUserState, IUserUpdateState } from './userTypes';
import { IUserDeleteState } from '../users/usersTypes';

const initialState: IUserState = {
  user: {} as IUserData,
  error: '',
  loading: false,
};

const getUser = createAsyncThunk<IUserData, IUserShowState, Record<never, string>>(
  'user/getUsers',
  async (data) => {
    const { id, token } = data;
    const response = await fetch(URLs.users(id), {
      method: 'GET',
      headers: getHeaders(token),
    });
    if (response.ok) {
      return response.json();
    }
    const err = await response.json();
    throw new Error(err.message);
  }
);

const updateUser = createAsyncThunk<IUserData, IUserUpdateState, Record<never, string>>(
  'user/updateUser',
  async (data) => {
    const { id, token, name, login, password } = data;
    const response = await fetch(URLs.users(id), {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify({ name, login, password }),
    });
    if (response.ok) {
      return response.json();
    }
    const err = await response.json();
    throw new Error(err.message);
  }
);

const deleteUser = createAsyncThunk<string, IUserDeleteState, Record<never, string>>(
  'user/deleteUser',
  async (data) => {
    const { id, token } = data;
    const response = await fetch(URLs.users(id), {
      method: 'DELETE',
      headers: getHeaders(token),
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      return response.json();
    }
    const err = await response.json();
    throw new Error(err.message);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = '';
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.loading = false;
      state.user = {} as IUserData;
      state.error = '';
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export const userReducers = userSlice.reducer;
export { getUser, updateUser, deleteUser };
