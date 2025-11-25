// authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupApi, signinApi } from "../../api/authApi";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await signupApi(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

//"auth/signinUser"
export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await signinApi(formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signin failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ---------- SIGNUP ----------
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------- SIGNIN ----------
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
