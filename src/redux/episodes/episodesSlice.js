import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://rickandmortyapi.com/api/episode';
export const fetchEpisodes = createAsyncThunk(
  'episodes/fetchEpisodes',
  async (thunkApi) => {
    try {
      const response = await axios.get(baseUrl);
      return response.data.results;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  episodes: [],
  status: null,
  error: null,
};

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        if (state.episodes.length === 0) state.status = 'loading';
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        if (state.episodes.length === 0) {
          state.status = 'succeeded';
          state.episodes = action.payload.map((episode) => ({
            id: episode.id,
            episode_name: episode.name,
            episode: episode.episode,
            episode_characters: episode.characters,
          }));
        }
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        if (state.episodes.length === 0) {
          state.status = 'failed';
          state.error = action.payload;
        }
      });
  },
});

export default episodesSlice.reducer;
