// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // ------------------ CREATE REQUEST API ------------------
// export const createRequest = createAsyncThunk(
//   "requests/create",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.post("http://localhost:5000/requests/", payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.error || "Failed");
//     }
//   }
// );


// export const fetchMyRequests = createAsyncThunk(
//   "requests/fetchMyRequests",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get("http://localhost:5000/requests/my", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       return res.data; // this is your array of requests
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.error || "Failed to load requests");
//     }
//   }
// );


// // ------------------ SLICE ------------------
// const requestSlice = createSlice({
//   name: "requests",
//   initialState: {
//     loading: false,
//     error: null,
//     success: false,
//     list: []
//   },
//   reducers: {
//     resetRequestState: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createRequest.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(createRequest.fulfilled, (state) => {
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(createRequest.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//       // -------- FETCH MY REQUESTS ----------
//       .addCase(fetchMyRequests.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//     .addCase(fetchMyRequests.fulfilled, (state, action) => {
//       state.loading = false;
//       state.list = action.payload; // array from API
//     })
//     .addCase(fetchMyRequests.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     })

// },
  
// });

// export const { resetRequestState } = requestSlice.actions;
// export default requestSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ---------- CREATE REQUEST ----------
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

// ---------- FETCH MY REQUESTS ----------
export const fetchMyRequests = createAsyncThunk(
  "requests/fetchMyRequests",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/requests/my", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to load requests");
    }
  }
);

// ---------- SLICE ----------
const requestSlice = createSlice({
  name: "requests",
  initialState: {
    loading: false,
    error: null,
    success: false,
    list: [], // 👈 added
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
      // CREATE
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
      })

      // FETCH MY REQUESTS
      .addCase(fetchMyRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMyRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetRequestState } = requestSlice.actions;
export default requestSlice.reducer;

