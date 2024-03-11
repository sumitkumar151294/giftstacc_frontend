import { createSlice } from "@reduxjs/toolkit";

export const faqCategory = createSlice({
  name: "faqCategory",
  initialState: {
    isLoading: false,
    data: {},
    message: "",
  },
  reducers: {
    onFaqCategorySubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        postdata: {},
        message: "",
        status_code: null,
      };
    },

    onFaqCategorySubmitSuccess: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        postdata: postData,
        message,
        status_code,
      };
    },

    onFaqCategorySubmitReset: (state) => {
      return {
        ...state,
        status_code: null,
        postdata: {},
        message: "",
        isLoading: false,
      };
    },

    onFaqCategorySubmitError: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        postdata: postData,
        message,
        status_code,
        isLoading: false,
      };
    },

    onGetFaqCategory: (state) => {
      return {
        ...state,
        isLoading: true,
        getData: {},
        getmessage: "",
      };
    },
    onGetFaqCategorySuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code } = payload;
      return {
        ...state,
        isLoading: false,
        getData: data,
        getmessage: message,
        status_code: status_code,
      };
    },
    onGetFaqCategoryError: (state, { payload }) => {
      const { data = {}, message = "", status_code } = payload;
      return {
        ...state,
        isLoading: false,
        getData: data,
        getmessage: message,
        status_code: status_code,
      };
    },
  },
});
export const {
  onFaqCategorySubmit,
  onFaqCategorySubmitReset,
  onFaqCategorySubmitError,
  onFaqCategorySubmitSuccess,
  onGetFaqCategory,
  onGetFaqCategorySuccess,
  onGetFaqCategoryError,
} = faqCategory.actions;

export default faqCategory.reducer;
