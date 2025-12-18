import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./reducers/authSlice";
import UiReducer from "./reducers/uiSlice";
import EmailReducer from "./reducers/emailSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    ui: UiReducer,
    email: EmailReducer,
  },
});
