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
        clientData: [],
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
        clientData: [],
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
        post_status_code:status_code,
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
        post_status_code:status_code,
      };
    },
    onPostClientMasterReset: (state) => {
      return {
        ...state,
        postClientData: {},
        postMessage: "",
        post_status_code: null,
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
        updateMessage: "",
        error: {},
        isError: false,
        update_status_code:null
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
        updateMessage:message,
        update_status_code:status_code,
      };
    },
    onUpdateClientMasterSubmitError: (state, { payload }) => {
      const { updateData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        updateLoading: false,
        isError: true,
        updateClientData: updateData,
        updateMessage:message,
        update_status_code:status_code,
      };
    },
    onUpdateClientMasterReset: (state) => {
      return {
        ...state,
        updateLoading: false,
        updateClientData: {},
        updateMessage: "",
        error: {},
        update_status_code: null,
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
