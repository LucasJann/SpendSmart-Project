import { configureStore } from "@reduxjs/toolkit";

import valueSlice from "./value-slice";
import expenseSlice from "./expense-slice";
import inputValueSlice from "./inputValue-slice";
import inputDataSlice from "./inputData-slice";

const store = configureStore({
  reducer: {
    value: valueSlice.reducer,
    expense: expenseSlice.reducer,
    inputValue: inputValueSlice.reducer,
    inputData: inputDataSlice.reducer,
  },
});

export default store;
