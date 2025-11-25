import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------ CREATE REQUEST API ------------------
export const createRequest = createAsyncThunk(
  "requests/create",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:5000/requests/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed");
    }
  }
);

// ------------------ SLICE ------------------
const requestSlice = createSlice({
  name: "requests",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetRequestState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createRequest.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRequestState } = requestSlice.actions;
export default requestSlice.reducer;
