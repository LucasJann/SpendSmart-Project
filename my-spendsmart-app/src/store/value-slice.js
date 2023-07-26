import { createSlice } from "@reduxjs/toolkit";

const valueSlice = createSlice({
  name: "balance",
  initialState: { balance: 0 },
  reducers: {
    addBalance(state, action) {
      state.balance = action.payload;
    },

  },
});

export const valueActions = valueSlice.actions;

export default valueSlice;
