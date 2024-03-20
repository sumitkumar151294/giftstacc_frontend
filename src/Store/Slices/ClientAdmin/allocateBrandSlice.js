import { createSlice } from "@reduxjs/toolkit";

export const allocateBrandSlice = createSlice({
  name: "allocate-brand",
  initialState: {
    clientData: {},
  },
  reducers: {
    onGetAllocateBrand: (state) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        getAllocateBrandData: {},
        error: {},
        message: "",
      };
    },
    onGetAllocateBrandSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        getAllocateBrandData: data,
        message,
        status_code,
      };
    },
    onGetAllocateBrandError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        getAllocateBrandData: data,
        message,
        status_code,
      };
    },
    onPostAllocateBrand: (state) => {
      return {
        ...state,
        allocateData: {},
        message: "",
      };
    },
    onPostAllocateBrandSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        allocateData: data,
        message,
        status_code,
      };
    },
    onPostAllocateBrandError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        allocateData: data,
        message,
        status_code,
      };
    },
    onUpdateAllocateBrand: (state) => {
      return {
        ...state,
        postAllocateData: {},
        postMessage: "",
      };
    },
    onUpdateAllocateBrandSuccess: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        postAllocateData: postData,
        postMessage: message,
        post_status_code: status_code,
      };
    },
    onUpdateAllocateBrandError: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        postAllocateData: postData,
        postMessage: message,
        post_status_code: status_code,
      };
    },
    onAllocateBrandById: (state) => {
      return {
        ...state,
        getAllocateBrandsById: {},
        getAllocateBrandsByIdMessage: "",
      };
    },
    onAllocateBrandByIdSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        getAllocateBrandsById: data,
        getAllocateBrandsByIdMessage: message,
        getAllocateBrandsById_status_code: status_code,
      };
    },
    onAllocateBrandByIdError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        getAllocateBrandsById: data,
        getAllocateBrandsByIdMessage: message,
        getAllocateBrandsById_status_code: status_code,
      };
    },
    onUpdateAllocateBrandById: (state) => {
      return {
        ...state,
        updateAllocateBrandById: {},
        updateMessage: "",
      };
    },
    onUpdateAllocateBrandByIdSuccess: (state, { payload }) => {
      const { updateData = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        updateAllocateBrandById: updateData,
        updateMessage: message,
        update_status_code: status_code,
      };
    },
    onUpdateAllocateBrandByIdError: (state, { payload }) => {
      const { updateData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        updateAllocateBrandById: updateData,
        updateMessage: message,
        update_status_code: status_code,
      };
    },
    onUpdateAllocateBrandByIdReset: (state) => {
      return {
        ...state,
        updateLoading: false,
        updateAllocateBrandById: {},
        updateMessage: "",
        error: {},
        update_status_code: null,
        isError: false,
      };
    },
  },
});

export const {
  onPostAllocateBrand,
  onPostAllocateBrandSuccess,
  onPostAllocateBrandError,
  onUpdateAllocateBrand,
  onUpdateAllocateBrandSuccess,
  onUpdateAllocateBrandError,
  onGetAllocateBrandError,
  onGetAllocateBrand,
  onGetAllocateBrandSuccess,
  onAllocateBrandById,
  onAllocateBrandByIdError,
  onAllocateBrandByIdSuccess,
  onUpdateAllocateBrandByIdError,
  onUpdateAllocateBrandByIdSuccess,
  onUpdateAllocateBrandById,
  onUpdateAllocateBrandByIdReset
} = allocateBrandSlice.actions;

export default allocateBrandSlice.reducer;
