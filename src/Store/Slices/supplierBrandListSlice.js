import { createSlice } from "@reduxjs/toolkit";

export const supplierBrandListSlice = createSlice({
  name: "supplierBrandList",
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: "",
  },
  reducers: {
    onUpdateSupplierBrandList: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: {},
        error: {},
        message: "",
      };
    },

    onUpdateSupplierBrandListSuccess: (state, { payload }) => {
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

    onUpdateSupplierBrandListError: (state, { payload }) => {
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

    onGetSupplierBrandList: (state) => {
      return { ...state, isLoading: true, data: [], message: '', error: {}, isError: false };
    },
    onGetSupplierBrandListSuccess: (state, { payload }) => {
      const { data = [], message = '', status_code } = payload;
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
    onGetSupplierBrandListError: (state, { payload }) => {
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
export const {
  onUpdateSupplierBrandList,
  onUpdateSupplierBrandListSuccess,
  onUpdateSupplierBrandListError, 
  onGetSupplierBrandList, 
  onGetSupplierBrandListSuccess, 
  onGetSupplierBrandListError, 
 } =
supplierBrandListSlice.actions;

export default supplierBrandListSlice.reducer;
