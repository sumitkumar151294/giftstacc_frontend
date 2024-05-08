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
        updateLoading: true,
        message: "",
        updateStatusCode:null
      };
    },

    onUpdateSupplierBrandListSuccess: (state, { payload }) => {
      const { message = "", status_code = 200 } = payload;
      return {
        ...state,
        message,
        updateStatusCode:status_code,
      };
    },

    onUpdateSupplierBrandListError: (state, { payload }) => {
      const {  message = "", status_code = 400 } = payload;
      return {
        ...state,
        message,
        updateStatusCode:status_code,
      };
    },

    onUpdateSupplierBrandListReset: (state) => {
      return {
        ...state,
        message:"",
        updateStatusCode:null,
      };
    },

    onGetSupplierBrandList: (state) => {
      return { ...state, supplierBrandListLoading: true, data: [], message: '', error: {}, isError: false };
    },
    onGetSupplierBrandListSuccess: (state, { payload }) => {
      const { data = [], message = '', status_code } = payload;
      return {
        ...state,
        supplierBrandListLoading: false,
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
        supplierBrandListLoading: false,
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
  onUpdateSupplierBrandListReset
 } =
supplierBrandListSlice.actions;

export default supplierBrandListSlice.reducer;
