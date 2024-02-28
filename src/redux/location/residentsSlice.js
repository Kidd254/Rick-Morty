// residentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an initial state
const initialState = {
  residents: [],
  status: 'idle',
  error: null
};

// Create an async thunk for fetching residents
export const fetchResidents = createAsyncThunk(
  'residents/fetchResidents',
  async (residentURLs) => {
    const residentsData = await Promise.all(
      residentURLs.map((url) =>
        axios.get(url).then((response) => response.data)
      )
    );
    return residentsData;
  }
);

// Create the residents slice
const residentsSlice = createSlice({
  name: 'residents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add the fetchResidents thunk to extraReducers
    builder
      .addCase(fetchResidents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResidents.fulfilled, (state, action) => {
        if (state.residents.length === 0) {
          state.status = 'succeeded';
          // Correct the property name to match your payload
          state.residents = action.payload.map((resident) => ({
            id: resident.id,
            resident_name: resident.name,
            resident_status: resident.status,
            resident_image: resident.image,
            resident_episode: resident.episode
          }));
          
        }
      })
      .addCase(fetchResidents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default residentsSlice.reducer;
