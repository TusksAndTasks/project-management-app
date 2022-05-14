import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IBoard, IBoardState } from './boardsTypes';

const initialState: IBoardState = {
  boards: [] as IBoard[],
  error: '',
  loading: false,
};

const getBoards = createAsyncThunk('boards/getBoards', async (token: string) => {
  const response = await fetch(
    'https://cors-anywhere.herokuapp.com/http://88.99.225.196:4000/boards',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  if (response.ok) {
    return response.json();
  }
  const err = await response.json();
  throw new Error(err.message);
});

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
    });
    builder.addCase(getBoards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export const boardsReducers = boardsSlice.reducer;
export { getBoards };
