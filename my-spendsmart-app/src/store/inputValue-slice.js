import { createSlice } from "@reduxjs/toolkit";
const inputValueSlice = createSlice({
  name: "inputValue",
  initialState: {
    items: [],
  },
  reducers: {
    addValue(state, action) {
      let lastValue = action.payload;
      console.log(lastValue);
      state.items.push(lastValue);
    },
  },
});

export const inputValueActions = inputValueSlice.actions;

export default inputValueSlice;
