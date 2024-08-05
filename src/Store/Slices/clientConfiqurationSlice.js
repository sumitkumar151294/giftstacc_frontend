import { createSlice } from "@reduxjs/toolkit";

export const clientConfigurationSlice = createSlice({
  name: "clientConfiquration",
  initialState: {
    isLoading: false,
    isError: false,
    clientConfiqurationData: [],
    error: [],
    message: "",
  },
  reducers: {
    onClientConfiqurationSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        clientConfiqurationData: [],
        message: "",
        error: [],
        isError: false,
      };
    },
    onClientConfiqurationSubmitSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        clientConfiqurationData:data,
        error: [],
        message,
        status_code,
      };
    },
    onClientConfiqurationSubmitError: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        clientConfiqurationData: data,
        message,
        status_code,
      };
    },
    onClientConfiqurationReset: (state) => {
      return {
        ...state,
        isLoading: false,
        clientConfiqurationData: [],
        message: "",
        error: [],
        status_code: null,
        isError: false,
      };
    },
    onPostClientConfiqurationSubmit: (state) => {
            return {
        ...state,
        postClientLoading: true,
        postClientConfiqurationData: [],
        postMessage: "",
        error: [],
        isError: false,
      };
    },
    onPostClientConfiqurationSubmitSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        postClientLoading: false,
        isError: false,
        postClientConfiqurationData:postData,
        error: [],
        postMessage:message,
        post_status_code:status_code,
      };
    },
    onPostClientConfiqurationSubmitError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postClientLoading: false,
        isError: true,
        postClientConfiqurationData: postData,
        postMessage:message,
        post_status_code:status_code,
      };
    },
    onPostClientConfiqurationReset: (state) => {
      return {
        ...state,
        postClientConfiqurationData: [],
        postMessage: "",
        post_status_code: null,
        postClientLoading: false,
        error: [],
        isError: false,
      };
    },
    onUpdateClientConfiqurationSubmit: (state) => {
      return {
        ...state,
        updateLoading: true,
        updateClientConfiqurationData: [],
        updateMessage: "",
        error: [],
        isError: false,
        update_status_code:null
      };
    },
    onUpdateClientConfiqurationSubmitSuccess: (state, { payload }) => {
      const { updateData = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        updateLoading: false,
        isError: false,
        updateClientConfiqurationData:updateData,
        error: [],
        updateMessage:message,
        update_status_code:status_code,
      };
    },
    onUpdateClientConfiqurationSubmitError: (state, { payload }) => {
      const { updateData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updateLoading: false,
        isError: true,
        updateClientConfiqurationData: updateData,
        updateMessage:message,
        update_status_code:status_code,
      };
    },
    onUpdateClientConfiqurationReset: (state) => {
      return {
        ...state,
        updateLoading: false,
        updateClientConfiqurationData: [],
        updateMessage: "",
        error: [],
        update_status_code: null,
        isError: false,
      };
    },
  },
});

export const {
  onUpdateClientConfiqurationReset,
  onUpdateClientConfiqurationSubmitError,
  onUpdateClientConfiqurationSubmitSuccess,
  onUpdateClientConfiqurationSubmit,
  onPostClientConfiqurationSubmit,
  onPostClientConfiqurationSubmitSuccess,
  onPostClientConfiqurationSubmitError,
  onPostClientConfiqurationReset,
  onClientConfiqurationSubmit,
  onClientConfiqurationSubmitError,
  onClientConfiqurationSubmitSuccess,
  onClientConfiqurationReset,
} = clientConfigurationSlice.actions;

export default clientConfigurationSlice.reducer;
