import { createSlice } from "@reduxjs/toolkit";

export const allocateBrandSlice = createSlice({
  name: "allocate-brand",
  initialState: {
    clientData: {},
  },
  reducers: {
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
        allocateData:data,
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
        postAllocateData:postData,
        postMessage:message,
        post_status_code:status_code,
      };
    },
    onUpdateAllocateBrandError: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        postAllocateData: postData,
        postMessage:message,
        post_status_code:status_code,
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
} = allocateBrandSlice.actions;

export default allocateBrandSlice.reducer;
