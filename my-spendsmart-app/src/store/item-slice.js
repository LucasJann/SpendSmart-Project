import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "inputItem",
  initialState: {
    items: [],
  },
  reducers: {
    addItem(state, action) {
      const { value, data } = action.payload;

      state.items = [...state.items, { value, data }];
    },
  },
});

export const itemActions = itemSlice.actions;

export default itemSlice;