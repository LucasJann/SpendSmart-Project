import { createSlice } from "@reduxjs/toolkit";

const valueSlice = createSlice({
  name: "value",
  initialState: { value: 0 },
  reducers: {
    number(state, action) {
      console.log(action.payload);
      state.value = action.payload;
    },
  },
});

export const valueAction = valueSlice.actions;

export default valueSlice;
