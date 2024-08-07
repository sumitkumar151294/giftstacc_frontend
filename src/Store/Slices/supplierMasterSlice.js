import { createSlice } from "@reduxjs/toolkit";

export const supplierMasterSlice = createSlice({
  name: "supplierMaster",
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    error: [],
    message: "",
  },
  reducers: {
    onVendorSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        postData: [],
        message: "",
        post_status_code: null
      };
    },

    onVendorSubmitSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        postData: data,
        message,
        post_status_code: status_code,
      };
    },

    onVendorSubmitError: (state, { payload }) => {
      const { data = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postData: data,
        message,
        post_status_code: status_code,
        isLoading: false,
        isError: true,
      };
    },
    onVendorReset: (state, { payload }) => {
      return {
        ...state,
        message: "",
        post_status_code: null,
        isLoading: false,
        isError: true,
      };
    },

    onGetSupplierList: (state) => {
      return { ...state, getSupplierLoading: true, data: [], message: '', error: [], isError: false, status_code: null };
    },
    onGetSupplierListSuccess: (state, { payload }) => {
      const { data = [], message = '', status_code } = payload;
      return {
        ...state,
        getSupplierLoading: false,
        isError: false,
        data,
        error: [],
        message,
        status_code
      };
    },
    onGetSupplierListError: (state, { payload }) => {
      const { data = [], message = '', status_code } = payload;
      return {
        ...state,
        getSupplierLoading: false,
        isError: true,
        data: data,
        message,
        status_code
      };
    },
    onUpdateSupplierList: (state) => {
      return { ...state, putSupplierLoading: true, updateData: [], message: '', error: [], isError: false, update_status_code: null };
    },
    onUpdateSupplierListSuccess: (state, { payload }) => {
      const { data = [], message = '', status_code } = payload;
      return {
        ...state,
        putSupplierLoading: false,
        isError: false,
        updateData: data,
        error: [],
        message,
        update_status_code: status_code
      };
    },
    onUpdateSupplierListError: (state, { payload }) => {
      const { data = [], message = '', status_code } = payload;
      return {
        ...state,
        putSupplierLoading: false,
        isError: true,
        updateData: data,
        message,
        update_status_code: status_code
      };
    },
    onUpdateSupplierListReset: (state, { payload }) => {
      return {
        ...state,
        putSupplierLoading: false,
        isError: false,
        data: [],
        message: "",
        update_status_code: null
      };
    },

  },
});
export const { onUpdateSupplierList, onUpdateSupplierListSuccess, onUpdateSupplierListError, onVendorSubmit, onVendorSubmitSuccess, onVendorSubmitError, onGetSupplierList, onGetSupplierListSuccess, onGetSupplierListError, onVendorReset, onUpdateSupplierListReset } =
  supplierMasterSlice.actions;

export default supplierMasterSlice.reducer;
