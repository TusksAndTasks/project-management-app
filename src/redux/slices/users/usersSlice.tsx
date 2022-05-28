import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { URLs } from '../../../helpers/requestURLs';
import { getHeaders } from '../../../helpers/helperFunctions/boardHelper';
import { IUserData, IUserDeleteState, IUserState, IUserUpdateState } from './usersTypes';

const initialState: IUserState = {
  users: [] as IUserData[],
  error: '',
  loading: false,
};

const getUsers = createAsyncThunk<IUserData[], string, Record<never, string>>(
  'users/getUsers',
  async (token) => {
    const response = await fetch(URLs.users(), {
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

const updateUser = createAsyncThunk<string, IUserUpdateState, Record<never, string>>(
  'users/updateUser',
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
  'users/deleteUser',
  async (data) => {
    const { id, token } = data;
    const response = await fetch(URLs.users(id), {
      method: 'DELETE',
      headers: getHeaders(token),
    });
    if (response.ok) {
      return response.json();
    }
    const err = await response.json();
    throw new Error(err.message);
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = '';
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export const usersReducers = usersSlice.reducer;
export { getUsers, updateUser, deleteUser };
