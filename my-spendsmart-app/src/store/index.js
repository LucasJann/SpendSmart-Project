import { configureStore } from "@reduxjs/toolkit";

import callerSlice from "./caller-slice";

const store = configureStore({
  reducer: {
    call: callerSlice.reducer,
  },
});

export default store;
