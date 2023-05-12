import { createSlice } from "@reduxjs/toolkit";

const valueSlice = createSlice({
  name: "value",
  initialState: { value: 0 },
  reducers: {
    addBalance(state, action) {
      state.value = action.payload;
    },

  },
});

export const valueActions = valueSlice.actions;

export default valueSlice;
