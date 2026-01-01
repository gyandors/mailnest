import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { spinner: false, mailsLoading: true },
  reducers: {
    toggleSpinner(state, action) {
      state.spinner = action.payload;
    },

    toggleMailsLoading(state, action) {
      state.mailsLoading = action.payload;
    },
  },
});

export const { toggleSpinner, toggleMailsLoading } = uiSlice.actions;
export default uiSlice.reducer;
