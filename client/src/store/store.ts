import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../components/counter/counterSlice';
import todosReducer from './todos/todosSlice';
import userReducer from './user/userSlice';
import tasksReducer from './tasks/taskSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    user: userReducer,
    tasks: tasksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
