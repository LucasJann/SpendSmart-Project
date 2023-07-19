import { startOfMonth, endOfMonth, startOfDay, endOfDay } from "date-fns";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const incomeSlice = createSlice({
  name: "income",
  initialState: {
    items: [],
  },
  reducers: {
    addInput(state, action) {
      const newItem = action.payload;
      const id = uuidv4(); 
      state.items.unshift({
        id,
        value: newItem.value,
        date: newItem.date,
        category: newItem.category,
      });
    },
  },
});

export const incomeActions = incomeSlice.actions;

export default incomeSlice;
