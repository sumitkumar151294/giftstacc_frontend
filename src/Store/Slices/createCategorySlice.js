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
    onGetCategoryReset: (state) => {
      return {
        ...state,
        isLoading: false,
        categoryData: {},
        message: "",
        error: {},
        status_code: null,
        isError: false,
      };
    },
      onPostCategory: (state) => {
        return {
          ...state,
          postLoading: true,
          isError: false,
          postCategoryData: {},
          error: {},
          postMessage: "",
        };
      },
    onPostCategorySuccess: (state, { payload }) => {

      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        postLoading: false,
        isError: false,
        postCategoryData:data,
        postMessage:message,
        post_status_code:status_code,
        error: {},
      };
    },

    onPostCategoryError: (state, {payload}) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        postCategoryData:data,
        postMessage:message,
        post_status_code:status_code,
        postLoading: false,
        isError: true,
        error: {},
      };
    },
    onPostCategoryReset: (state) => {
      return {
        ...state,
        postLoading: false,
        postCategoryData: null,
        postMessage: "",
        error: {},
        post_status_code: null,
        isError: false,
      };
    },

    onUpdateCategory: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        updatedCategoryData: {},
        error: {},
        updateMessage: "",
      };
    },

    onUpdateCategorySuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        updatedCategoryData: data,  
        updateMessage:message,
        update_status_code:status_code,
        error: {},
      };
    },

    onUpdateCategoryError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        updatedCategoryData: data,
        updateMessage:message,
        update_status_code:status_code,
        isLoading: false,
        isError: true,
        error: {},
      };
    },
    onUpdateCategoryReset: (state) => {
      return {
        ...state,
        isLoading: false,
        updatedCategoryData: {},
        updateMessage: "",
        error: {},
        update_status_code: null,
        isError: false,
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
  onPostCategoryReset,
  onUpdateCategory,
  onUpdateCategorySuccess,
  onUpdateCategoryError,
  onUpdateCategoryReset
} = userRoleSlice.actions;

export default userRoleSlice.reducer;
