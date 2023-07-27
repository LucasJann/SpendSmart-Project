import { createSlice } from "@reduxjs/toolkit";

const valueSlice = createSlice({
  name: "balance",
  initialState: { balance: 0 },
  reducers: {
    upgrade(state, action) {
      state.balance = action.payload;
    },

    addBalance(state, action) {
      const sum = parseInt(state.balance) + parseInt(action.payload);
      state.balance = sum;
    },

    removeBalance(state, action) {
      state.balance = state.balance - action.payload;
    },
  },
});

export const valueActions = valueSlice.actions;

export default valueSlice;
