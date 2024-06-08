import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { endpoints } from "../../shared/constants";
import { UserAfterLogin } from "../../shared/interfaces";

const initialState: {
  loading: boolean;
  user: UserAfterLogin | null;
} = {
  loading: false,
  user: null,
};

type LoginPayload = {
  email: string;
  password: string;
};

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        endpoints.LOGIN,
        JSON.stringify({ email, password })
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
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

export const { logout } = authSlice.actions;

export default authSlice.reducer;
