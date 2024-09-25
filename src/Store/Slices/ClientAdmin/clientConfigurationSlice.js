import { createSlice } from "@reduxjs/toolkit";

export const clientConfigurationSlice = createSlice({
  name: "clientConfiguration",
  initialState: {
    isLoading: false,
    isError: false,
    clientConfigurationData: [],
    error: [],
    message: "",
  },
  reducers: {
    onClientConfigurationSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        clientConfigurationData: [],
        message: "",
        error: [],
        isError: false,
      };
    },
    onClientConfigurationSubmitSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        clientConfigurationData: data,
        error: [],
        message,
        status_code,
      };
    },
    onClientConfigurationSubmitError: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        clientConfigurationData: data,
        message,
        status_code,
      };
    },
    onClientConfigurationReset: (state) => {
      return {
        ...state,
        isLoading: false,
        clientConfigurationData: [],
        message: "",
        error: [],
        status_code: null,
        isError: false,
      };
    },
    onPostClientConfigurationSubmit: (state) => {
      return {
        ...state,
        postClientLoading: true,
        postClientConfigurationData: [],
        postMessage: "",
        error: [],
        isError: false,
      };
    },
    onPostClientConfigurationSubmitSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code= 200 } = payload;
      return {
        ...state,
        postClientLoading: false,
        isError: false,
        postClientConfigurationData: postData,
        error: [],
        postMessage: message,
        post_status_code: status_code,
      };
    },
    onPostClientConfigurationSubmitError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postClientLoading: false,
        isError: true,
        postClientConfigurationData: postData,
        postMessage: message,
        post_status_code: status_code,
      };
    },
    onPostClientConfigurationReset: (state) => {
      return {
        ...state,
        postClientConfigurationData: [],
        postMessage: "",
        post_status_code: null,
        postClientLoading: false,
        error: [],
        isError: false,
      };
    },
    onUpdateClientConfigurationSubmit: (state) => {
      return {
        ...state,
        updateLoading: true,
        updateClientConfigurationData: [],
        updateMessage: "",
        error: [],
        isError: false,
        update_status_code: null,
      };
    },
    onUpdateClientConfigurationSubmitSuccess: (state, { payload }) => {
      const { updateData = [], message = "", status_code= 200 } = payload;
      return {
        ...state,
        updateLoading: false,
        isError: false,
        updateClientConfigurationData: updateData,
        error: [],
        updateMessage: message,
        update_status_code: status_code,
      };
    },
    onUpdateClientConfigurationSubmitError: (state, { payload }) => {
      const { updateData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updateLoading: false,
        isError: true,
        updateClientConfigurationData: updateData,
        updateMessage: message,
        update_status_code: status_code,
      };
    },
    onUpdateClientConfigurationReset: (state) => {
      return {
        ...state,
        updateLoading: false,
        updateClientConfigurationData: [],
        updateMessage: "",
        error: [],
        update_status_code: null,
        isError: false,
      };
    },
  },
});

export const {
  onUpdateClientConfigurationReset,
  onUpdateClientConfigurationSubmitError,
  onUpdateClientConfigurationSubmitSuccess,
  onUpdateClientConfigurationSubmit,
  onPostClientConfigurationSubmit,
  onPostClientConfigurationSubmitSuccess,
  onPostClientConfigurationSubmitError,
  onPostClientConfigurationReset,
  onClientConfigurationSubmit,
  onClientConfigurationSubmitError,
  onClientConfigurationSubmitSuccess,
  onClientConfigurationReset,
} = clientConfigurationSlice.actions;

export default clientConfigurationSlice.reducer;
