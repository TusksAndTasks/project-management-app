import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { URLs } from '../../../helpers/requestURLs';
import { getHeaders } from '../../../helpers/helperFunctions/boardHelper';
import { IUserDeleteState, IUsersState } from './usersTypes';
import { IUserData } from '../user/userTypes';

const initialState: IUsersState = {
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

const deleteUser = createAsyncThunk<string, IUserDeleteState, Record<never, string>>(
  'users/deleteUser',
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
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.error = '';
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export const usersReducers = usersSlice.reducer;
export { getUsers, deleteUser };
