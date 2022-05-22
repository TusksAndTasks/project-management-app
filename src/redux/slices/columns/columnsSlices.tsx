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

const getColumns = createAsyncThunk<IColumn[], IGetColumnData, Record<never, string>>(
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

const createColumn = createAsyncThunk<IColumn, ICreateColumnData, Record<never, string>>(
  'columns/createColumn',
  async (data) => {
    const { title, order, token, boardId } = data;
    const response = await fetch(URLs.columns(boardId), {
      method: 'POST',
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

const deleteColumn = createAsyncThunk<string, IDeleteColumnData, Record<never, string>>(
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
    builder.addCase(getColumns.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getColumns.fulfilled, (state, action) => {
      state.loading = false;
      state.columns = action.payload;
      state.error = '';
    });
    builder.addCase(getColumns.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(createColumn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createColumn.fulfilled, (state, action) => {
      state.loading = false;
      state.columns = [...state.columns, action.payload];
      state.error = '';
    });
    builder.addCase(createColumn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(deleteColumn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteColumn.fulfilled, (state, action) => {
      state.loading = false;
      state.columns = state.columns.filter((column) => column.id !== action.payload);
      state.error = '';
    });
    builder.addCase(deleteColumn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export const columnReducers = columnsSlice.reducer;
export { getColumns, createColumn, deleteColumn };
