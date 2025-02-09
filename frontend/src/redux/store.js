import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import communityReducer from "./slices/community.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    community: communityReducer,
  },
});

export default store;
