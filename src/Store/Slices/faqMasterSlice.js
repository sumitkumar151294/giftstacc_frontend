import { createSlice } from "@reduxjs/toolkit";

export const faqMaster = createSlice({
  name: "faqMaster",
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: "",
  },
  reducers: {
    onFaqMasterSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        postdata: {},
        error: {},
        message: "",
        status_code:null
      };
    },

    onFaqMasterSubmitSuccess: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        postdata:postData,
        message,
        status_code,
        error: {},
      };
    },

    onFaqMasterSubmitReset: (state) => {
      return {
        ...state,
        status_code:null,
      };
    },

    onFaqMasterSubmitError: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        postdata:postData,
        message,
        status_code,
        isLoading: false,
        isError: true,
        error: {},
      };
    },

    onGetFaqMaster: (state) => {
      return { ...state, isLoading: true, getData: {}, getmessage: '', error: {}, isError: false };
    },
    onGetFaqMasterSuccess: (state, { payload }) => {
      const { data = {}, message = '', status_code } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        getData:data,
        error: {},
        getmessage:message,
        status_code
      };
    },
    onGetFaqMasterError: (state, { payload }) => {
      const { data = {}, message = '', status_code } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        getData:data,
        getmessage:message,
        status_code
      };
    },
  
  },
});
export const { onFaqMasterSubmit, onFaqMasterSubmitReset, onFaqMasterSubmitError, onFaqMasterSubmitSuccess, onGetFaqMaster, onGetFaqMasterSuccess, onGetFaqMasterError, onFaqMasterUpdate, onFaqMasterUpdateSuccess, onFaqMasterUpdateError } =
  faqMaster.actions;

export default faqMaster.reducer;
