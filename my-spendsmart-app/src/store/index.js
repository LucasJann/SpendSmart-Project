import { configureStore } from "@reduxjs/toolkit";

import goalSlice from "./goal-slice";
import valueSlice from "./value-slice";
import incomeSlice from "./income-slice";
import expenseSlice from "./expense-slice";

const store = configureStore({
  reducer: {
    goal: goalSlice.reducer,
    value: valueSlice.reducer,
    income: incomeSlice.reducer,
    expense: expenseSlice.reducer,
  },
});

export default store;
