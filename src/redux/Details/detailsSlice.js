import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDetails = createAsyncThunk(
  'details/fetchDetails',
  async (id, thunkApi) => {
    try {
      const baseUrl = `https://rickandmortyapi.com/api/character/${id}`;
      const response = await axios.get(baseUrl);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  details: [],
  status: null,
  error: null
};

const detailsSlice = createSlice({
  name: 'details',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.pending, (state) => {
        if (state.details.length === 0) state.status = 'loading';
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = [
          {
            id: action.payload.id,
            details_name: action.payload.name,
            details_image: action.payload.image,
            details_status: action.payload.status,
            details_gender: action.payload.gender,
            details_species: action.payload.species,
            details_location: action.payload.location.name,
            details_origin: action.payload.origin.name
          }
        ];
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        if (state.details.length === 0) {
          state.status = 'failed';
          state.error = action.payload;
        }
      });
  }
});

export default detailsSlice.reducer;
