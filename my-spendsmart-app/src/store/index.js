import { configureStore } from "@reduxjs/toolkit";

import keySlice from "./key-slice";
import callerSlice from "./caller-slice";

const store = configureStore({
  reducer: {
    key: keySlice.reducer,
    call: callerSlice.reducer,
  },
});

export default store;
