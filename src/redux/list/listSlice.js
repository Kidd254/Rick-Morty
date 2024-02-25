import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://rickandmortyapi.com/api/character/';

export const getList = createAsyncThunk('list/getList', async (thunkApi) => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

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
      .addCase(getList.pending, (state) => {
        if (state.list.length === 0) state.isLoading = true;
      })
      .addCase(getList.fulfilled, (state, action) => {
        if (state.list.length === 0) {
          state.isLoading = false;
          state.list = action.payload.map((list) => ({
            list_name: list.name,
            list_type: list.type,
            location: list.location.name,
            episode: list.episode
          }));
        }
      })
      .addCase(getList.rejected, (state, action) => {
        if (state.list.length === 0) {
          state.isLoading = false;
          state.error = action.payload;
        }
      });
  }
});

export default listSlice.reducer;
