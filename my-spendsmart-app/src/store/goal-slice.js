import { createSlice } from "@reduxjs/toolkit";

const goalSlice = createSlice({
  name: "goal",
  initialState: { goal: 0, text: "" },
  reducers: {
    addGoal(state, action) {
      state.goal = action.payload;
    },
    addText(state, action) {
      state.text = action.payload;
    },
  },
});

export const goalActions = goalSlice.actions

export default goalSlice;
