import { createSlice } from "@reduxjs/toolkit";

export const cmsSlice = createSlice({
  name: "cms",
  initialState: {
    isLoading: false,
    isError: false,
    getCMSData: {},
    error: {},
    message: "",
  },
  reducers: {
    onGetCms: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        getCMSData: {},
        error: {},
        message: "",
      };
    },
    onGetCmsSuccess: (state, { payload }) => {
      debugger;
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        getCMSData: data,
        message,
        status_code,
      };
    },
    onGetCmsError: (state, { payload }) => {
      debugger;
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        getCMSData: data,
        message,
        status_code,
        isLoading: false,
        isError: true,
        error: {},
      };
    },
    onGetCmsReset: (state) => {
      return {
        ...state,
        isLoading: false,
        getCMSData: {},
        message: "",
        error: {},
        status_code: null,
        isError: false,
      };
    },
    onPostCms: (state) => {
      debugger;
      return {
        ...state,
        isLoading: true,
        isError: false,
        postCMSData: {},
        error: {},
        message: "",
      };
    },
    onPostCmsSuccess: (state, { payload }) => {
      debugger;
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        postCMSData: data,
        postMessage: message,
        post_status_code: status_code,
        error: {},
      };
    },
    onPostCmsError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        postCMSdata: data,
        postMessage: message,
        post_status_code: status_code,
        isLoading: false,
        isError: true,
        error: {},
      };
    },
    onPostCmsReset: (state) => {
      return {
        ...state,
        isLoading: false,
        postCMSdata: null,
        postMessage: "",
        error: {},
        post_status_code: null,
        isError: false,
      };
    },
  },
});

export const {
  onGetCms,
  onGetCmsSuccess,
  onGetCmsError,
  onGetCmsReset,
  onPostCms,
  onPostCmsSuccess,
  onPostCmsError,
  onPostCmsReset,
} = cmsSlice.actions;

export default cmsSlice.reducer;
