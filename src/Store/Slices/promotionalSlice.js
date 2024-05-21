import { createSlice } from "@reduxjs/toolkit";

export const promotional = createSlice({
  name: "promotional",
  initialState: {
    isLoading: false,
    data: [],
    message: "",
  },
  reducers: {
    onGetPromtional: (state) => {
      return {
        ...state,
        getLoading: true,
        getData: [],
        getmessage: "",
      };
    },
    onGetPromtionalSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code } = payload;
      return {
        ...state,
        getLoading: false,
        getData: data,
        getmessage: message,
        status_code,
      };
    },
    onGetPromtionalError: (state, { payload }) => {
      const { data = [], message, status_code } = payload;
      return {
        ...state,
        getLoading: false,
        getData: data,
        getmessage: message,
        status_code,
      };
    },
    onGetPromtionalReset: (state) => {
      return {
        ...state,
        status_code: null,
        data: [],
      };
    },


    onPromtionalSubmit: (state) => {
      return {
        ...state,
        postLoading: true,
        postdata: [],
        postMessage: "",
        post_status_code: null,
      };
    },

    onPromtionalSubmitSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        postLoading: false,
        postdata: postData,
        postMessage:message,
        post_status_code: status_code,
      };
    },

    onPromtionalSubmitError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postdata: data,
        postMessage: message,
        post_status_code: status_code,
        postLoading: false,
      };
    },

    onPromtionalSubmitReset: (state) => {
      return {
        ...state,
        post_status_code: null,
        data: {},
        postLoading: false,
      };
    },

    onUpdatePromotional: (state) => {
      return {
        ...state,
        putLoading: true,
        updateData: [],
        updateMessage: '',
        update_status_code: null
      };
    },

    onUpdatePromotionalSuccess: (state, { payload }) => {
      const { data = [], message = '', status_code } = payload;
      return {
        ...state,
        putLoading: false,
        updateData: data,
        updateMessage:message,
        update_status_code: status_code
      };
    },
    onUpdatePromotionalError: (state, { payload }) => {
      const { data = [], message = '', status_code } = payload;
      return {
        ...state,
        putLoading: false,
        updateData: data,
        updateMessage:message,
        update_status_code: status_code
      };
    },
    onUpdatePromotionalReset: (state, { payload }) => {
      return {
        ...state,
        putLoading: false,
        data: [],
        updateMessage: "",
        update_status_code: null
      };
    },
  },
});
export const {
  onGetPromtional,
  onGetPromtionalSuccess,
  onGetPromtionalError,
  onGetPromtionalReset,
  onPromtionalSubmit,
  onPromtionalSubmitSuccess,
  onPromtionalSubmitError,
  onPromtionalSubmitReset,
  onUpdatePromotional,
  onUpdatePromotionalSuccess,
  onUpdatePromotionalError,
  onUpdatePromotionalReset
} = promotional.actions;

export default promotional.reducer;
