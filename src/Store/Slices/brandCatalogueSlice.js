import { createSlice } from "@reduxjs/toolkit";

export const brandCatalogueSlice = createSlice({
  name: "brandCatalogue",
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: "",
  },
  reducers: {
    onbrandCatalogueSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: {},
        error: {},
        message: "",
      };
    },

    onbrandCatalogueSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        data,
        message,
        status_code,
        error: {},
      };
    },

    onbrandCatalogueError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        data,
        message,
        status_code,
        isLoading: false,
        isError: true,
        error: {},
      };
    },
   
  },
});
export const { onbrandCatalogueSubmit, onbrandCatalogueError, onbrandCatalogueSuccess  } =
  brandCatalogueSlice.actions;

export default brandCatalogueSlice.reducer;
