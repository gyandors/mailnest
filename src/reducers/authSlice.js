import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idToken: localStorage.getItem("idToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  loggedUser: JSON.parse(localStorage.getItem("loggedUser")) || {
    name: "",
    email: "",
    photoUrl: "",
    uniqueId: "",
  },
  isLoggedIn: !!localStorage.getItem("idToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin(state, action) {
      const idToken = action.payload.idToken;
      const refreshToken = action.payload.refreshToken;
      const loggedUser = {
        name: action.payload.displayName || state.loggedUser?.name,
        email: action.payload.email || state.loggedUser?.email,
        photoUrl: action.payload.photoUrl || state.loggedUser?.photoUrl,
        uniqueId: action.payload.localId,
      };

      state.idToken = idToken;
      localStorage.setItem("idToken", idToken);

      state.refreshToken = refreshToken;
      localStorage.setItem("refreshToken", refreshToken);

      state.loggedUser = loggedUser;
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

      state.isLoggedIn = true;
    },

    onLogout(state) {
      state.idToken = null;
      localStorage.removeItem("idToken");

      state.refreshToken = null;
      localStorage.removeItem("refreshToken");

      state.loggedUser = null;
      localStorage.removeItem("loggedUser");

      state.isLoggedIn = false;
    },

    setAuthUser(state, action) {
      const authUser = {
        name: action.payload.displayName || state.loggedUser?.name,
        email: action.payload.email || state.loggedUser?.email,
        photoUrl: action.payload.photoUrl || state.loggedUser?.photoUrl,
        uniqueId: action.payload.localId,
      };

      localStorage.setItem("loggedUser", JSON.stringify(authUser));
    },

    updateUser(state, action) {
      state.loggedUser = { ...state.loggedUser, ...action.payload };
      localStorage.setItem("loggedUser", JSON.stringify(state.loggedUser));
    },
  },
});

export const { onLogin, onLogout, setAuthUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
