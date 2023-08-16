import { configureStore } from "@reduxjs/toolkit";

import goalSlice from "./goal-slice";
import balanceSlice from "./balance-slice";
import incomeSlice from "./income-slice";
import expenseSlice from "./expense-slice";

const store = configureStore({
  reducer: {
    goal: goalSlice.reducer,
    value: balanceSlice.reducer,
    income: incomeSlice.reducer,
    expense: expenseSlice.reducer,
  },
});

export default store;
