import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { endpoints } from '../../shared/constants';
import { RegisterPayload, SuccessfullyCreated } from '../../shared/types';

const initialState: {
  loading: boolean;
  result: SuccessfullyCreated | null;
} = {
  loading: false,
  result: null,
};

export const userRegister = createAsyncThunk(
  'auth/register',
  async (registerPayload: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        endpoints.REGISTER,
        JSON.stringify(registerPayload),
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const registerSlice = createSlice({
  name: 'auth/register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.result = payload;
    });
    builder.addCase(userRegister.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default registerSlice.reducer;
