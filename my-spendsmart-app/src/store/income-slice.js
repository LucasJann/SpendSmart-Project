import { createSlice } from "@reduxjs/toolkit";

const incomeSlice = createSlice({
  name: "income",
  initialState: {
    caller: false,
  },
  reducers: {
    update(state) {
      state.caller = !state.caller;
    },
  },
});

export const incomeActions = incomeSlice.actions;

export default incomeSlice;
