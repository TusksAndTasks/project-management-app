import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHeaders } from '../../../helpers/helperFunctions/boardHelper';
import { URLs } from '../../../helpers/requestURLs';
import { IColumn } from '../board/boardTypes';
import { IGetColumnData, IColumnState, ICreateColumnData, IDeleteColumnData } from './columnsTypes';

const initialState: IColumnState = {
  columns: [] as Array<IColumn>,
  loading: false,
  error: '',
};

const getColumnsThunk = createAsyncThunk<IColumn[], IGetColumnData, Record<never, string>>(
  'columns/getColumns',
  async (data) => {
    const { boardId, token } = data;
    const response = await fetch(URLs.columns(boardId), {
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

const createColumnThunk = createAsyncThunk<IColumn, ICreateColumnData, Record<never, string>>(
  'columns/createColumn',
  async (data) => {
    const { title, token, boardId } = data;
    const response = await fetch(URLs.columns(boardId), {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({ title }),
    });
    if (response.ok) {
      return response.json();
    }
    const err = await response.json();
    throw new Error(err.message);
  }
);

const deleteColumnThunk = createAsyncThunk<string, IDeleteColumnData, Record<never, string>>(
  'columns/deleteColumn',
  async (data) => {
    const { boardId, columnId, token } = data;
    const response = await fetch(URLs.columns(boardId, columnId), {
      method: 'DELETE',
      headers: getHeaders(token),
      body: JSON.stringify({ boardId, columnId }),
    });
    if (response.ok) {
      return columnId;
    }
    const err = await response.json();
    throw new Error(err.message);
  }
);
/* Нужно создать также редюсер апдейта, и изменять order параметр колонок после удаления.
Иначе можно удалить вторую из трех колонок, порядок поломается и создать новую не удастстся. */

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getColumnsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getColumnsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.columns = action.payload;
      state.error = '';
    });
    builder.addCase(getColumnsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(createColumnThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createColumnThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.columns = [...state.columns, action.payload];
      state.error = '';
    });
    builder.addCase(createColumnThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(deleteColumnThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteColumnThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.columns = state.columns.filter((column) => column.id !== action.payload);
      state.error = '';
    });
    builder.addCase(deleteColumnThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export const columnReducers = columnsSlice.reducer;
export { getColumnsThunk, createColumnThunk, deleteColumnThunk };
