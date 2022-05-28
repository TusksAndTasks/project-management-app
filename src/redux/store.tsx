import { configureStore } from '@reduxjs/toolkit';
import { authReducers } from './slices/authentication/authSlice';
import { boardReducers } from './slices/board/boardSlice';
import { boardsReducers } from './slices/boards/boardsSlice';
import { columnReducers } from './slices/columns/columnsSlices';
import { localizationReducers } from './slices/localization/localizationSlice';
import { logInReducer } from './slices/logIn/logInSlice';
import { signUpReducer } from './slices/signUp/signUpSlice';
import { tasksReducers } from './slices/tasks/tasksSlice';
import { usersReducers } from './slices/users/usersSlice';

const store = configureStore({
  reducer: {
    localization: localizationReducers,
    signUp: signUpReducer,
    logIn: logInReducer,
    auth: authReducers,
    boards: boardsReducers,
    board: boardReducers,
    columns: columnReducers,
    tasks: tasksReducers,
    users: usersReducers,
  },
});

export { store };
export type IState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
