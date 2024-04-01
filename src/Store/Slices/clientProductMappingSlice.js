import { createSlice } from "@reduxjs/toolkit";

export const clientProductMappingSlice = createSlice({
  name: "clientProductMapping",
  initialState: {
    isLoading: false,
    isError: false,
    clientData: [],
    error: {},
    message: "",
  },
  reducers: {
    onGetAllClientProductMapping: (state) => {
      return {
        ...state,
        isLoading: true,
        clientData: [],
        message: "",
        error: {},
        isError: false,
      };
    },
    onGetAllClientProductMappingSuccess: (state, { payload }) => {
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
    onGetAllClientProductMappingError: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        clientData: data,
        message,
        status_code,
      };
    },
    onClientProductMappingSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        clientData: [],
        message: "",
        error: {},
        isError: false,
      };
    },
    onClientProductMappingSubmitSuccess: (state, { payload }) => {
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
    onClientProductMappingSubmitError: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        clientData: data,
        message,
        status_code,
      };
    },
    onClientProductMappingReset: (state) => {
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
    onPostClientProductMappingSubmit: (state) => {
            return {
        ...state,
        postClientLoading: true,
        postClientData: {},
        post_status_code:null,
        message: "",
        error: {},
        isError: false,
      };
    },
    onPostClientProductMappingSubmitSuccess: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        postClientLoading: false,
        isError: false,
        postClientData:postData,
        error: {},
        message:message,
        post_status_code:status_code,
      };
    },
    onPostClientProductMappingSubmitError: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        postClientLoading: false,
        isError: true,
        postClientData: postData,
        message:message,
        post_status_code:status_code,
      };
    },
    onPostClientProductMappingReset: (state) => {
      return {
        ...state,
        postClientData: {},
        message: "",
        post_status_code: null,
        postClientLoading: false,
        error: {},
        isError: false,
      };
    },
    onUpdateClientProductMappingSubmit: (state) => {
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
    onUpdateClientProductMappingSubmitSuccess: (state, { payload }) => {
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
    onUpdateClientProductMappingSubmitError: (state, { payload }) => {
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
    onUpdateClientProductMappingReset: (state) => {
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
  onGetAllClientProductMapping,
  onGetAllClientProductMappingSuccess,
  onGetAllClientProductMappingError,
  onUpdateClientProductMappingReset,
  onUpdateClientProductMappingSubmitError,
  onUpdateClientProductMappingSubmitSuccess,
  onUpdateClientProductMappingSubmit,
  onPostClientProductMappingSubmit,
  onPostClientProductMappingSubmitSuccess,
  onPostClientProductMappingSubmitError,
  onPostClientProductMappingReset,
  onClientProductMappingSubmit,
  onClientProductMappingSubmitError,
  onClientProductMappingSubmitSuccess,
  onClientProductMappingReset,
} = clientProductMappingSlice.actions;

export default clientProductMappingSlice.reducer;
