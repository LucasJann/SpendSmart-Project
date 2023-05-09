import { createSlice } from "@reduxjs/toolkit";
const inputDataSlice = createSlice({
  name: "inputData",
  initialState: {
    items: [],
  },
  reducers: {
    addData(state, action) {
      state.items.push(action.payload);
    },
  },
});

export const dataActions = inputDataSlice.actions;

export default inputDataSlice;
