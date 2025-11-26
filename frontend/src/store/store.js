import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import requestReducer from "./request/requestSlice"
import pendingReducer from "./pending/pendingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    requests: requestReducer,
    pending: pendingReducer,
  },
});
