import { createSlice } from "@reduxjs/toolkit";

export const clientPaymentSlice = createSlice({
  name: "clientPayment",
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: "",
  },
  reducers: {
    onClientPaymentSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        data: {},
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
        data,
        error: {},
        message,
        status_code,
      };
    },
    onClientPaymentSubmitError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: data,
        message,
        status_code,
      };
    },
    onClientPaymentReset: (state) => {
      return {
        ...state,
        isLoading: false,
        data: {},
        message: "",
        error: {},
        status_code: 400,
        isError: false,
      };
    },
    onPostClientPaymentSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        postClientData: {},
        postMessage: "",
        error: {},
        isError: false,
      };
    },
    onPostClientPaymentSubmitSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        postClientData: data,
        error: {},
        postMessage: message,
        status_code,
      };
    },
    onPostClientPaymentSubmitError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        postClientData: data,
        postMessage: message,
        status_code,
      };
    },
    onPostClientPaymentReset: (state) => {
      return {
        ...state,
        isLoading: false,
        postClientData: {},
        postMessage: "",
        error: {},
        status_code: 400,
        isError: false,
      };
    },
    onUpdateClientPaymentSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        updateClientData: {},
        postMessage: "",
        error: {},
        isError: false,
      };
    },
    onUpdateClientPaymentSubmitSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        updateClientData: data,
        error: {},
        postMessage: message,
        status_code,
      };
    },
    onUpdateClientPaymentSubmitError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        updateClientData: data,
        postMessage: message,
        status_code,
      };
    },
    onUpdateClientPaymentReset: (state) => {
      return {
        ...state,
        isLoading: false,
        updateClientData: {},
        postMessage: "",
        error: {},
        status_code: 400,
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
