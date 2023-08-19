import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    caller: false,
  },
  reducers: {
    update(state) {
      state.caller = !state.caller
    }
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice;
