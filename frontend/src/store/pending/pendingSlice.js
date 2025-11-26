// src/redux/slices/pendingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/index.js"
import axios from "axios";

// ---------- API CALL ----------
export const fetchPendingRequests = createAsyncThunk(
    "pending/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token"); // ⬅️ Get JWT token

            const res = await axios.get(
                `${BASE_URL}/requests/pending`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  // ⬅️ Pass token
                    },
                }
            );

            return res.data.data; // array
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);


// ---- APPROVE ----
export const approveRequest = createAsyncThunk(
    "request/approve",
    async ({ id, comment }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.patch(
                `${BASE_URL}/requests/${id}/approve`,
                { comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ---- REJECT ----
export const rejectRequest = createAsyncThunk(
    "request/reject",
    async ({ id, comment }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.patch(
                `${BASE_URL}/requests/${id}/reject`,
                { comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)


const pendingSlice = createSlice({
    name: "pending",
    initialState: {
        list: [],
        loading: false,
        error: null,
        success: null,
        message: ""
    },

    extraReducers: (builder) => {
        builder
            // -------------------------
            // FETCH PENDING REQUESTS
            // -------------------------
            .addCase(fetchPendingRequests.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPendingRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchPendingRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // -------------------------
            // APPROVE REQUEST
            // -------------------------

            .addCase(approveRequest.pending, (state) => {
                state.loading = true;
                state.success = null;
                state.error = null;
                state.message = null;
            })
            .addCase(approveRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = action.payload?.message || "Approved";
            })
            .addCase(approveRequest.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = true;
                state.message = action.payload?.message || "Failed to approve";
            })

            // -------------------------
            // REJECT REQUEST
            // -------------------------
            .addCase(rejectRequest.pending, (state) => {
                state.loading = true;
                state.success = null;
                state.error = null;
                state.message = null;
            })
            .addCase(rejectRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = action.payload?.message || "Approved";
            })
            .addCase(rejectRequest.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = true;
                state.message = action.payload?.message || "Failed to approve";
            });
    },
});

export default pendingSlice.reducer;
