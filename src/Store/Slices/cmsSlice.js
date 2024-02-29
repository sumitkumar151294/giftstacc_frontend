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
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        getCMSData: data,
        message,
        status_code,
      };
    },
    onGetCmsError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        getCMSData: data,
        message,
        status_code,
      };
    },
    onGetCmsReset: (state) => {
      return {
        ...state,
        getCMSData: {},
        message: "",
        status_code: null,
      };
    },
    onPostCms: (state) => {
      return {
        ...state,
        postCMSData: {},
        message: "",
      };
    },
    onPostCmsSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        postCMSData: data,
        postMessage: message,
        post_status_code: status_code,
      };
    },
    onPostCmsError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        postCMSdata: data,
        postMessage: message,
        post_status_code: status_code,
      };
    },
    onPostCmsReset: (state) => {
      return {
        ...state,
        postCMSData: null,
        post_status_code: "",
      };
    },
    onUpdateCms: (state) => {
      return {
        ...state,
        updatedCmsData: {},
        updateMessage: "",
      };
    },
    onUpdateCmsSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        updatedCmsData: data,
        updateMessage: message,
        update_status_code: status_code,
      };
    },
    onUpdateCmsError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        updatedCmsData: data,
        updateMessage: message,
        update_status_code: status_code,
      };
    },
    onUpdateCmsReset: (state) => {
      return {
        ...state,
        updatedCmsData: {},
        updateMessage: "",
        update_status_code: null,
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
  onUpdateCms,
  onUpdateCmsSuccess,
  onUpdateCmsError,
  onUpdateCmsReset,
} = cmsSlice.actions;

export default cmsSlice.reducer;
