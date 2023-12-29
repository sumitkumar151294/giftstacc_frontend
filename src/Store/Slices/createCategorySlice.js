import { createSlice } from "@reduxjs/toolkit";

export const userRoleSlice = createSlice({
  name: "create-category",
  initialState: {
    isLoading: false,
    isError: false,
    categoryData: {},
    error: {},
    message: "",
  },
  reducers: {
    onGetCategory: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        categoryData: {},
        error: {},
        message: "",
      };
    },

    onGetCategorySuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        categoryData:data,
        message,
        status_code,
        error: {},
      };
    },

    onGetCategoryError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        categoryData:data,
        message,
        status_code,
        isLoading: false,
        isError: true,
        error: {},
      };
    },

    onPostCategory: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        postCategoryData: {},
        error: {},
        message: "",
      };
    },

    onPostCategorySuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        postCategoryData:data,
        message,
        status_code,
        error: {},
      };
    },

    onPostCategoryError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        postCategoryData:data,
        message,
        status_code,
        isLoading: false,
        isError: true,
        error: {},
      };
    },

    onUpdateCategory: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        updatedCategoryData: {},  
        error: {},
        message: "",
      };
    },

    onUpdateCategorySuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        updatedCategoryData: data,  
        message,
        status_code,
        error: {},
      };
    },

    onUpdateCategoryError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        updatedCategoryData: data,  
        message,
        status_code,
        isLoading: false,
        isError: true,
        error: {},
      };
    },
  },
});
export const { 
  onGetCategory, 
  onGetCategorySuccess, 
  onGetCategoryError, 
  onPostCategory, 
  onPostCategorySuccess, 
  onPostCategoryError, 
  onUpdateCategory,
  onUpdateCategorySuccess,
  onUpdateCategoryError
} = userRoleSlice.actions;

export default userRoleSlice.reducer;
