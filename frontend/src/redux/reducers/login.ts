import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { endpoints } from '../../shared/constants';
import { LoginPayload, UserAfterLogin } from '../../shared/types';

const initialState: {
  loading: boolean;
  user: UserAfterLogin | null;
} = {
  loading: false,
  user: null,
};

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        endpoints.LOGIN,
        JSON.stringify({ email, password }),
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const loginSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
