import { createSlice } from "@reduxjs/toolkit";

const goalSlice = createSlice({
  name: "goal",
  initialState: {
    items: [],
  },
  reducers: {
    addItem(state, action) {
      state.items.unshift(action.payload);
    },
    removeItem(state, action) {
      const newState = [];

      state.items.filter((item) => {
        if (item.id === action.payload) {
          return;
        } else {
          return newState.push(item);
        }
      });

      state.items = newState;
    },
  },
});

export const goalActions = goalSlice.actions;

export default goalSlice;
