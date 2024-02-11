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
        status_code: null,
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
      const { postData = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        postClientLoading: false,
        isError: false,
        postClientData:postData,
        error: {},
        postMessage:message,
        status_code,
      };
    },
    onPostClientMasterSubmitError: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        postClientLoading: false,
        isError: true,
        postClientData: postData,
        postMessage:message,
        status_code,
      };
    },
    onPostClientMasterReset: (state) => {
      return {
        ...state,
        postClientData: {},
        postMessage: "",
        status_code: null,
        postClientLoading: false,
        error: {},
        isError: false,
      };
    },
    onUpdateClientMasterSubmit: (state) => {
      return {
        ...state,
        updateLoading: true,
        updateClientData: {},
        postMessage: "",
        error: {},
        isError: false,
      };
    },
    onUpdateClientMasterSubmitSuccess: (state, { payload }) => {
      const { updateData = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        updateLoading: false,
        isError: false,
        updateClientData:updateData,
        error: {},
        postMessage:message,
        status_code,
      };
    },
    onUpdateClientMasterSubmitError: (state, { payload }) => {
      const { updateData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        updateLoading: false,
        isError: true,
        updateClientData: updateData,
        postMessage:message,
        status_code,
      };
    },
    onUpdateClientMasterReset: (state) => {
      return {
        ...state,
        updateLoading: false,
        updateClientData: {},
        postMessage: "",
        error: {},
        status_code: null,
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
