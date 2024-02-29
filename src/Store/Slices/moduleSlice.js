import { createSlice } from "@reduxjs/toolkit";

export const moduleSlice = createSlice({
  name: "module",
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: "",
    filteredData: [],
  },
  reducers: {
    allowModules:(state , { payload }) => {
      return{
        ...state,
        filteredData: payload,
      }
    }, 
    onGetModule: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: {},
        error: {},
        message: "",
      };
    },

    onGetModuleSuccess: (state, { payload }) => {
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

    onGetModuleError: (state, { payload }) => {
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
  },
});
export const { onGetModule, onGetModuleSuccess, onGetModuleError, allowModules} =
moduleSlice.actions;

export default moduleSlice.reducer;
