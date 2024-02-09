import { createSlice } from "@reduxjs/toolkit";

export const clientMasterSlice = createSlice({
  name: "clientMaster",
  initialState: {
    isLoading: false,
    isError: false,
    clientData: {},
    error: {},
    message: "",
  },
  reducers: {
    onClientMasterSubmit: (state) => {
      return {    
        ...state,
        isLoading: true,
        clientData: {},
        message: "",
        error: {},
        isError: false,
      };
    },
    onClientMasterSubmitSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        clientData:data,
        error: {},
        message,
        status_code,
      };
    },
    onClientMasterSubmitError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        clientData: data,
        message,
        status_code,
      };
    },
    onClientMasterReset: (state) => {
      return {
        ...state,
        isLoading: false,
        clientData: {},
        message: "",
        error: {},
        status_code: 400,
        isError: false,
      };
    },
    onPostClientMasterSubmit: (state) => {
      return {
        ...state,
        postClientLoading: true,
        postClientData: {},
        postMessage: "",
        error: {},
        isError: false,
      };
    },
    onPostClientMasterSubmitSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        postClientLoading: false,
        isError: false,
        postClientData:data,
        error: {},
        postMessage:message,
        status_code,
      };
    },
    onPostClientMasterSubmitError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        postClientLoading: false,
        isError: true,
        postClientData: data,
        postMessage:message,
        status_code,
      };
    },
    onPostClientMasterReset: (state) => {
      return {
        ...state,
        postClientLoading: false,
        postClientData: {},
        postMessage: "",
        error: {},
        status_code: 400,
        isError: false,
      };
    },
    onUpdateClientMasterSubmit: (state) => {
      return {
        ...state,
        updateClientLoading: true,
        updateClientData: {},
        postMessage: "",
        error: {},
        isError: false,
      };
    },
    onUpdateClientMasterSubmitSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        updateClientLoading: false,
        isError: false,
        updateClientData:data,
        error: {},
        postMessage:message,
        status_code,
      };
    },
    onUpdateClientMasterSubmitError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        updateClientLoading: false,
        isError: true,
        updateClientData: data,
        postMessage:message,
        status_code,
      };
    },
    onUpdateClientMasterReset: (state) => {
      return {
        ...state,
        updateClientLoading: false,
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
  onUpdateClientMasterReset,
  onUpdateClientMasterSubmitError,
  onUpdateClientMasterSubmitSuccess,
  onUpdateClientMasterSubmit,
  onPostClientMasterSubmit,
  onPostClientMasterSubmitSuccess,
  onPostClientMasterSubmitError,
  onPostClientMasterReset,
  onClientMasterSubmit,
  onClientMasterSubmitError,
  onClientMasterSubmitSuccess,
  onClientMasterReset,
} = clientMasterSlice.actions;

export default clientMasterSlice.reducer;
