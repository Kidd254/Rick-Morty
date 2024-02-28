import { configureStore } from '@reduxjs/toolkit';

import listReducer from './list/listSlice';
import residentsReducer from './location/residentsSlice';
import detailsReducer from './Details/detailsSlice';
import charactersReducer from './characters/charactersSlice';

const store = configureStore({
  reducer: {
    list: listReducer,
    residents: residentsReducer,
    details: detailsReducer,
    characters: charactersReducer,
  },
});

export default store;
