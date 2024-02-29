import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (thunkApi) => {
    try {
      const response = await axios.get(`${baseUrl}/character`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  characters: [],
  status: null,
  error: null,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        if (state.characters.length === 0) state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.characters = [
          {
            id: action.payload.id,
            details_name: action.payload.name,
            details_image: action.payload.image,
            details_status: action.payload.status,
            details_gender: action.payload.gender,
            details_species: action.payload.species,
            details_location: action.payload.location.name,
            details_origin: action.payload.origin.name,
          },
        ];
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        if (state.characters.length === 0) {
          state.status = 'failed';
          state.error = action.payload;
        }
      });
  },
});

export default charactersSlice.reducer;
