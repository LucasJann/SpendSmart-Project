import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    items: [],
  },
  reducers: {
    addInput(state, action) {
      const newItem = action.payload;
      const id = uuidv4(); // Gerar um id único
      state.items.unshift({
        id,
        value: newItem.value,
        date: newItem.date,
      });
      console.log(state.items.slice());
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice;
