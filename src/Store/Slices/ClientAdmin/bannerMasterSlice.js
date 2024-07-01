import { createSlice } from "@reduxjs/toolkit";

export const bannerMaster = createSlice({
  name: "bannerMaster",
  initialState: {
    isLoading: false,
    data: {},
    message: "",
  },
  reducers: {
    onbannerMasterSubmit: (state) => {
      return {
        ...state,
        postLoading: true,
        postdata: {},
        message: "",
        status_code: null,
      };
    },

    onbannerMasterSubmitSuccess: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        postLoading: false,
        postdata: postData,
        message,
        status_code,
      };
    },

    onbannerMasterSubmitReset: (state) => {
      return {
        ...state,
        status_code: null,
        data: {},
        postLoading: false,
      };
    },

    onbannerMasterSubmitError: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        postdata: postData,
        message,
        status_code,
        postLoading: false,
      };
    },

    onGetbannerMaster: (state) => {
      return {
        ...state,
        isLoading: true,
        getData: {},
        getmessage: "",
      };
    },
    onGetbannerMasterSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code } = payload;
      return {
        ...state,
        isLoading: false,
        getData: data,
        getmessage: message,
        status_code,
      };
    },
    onGetbannerMasterError: (state, { payload }) => {
      const { data = {}, message, status_code } = payload;
      return {
        ...state,
        isLoading: false,
        getData: data,
        getmessage: message,
        status_code,
      };
    },
    onGetbannerMasterReset: (state) => {
      return {
        ...state,
        status_code: null,
        data: {},

      };
    },

    onUpdateBannerMaster: (state) => {
      return { ...state, putLoading: true, updateData: {}, message: '', error: {}, isError: false, update_status_code: null };
    },
    onUpdateBannerMasterSuccess: (state, { payload }) => {
      const { data = {}, message = '', status_code } = payload;
      return {
        ...state,
        putLoading: false,
        updateData: data,
        message,
        update_status_code: status_code
      };
    },
    onUpdateBannerMasterError: (state, { payload }) => {
      const { data = {}, message = '', status_code } = payload;
      return {
        ...state,
        putLoading: false,
        updateData: data,
        message,
        update_status_code: status_code
      };
    },
    onUpdateBannerMasterReset: (state, { payload }) => {
      return {
        ...state,
        putLoading: false,
        data: {},
        message: "",
        update_status_code: null
      };
    },
  },
});
export const {
  onbannerMasterSubmit,
  onbannerMasterSubmitReset,
  onbannerMasterSubmitError,
  onbannerMasterSubmitSuccess,
  onGetbannerMaster,
  onGetbannerMasterSuccess,
  onGetbannerMasterError,
  onGetbannerMasterReset,
  onUpdateBannerMaster,
  onUpdateBannerMasterSuccess,
  onUpdateBannerMasterError,
  onUpdateBannerMasterReset
} = bannerMaster.actions;

export default bannerMaster.reducer;
