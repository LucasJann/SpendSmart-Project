import { createSlice } from "@reduxjs/toolkit";

const valueSlice = createSlice({
  name: "balance",
  initialState: {
    balance: 0,
    user: [],
  },
  reducers: {
    upgrade(state, action) {
      state.balance = action.payload;
    },

    addBalance(state, action) {
      const sum = parseInt(state.balance) + parseInt(action.payload);
      state.balance = sum;
    },

    addUser(state, action) {
      state.user.unshift(action);
    },

    removeBalance(state, action) {
      state.balance = state.balance - action.payload;
    },
  },
});

export const valueActions = valueSlice.actions;

export default valueSlice;
