import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    category: "",
    data: "",
    value: 0,
  },
  reducers: {
    addData(state, action) {
      console.log(action.payload);
      state.data = action.payload;
    },
    addValue(state, action) {
      console.log(action.payload);
      state.value = action.payload;
    },
    addCategory(state, action) {
      console.log(action.payload);
      state.category = action.payload;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice;
