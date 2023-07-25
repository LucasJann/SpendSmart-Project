import { createSlice } from "@reduxjs/toolkit";

const goalSlice = createSlice({
  name: "goal",
  initialState: {
    item: [],
  },
  reducers: {
    addItem(state, action) {
      state.item.unshift(action.payload) 
      console.log(state.item.slice())
    },
  },
});

export const goalActions = goalSlice.actions;

export default goalSlice;
