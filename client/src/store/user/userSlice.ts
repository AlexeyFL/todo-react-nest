import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import storageService from '../../utils/localStorage';
import { IUser } from '../../types/user';
import customFetch from '../../utils/axios';

interface IUserState {
  isLoading: boolean;
  user: null | IUser;
  error: any;
}

const initialState: IUserState = {
  isLoading: false,
  user: storageService.getFromStorage(),
  error: null,
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user: IUser, thunkApi) => {
    try {
      const response = await customFetch.post('/users/register', user);
      return response.data;
    } catch (err:any) {
      return thunkApi.rejectWithValue(err.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user: IUser, thunkApi) => {
    try {
      const response = await customFetch.post('/users/login', user);
      return response.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      storageService.removeFromStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.isLoading = false;
        state.user = user;
        storageService.addToStorage(user);
        toast.success('Hello there ' + user.username);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload;
        toast.error(state.error);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.isLoading = false;
        state.user = user;
        storageService.addToStorage(user);
        toast.success('Welcome back ' + user.username);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload;
        toast.error(state.error);
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
