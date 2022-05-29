import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHeaders } from '../../../helpers/helperFunctions/boardHelper';
import { URLs } from '../../../helpers/requestURLs';
import {
  ICreateTaskData,
  IDeleteReturn,
  IDeleteTaskData,
  IFullTask,
  IGetTasksData,
  IRemoveTaskData,
  ITasksState,
  IUpdateTaskData,
} from './tasksTypes';

const initialState: ITasksState = {
  tasks: {},
  loading: false,
  error: '',
};

const getTasks = createAsyncThunk<IFullTask[], IGetTasksData, Record<never, string>>(
  'tasks/getTasks',
  async (data) => {
    const { token, boardId, columnId } = data;
    const response = await fetch(URLs.tasks(boardId, columnId), {
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

const createTask = createAsyncThunk<IFullTask, ICreateTaskData, Record<never, string>>(
  'tasks/createTask',
  async (data) => {
    const { token, boardId, columnId, body } = data;
    const response = await fetch(URLs.tasks(boardId, columnId), {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(body),
    });
    if (response.ok) {
      return response.json();
    }
    const err = await response.json();
    throw new Error(err.message);
  }
);

const deleteTask = createAsyncThunk<IDeleteReturn, IDeleteTaskData, Record<never, string>>(
  'tasks/deleteTask',
  async (data) => {
    const { boardId, columnId, taskId, token } = data;
    const response = await fetch(URLs.tasks(boardId, columnId, taskId), {
      method: 'DELETE',
      headers: getHeaders(token),
      body: JSON.stringify({ boardId, columnId, taskId }),
    });
    if (response.ok) {
      return { taskId, columnId };
    }
    const err = await response.json();
    throw new Error(err.message);
  }
);

const updateTask = createAsyncThunk<IFullTask, IUpdateTaskData, Record<never, string>>(
  'tasks/updateTask',
  async (data) => {
    const { boardId, columnId, taskId, token, body, newColumn } = data;
    const response = await fetch(URLs.tasks(boardId, columnId, taskId), {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify({ boardId, ...body, columnId: newColumn }),
    });
    if (response.ok) {
      return response.json();
    }
    const err = await response.json();
    throw new Error(err.message);
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    removeTask: (state, action: IRemoveTaskData) => {
      const { columnId, taskId } = action.payload;
      state.tasks[columnId] = state.tasks[columnId].filter((task) => task.id !== taskId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.length > 0) {
        state.tasks[action.payload[0].columnId] = action.payload.sort((a, b) => a.order - b.order);
      }
      state.error = '';
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(createTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.loading = false;
      if (state.tasks[action.payload.columnId]) {
        state.tasks[action.payload.columnId] = [
          ...(state.tasks[action.payload.columnId] as IFullTask[]),
          action.payload,
        ];
      } else {
        state.tasks[action.payload.columnId] = [action.payload];
      }
      state.error = '';
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const { taskId, columnId } = action.payload;
      state.loading = false;
      state.tasks[columnId] = state.tasks[columnId].filter((task) => task.id !== taskId);
      state.error = '';
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(updateTask.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const { id, columnId, order } = action.payload;
      let direction = 'new';
      state.tasks[columnId].map((task) => {
        if (task.id === id) {
          direction = task.order > order ? 'up' : 'down';
        }
        return task;
      });

      if (direction === 'new') {
        state.tasks[columnId] = [...state.tasks[columnId], action.payload];
      }

      state.tasks[columnId] = state.tasks[columnId]
        .map((task) => {
          if (task.id === id) {
            return action.payload;
          }
          if ((direction === 'up' || direction === 'new') && task.order >= order) {
            task.order += 1;
          }
          if (direction === 'down' && task.order <= order) {
            task.order -= 1;
          }
          return task;
        })
        .sort((a, b) => a.order - b.order);
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export const tasksReducers = tasksSlice.reducer;
export const { removeTask } = tasksSlice.actions;
export { getTasks, createTask, deleteTask, updateTask };
