import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReduces";
import { authApi } from "../app/services/auth/authService";
//import debounceMiddleware from "./Middleware/debounceMiddleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
});

export default store;
