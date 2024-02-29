import { configureStore } from '@reduxjs/toolkit';

import listReducer from './list/listSlice';
import residentsReducer from './location/residentsSlice';
import detailsReducer from './Details/detailsSlice';
import charactersReducer from './characters/charactersSlice';
import episodesSlice from './episodes/episodesSlice';
import episodeDetailsSlice from './episodeDetails/episodeDetailsSlice';

const store = configureStore({
  reducer: {
    list: listReducer,
    residents: residentsReducer,
    details: detailsReducer,
    characters: charactersReducer,
    episodes: episodesSlice,
    episodeDetails: episodeDetailsSlice,
  },
});

export default store;
