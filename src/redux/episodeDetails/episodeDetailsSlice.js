import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  episodeDetails: [],
  status: 'idle',
  error: null,
};

// async thunk for fetching residents
export const fetchEpisodeDetails = createAsyncThunk(
  'episodes/fetchEpisodeDetails',
  async (episodeURLs) => {
    const episodesData = await Promise.all(
      episodeURLs.map((url) => axios.get(url).then((response) => response.data)),
    );

    return episodesData;
  },
);

// Create the residents slice
const episodeDetailsSlice = createSlice({
  name: 'episodeDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add the fetchResidents thunk to extraReducers
    builder
      .addCase(fetchEpisodeDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEpisodeDetails.fulfilled, (state, action) => {
        if (state.episodeDetails.length === 0) {
          state.status = 'succeeded';
          // Correct the property name to match your payload
          state.episodeDetails = action.payload.flat().map((episode) => ({
            id: episode.id,
            episode_name: episode.name,
            episode_air_date: episode.air_date,
            episode_characters: episode.characters,
            episode: episode.episode,
          }));
        }
      })
      .addCase(fetchEpisodeDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default episodeDetailsSlice.reducer;
