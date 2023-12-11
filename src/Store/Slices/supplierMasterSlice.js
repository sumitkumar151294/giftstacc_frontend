import { createSlice } from "@reduxjs/toolkit";

export const supplierMasterSlice = createSlice({
  name: "supplierMaster",
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: "",
  },
  reducers: {
    onVendorSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: {},
        error: {},
        message: "",
      };
    },

    onVendorSubmitSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        data,
        message,
        status_code,
        error: {},
      };
    },

    onVendorSubmitError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        data,
        message,
        status_code,
        isLoading: false,
        isError: true,
        error: {},
      };
    },

    onGetSupplierList: (state) => {
      return { ...state, isLoading: true, data: {}, message: '', error: {}, isError: false };
    },
    onGetSupplierListSuccess: (state, { payload }) => {
      const { data = {}, message = '', status_code } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        data,
        error: {},
        message,
        status_code
      };
    },
    onGetSupplierListError: (state, { payload }) => {
      const { data = {}, message = '', status_code } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        data:data,
        message,
        status_code
      };
    },

  },
});
export const { onVendorSubmit, onVendorSubmitSuccess, onVendorSubmitError, onGetSupplierList, onGetSupplierListSuccess, onGetSupplierListError } =
supplierMasterSlice.actions;

export default supplierMasterSlice.reducer;
