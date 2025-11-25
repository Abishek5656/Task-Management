import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import requestReducer from "./request/requestSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    requests: requestReducer,
  },
});
