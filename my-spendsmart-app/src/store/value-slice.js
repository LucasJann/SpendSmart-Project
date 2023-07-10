import { createSlice } from "@reduxjs/toolkit";

const valueSlice = createSlice({
  name: "value",
  initialState: { money: 0 },
  reducers: {
    addBalance(state, action) {
      state.money = action.payload;
    },

  },
});

export const valueActions = valueSlice.actions;

export default valueSlice;
