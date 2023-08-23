import { createSlice } from "@reduxjs/toolkit";

const callerSlice = createSlice({
  name: "caller",
  initialState: {
    caller: false,
  },
  reducers: {
    update(state) {
      state.caller = !state.caller;
    },
  },
});

export const callerActions = callerSlice.actions;

export default callerSlice;
