import { configureStore } from '@reduxjs/toolkit';

import listReducer from './list/listSlice';

const store = configureStore({
  reducer: {
    list: listReducer,
  },
});

export default store;