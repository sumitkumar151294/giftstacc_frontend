import { createSlice } from '@reduxjs/toolkit';

const rolemasterSlice = createSlice({
  name: 'formData',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchData: (state, action) => {
        state.loading = true;
      },
    fetchDataStart: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchData, fetchDataStart, fetchDataSuccess, fetchDataFailure } = rolemasterSlice.actions;
export const selectMyData = (state) => state.formData;
export default rolemasterSlice.reducer;
