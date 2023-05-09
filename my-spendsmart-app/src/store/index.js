import { configureStore } from "@reduxjs/toolkit";

import valueSlice from "./value-slice";
import expenseSlice from "./expense-slice";
import itemSlice from "./item-slice";

const store = configureStore({
  reducer: {
    value: valueSlice.reducer,
    expense: expenseSlice.reducer,
    inputItem: itemSlice.reducer,
  },
});

export default store;
