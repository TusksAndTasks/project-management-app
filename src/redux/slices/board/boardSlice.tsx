import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHeaders } from '../../../helpers/helperFunctions/boardHelper';
import { URLs } from '../../../helpers/requestURLs';
import { ICurrentBoard, ICurrentBoardState, IShowState } from './boardTypes';

const initialState: ICurrentBoardState = {
  currentBoard: {} as ICurrentBoard,
  error: '',
  loading: false,
};

const showBoard = createAsyncThunk<ICurrentBoard, IShowState, Record<never, string>>(
  'boards/showBoard',
  async (data) => {
    const { id, token } = data;
    const response = await fetch(URLs.boards(id), {
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

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(showBoard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(showBoard.fulfilled, (state, action) => {
      state.loading = false;
      state.currentBoard = action.payload;
      state.error = '';
    });
    builder.addCase(showBoard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export const boardReducers = boardSlice.reducer;
export { showBoard };
