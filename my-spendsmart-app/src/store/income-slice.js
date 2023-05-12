import { createSlice } from "@reduxjs/toolkit";

const incomeSlice = createSlice({
  name: "income",
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

export const incomeActions = incomeSlice.actions;

export default incomeSlice;
