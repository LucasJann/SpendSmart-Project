import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    items: [],
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const id = uuidv4();
      state.items.unshift({
        id,
        value: newItem.value,
        date: newItem.date,
        category: newItem.category,
      });
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

export const expenseActions = expenseSlice.actions;

export default expenseSlice;
