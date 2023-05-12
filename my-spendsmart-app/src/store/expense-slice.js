import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    category: "",
    date: "",
    value: 0,
  },
  reducers: {
    addDate(state, action) {
      state.date = action.payload;
    },
    addValue(state, action) {
      state.value = action.payload;
    },
    addCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice;
