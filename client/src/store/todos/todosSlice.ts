import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store/store';
import { ITodo, ITodoResponse } from '../../types/todo';
import { todos } from '../../data';

export interface ITodosState {
  isLoading: boolean;
  todos: ITodoResponse[];
  currentTodo: ITodoResponse | null | undefined;
}

const initialState: ITodosState = {
  isLoading: false,
  todos: todos,
  currentTodo: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodoResponse>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    completeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          todo.complete = !todo.complete;
          return todo;
        }
        return todo;
      });
    },
    editTodo: (
      state,
      action: PayloadAction<{ todoId: number; text: string }>
    ) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          todo.text = action.payload.text;
        }
        return todo;
      });
    },
    setCurrentTodo: (state, action: PayloadAction<ITodoResponse | undefined>) => {
      state.currentTodo = action.payload;
    },
  },
});

export const { addTodo, removeTodo, setCurrentTodo, editTodo, completeTodo } =
  todosSlice.actions;

export default todosSlice.reducer;
