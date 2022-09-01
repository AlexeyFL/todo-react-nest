import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ITask } from '../../types/task';
import { ITodoResponse } from '../../types/todo';
import customFetch from '../../utils/axios';
import { RootState } from '../store';

interface ITaskState {
  isLoading: boolean;
  tasks: ITask[];
  error: any;
  currentTask: ITodoResponse | null | undefined;
}

const initialState: ITaskState = {
  isLoading: false,
  tasks: [],
  error: null,
  currentTask: null,
};

export const getTasks = createAsyncThunk<any, void, { state: RootState }>(
  'task/getTasks',
  async (_, thunkApi) => {
    let url = '/tasks';
    try {
      const token = thunkApi.getState().user.user?.token;
      const response = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err: any) {
      thunkApi.rejectWithValue(err.response.data.message);
    }
  }
);

export const createTask = createAsyncThunk<any, any, { state: RootState }>(
  'task/createTask',
  async (task: ITask, thunkApi) => {
    let url = '/tasks';
    try {
      const token = thunkApi.getState().user.user?.token;
      const response = await customFetch.post(url, task, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      thunkApi.dispatch(getTasks());
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteTask = createAsyncThunk<any, any, { state: RootState }>(
  'task/deleteTask',
  async (taskId: number, thunkApi) => {
    let url = '/tasks';
    try {
      const token = thunkApi.getState().user.user?.token;
      const response = await customFetch.delete(`${url}/${taskId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      thunkApi.dispatch(getTasks());
      return response.data;
    } catch (err: any) {
      thunkApi.rejectWithValue(err.response.data.message);
    }
  }
);

export const completeTask = createAsyncThunk<any, any, { state: RootState }>(
  'task/completeTask',
  async (taskId: number, thunkApi) => {
    let url = '/tasks';
    try {
      const token = thunkApi.getState().user.user?.token;
      const response = await customFetch.post(
        `${url}/${taskId}/complete`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      thunkApi.dispatch(getTasks());
      return response.data;
    } catch (err: any) {
      thunkApi.rejectWithValue(err.response.data.message);
    }
  }
);

export const updateTask = createAsyncThunk<any, any, { state: RootState }>(
  'task/completeTask',
  async ({ taskId, text }, thunkApi) => {
    let url = '/tasks';
    try {
      const token = thunkApi.getState().user.user?.token;
      const response = await customFetch.put(
        `${url}/${taskId}`,
        { text },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      thunkApi.dispatch(getTasks());
      return response.data;
    } catch (err: any) {
      thunkApi.rejectWithValue(err.response.data.message);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentTask: (
      state,
      action: PayloadAction<ITodoResponse | undefined>
    ) => {
      state.currentTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.tasks = [];
        state.error = action.payload;
        toast.error(state.error);
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(state.error);
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(state.error);
      })
      .addCase(completeTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(completeTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(state.error);
      });
  },
});

export const { setCurrentTask } = taskSlice.actions;

export default taskSlice.reducer;
