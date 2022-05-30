import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHeaders } from '../../../helpers/helperFunctions/boardHelper';
import { URLs } from '../../../helpers/requestURLs';
import { IBoard, IBoardState, ICreateState, IDeleteState } from './boardsTypes';

const initialState: IBoardState = {
  boards: [] as IBoard[],
  error: '',
  loading: false,
};

const getBoards = createAsyncThunk<IBoard[], string, Record<never, string>>(
  'boards/getBoards',
  async (token) => {
    const response = await fetch(URLs.boards(), {
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

const createBoard = createAsyncThunk<IBoard, ICreateState, Record<never, string>>(
  'boards/createBoard',
  async (data) => {
    const { title, description, token } = data;
    const response = await fetch(URLs.boards(), {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({ title, description }),
    });
    if (response.ok) {
      return response.json();
    }
    const err = await response.json();
    throw new Error(err.message);
  }
);

const deleteBoard = createAsyncThunk<string, IDeleteState, Record<never, string>>(
  'boards/deleteBoard',
  async (data) => {
    const { id, token } = data;
    const response = await fetch(URLs.boards(id), {
      method: 'DELETE',
      headers: getHeaders(token),
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      return id;
    }
    const err = await response.json();
    throw new Error(err.message);
  }
);

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoards.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBoards.fulfilled, (state, action) => {
      state.loading = false;
      state.boards = action.payload;
      state.error = '';
    });
    builder.addCase(getBoards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(createBoard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.loading = false;
      state.boards = [...state.boards, action.payload];
      state.error = '';
    });
    builder.addCase(createBoard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(deleteBoard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      state.loading = false;
      state.boards = state.boards.filter((board) => board.id !== action.payload);
      state.error = '';
    });
    builder.addCase(deleteBoard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export const boardsReducers = boardsSlice.reducer;
export { getBoards, createBoard, deleteBoard };
