import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHeaders } from '../../../helpers/helperFunctions/boardHelper';
import { determineDirection } from '../../../helpers/helperFunctions/updateHelper';
import { URLs } from '../../../helpers/requestURLs';
import { IColumn } from '../board/boardTypes';
import {
  IGetColumnData,
  IColumnState,
  ICreateColumnData,
  IDeleteColumnData,
  IUpdateColumnData,
} from './columnsTypes';

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

const updateColumnThunk = createAsyncThunk<IColumn, IUpdateColumnData, Record<never, string>>(
  'columns/updateColumn',
  async (data) => {
    const { boardId, columnId, token, title, order } = data;
    const response = await fetch(URLs.columns(boardId, columnId), {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify({ title, order }),
    });
    if (response.ok) {
      return response.json();
    }
    const err = await response.json();
    throw new Error(err.message);
  }
);

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
      state.columns = action.payload.sort((a, b) => a.order - b.order);
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
    builder.addCase(updateColumnThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateColumnThunk.fulfilled, (state, action) => {
      const { order, id } = action.payload;
      const direction = determineDirection(order, id, state.columns, 'column');

      state.columns = state.columns
        .map((column) => {
          if (column.id === id) {
            return action.payload;
          }
          if (direction === 'up' && column.order >= order) {
            column.order += 1;
          }
          if (direction === 'down' && column.order <= order) {
            column.order -= 1;
          }
          return column;
        })
        .sort((a, b) => a.order - b.order);
      state.loading = false;
      state.error = '';
    });
    builder.addCase(updateColumnThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export const columnReducers = columnsSlice.reducer;
export { getColumnsThunk, createColumnThunk, deleteColumnThunk, updateColumnThunk };
