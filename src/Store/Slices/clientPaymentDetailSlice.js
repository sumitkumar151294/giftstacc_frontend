import { createSlice } from "@reduxjs/toolkit";

export const clientPaymentSlice = createSlice({
  name: "clientPayment",
  initialState: {
    isLoading: false,
    isError: false,
    clientPaymentData: {},
    error: {},
    message: "",
  },
  reducers: {
    onClientPaymentSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        clientPaymentData: {},
        message: "",
        error: {},
        isError: false,
      };
    },
    onClientPaymentSubmitSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        clientPaymentData:data,
        error: {},
        message,
        status_code,
      };
    },
    onClientPaymentSubmitError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        clientPaymentData: data,
        message,
        status_code,
      };
    },
    onClientPaymentReset: (state) => {
      return {
        ...state,
        isLoading: false,
        clientPaymentData: {},
        message: "",
        error: {},
        status_code: null,
        isError: false,
      };
    },
    onPostClientPaymentSubmit: (state) => {
            return {
        ...state,
        postPaymentLoading: true,
        postClientPaymentData: {},
        postMessage: "",
        error: {},
        isError: false,
      };
    },
    onPostClientPaymentSubmitSuccess: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        postPaymentLoading: false,
        isError: false,
        postClientPaymentData: postData,
        error: {},
        postMessage: message,
        status_code,
      };
    },
    onPostClientPaymentSubmitError: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        postPaymentLoading: false,
        isError: true,
        postClientPaymentData: postData,
        postMessage: message,
        status_code,
      };
    },
    onPostClientPaymentReset: (state) => {
      return {
        ...state,
        postPaymentLoading: false,
        postClientPaymentData: {},
        postMessage: "",
        error: {},
        status_code: null,
        isError: false,
      };
    },
    onUpdateClientPaymentSubmit: (state) => {
      return {
        ...state,
        updateLoading: true,
        updateClientPaymentData: {},
        postMessage: "",
        error: {},
        isError: false,
      };
    },
    onUpdateClientPaymentSubmitSuccess: (state, { payload }) => {
      const { updateData = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        updateLoading: false,
        isError: false,
        updateClientPaymentData: updateData,
        error: {},
        postMessage: message,
        status_code,
      };
    },
    onUpdateClientPaymentSubmitError: (state, { payload }) => {
      const { updateData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        updateLoading: false,
        isError: true,
        updateClientPaymentData: updateData,
        postMessage: message,
        status_code,
      };
    },
    onUpdateClientPaymentReset: (state) => {
      return {
        ...state,
        updateLoading: false,
        updateClientPaymentData: {},
        postMessage: "",
        error: {},
        status_code: null,
        isError: false,
      };
    },
  },
});

export const {
  onUpdateClientPaymentReset,
  onUpdateClientPaymentSubmitError,
  onUpdateClientPaymentSubmitSuccess,
  onUpdateClientPaymentSubmit,
  onPostClientPaymentSubmit,
  onPostClientPaymentSubmitSuccess,
  onPostClientPaymentSubmitError,
  onPostClientPaymentReset,
  onClientPaymentSubmit,
  onClientPaymentSubmitError,
  onClientPaymentSubmitSuccess,
  onClientPaymentReset,
} = clientPaymentSlice.actions;

export default clientPaymentSlice.reducer;
