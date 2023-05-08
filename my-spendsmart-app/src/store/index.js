import { configureStore } from '@reduxjs/toolkit';

import valueSlice from './value-slice';

const store = configureStore({
  reducer: {value: valueSlice.reducer},
});

export default store;