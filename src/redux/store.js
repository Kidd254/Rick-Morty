import { configureStore } from '@reduxjs/toolkit';

import listReducer from './list/listSlice';
import residentsReducer from './location/residentsSlice';

const store = configureStore({
  reducer: {
    list: listReducer,
    residents: residentsReducer
  }
});

export default store;
