import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://rickandmortyapi.com/api/location/';

export const getLocation = createAsyncThunk(
  'list/getLocation',
  async (thunkApi) => {
    try {
      const response = await axios.get(baseUrl);
      return response.data.results;
    } catch (error) {
    
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  status: null,
  error: null
};

const listSlice = createSlice({
  name: 'list',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getLocation.pending, (state) => {
        if (state.list.length === 0) state.status = 'loading';
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        if (state.list.length === 0) {
          state.status = 'succeeded';
          state.list = action.payload.map((listed) => ({
            id: listed.id,
            list_name: listed.name,
            list_type: listed.type,
            residentURLs: listed.residents
          }));
          
        }
      })
      .addCase(getLocation.rejected, (state, action) => {
        if (state.list.length === 0) {
          state.status = 'failed';
          state.error = action.payload;
        }
      });
  }
});

export default listSlice.reducer;
