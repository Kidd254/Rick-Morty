import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  characters: [],
  status: 'idle',
  error: null,
};

// async thunk for fetching residents
export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (characterURLs) => {
    const residentsData = await Promise.all(
      characterURLs.map((url) => axios.get(url).then((response) => response.data)),
    );
    return residentsData;
  },
);

// Create the residents slice
const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add the fetchResidents thunk to extraReducers
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        if (state.characters.length === 0) {
          state.status = 'succeeded';
          // Correct the property name to match your payload
          state.characters = action.payload.map((character) => ({
            id: character.id,
            character_name: character.name,
            character_status: character.status,
            character_image: character.image,
            episodeURLs: character.episode,
          }));
        }
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default charactersSlice.reducer;
