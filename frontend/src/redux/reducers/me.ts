import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { endpoints } from '../../shared/constants';
import { UserProfile } from '../../shared/types';

const initialState: {
  loading: boolean;
  user: UserProfile | null;
} = {
  loading: false,
  user: null,
};

export const userMe = createAsyncThunk(
  'auth/me',
  async (object, { rejectWithValue }) => {
    try {
      const response = await axios.get(endpoints.ME);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const meSlice = createSlice({
  name: 'auth/me',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userMe.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userMe.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
    builder.addCase(userMe.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default meSlice.reducer;
