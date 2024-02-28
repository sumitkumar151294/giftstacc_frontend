import { createSlice } from "@reduxjs/toolkit";

export const faqMaster = createSlice({
  name: "faqMaster",
  initialState: {
    isLoading: false,
    data: {},
    message: "",
  },
  reducers: {
    onFaqMasterSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        postdata: {},
        message: "",
        status_code: null,
      };
    },

    onFaqMasterSubmitSuccess: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        postdata: postData,
        message,
        status_code,
      };
    },

    onFaqMasterSubmitReset: (state) => {
      return {
        ...state,
        status_code: null,
        postdata: null,
      };
    },

    onFaqMasterSubmitError: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        postdata: postData,
        message,
        status_code,
        isLoading: false,
      };
    },

    onGetFaqMaster: (state) => {
      return {
        ...state,
        isLoading: true,
        getData: {},
        getmessage: "",
      };
    },
    onGetFaqMasterSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code } = payload;
      return {
        ...state,
        isLoading: false,
        getData: data,
        getmessage: message,
        status_code :status_code,
      };
    },
    onGetFaqMasterError: (state, { payload }) => {
      const { data = {}, message = "", status_code } = payload;
      return {
        ...state,
        isLoading: false,
        getData: data,
        getmessage: message,
        status_code :status_code,
      };
    },
  },
});
export const {
  onFaqMasterSubmit,
  onFaqMasterSubmitReset,
  onFaqMasterSubmitError,
  onFaqMasterSubmitSuccess,
  onGetFaqMaster,
  onGetFaqMasterSuccess,
  onGetFaqMasterError,
  onFaqMasterUpdate,
  onFaqMasterUpdateSuccess,
  onFaqMasterUpdateError,
} = faqMaster.actions;

export default faqMaster.reducer;
