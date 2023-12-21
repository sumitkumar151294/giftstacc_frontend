import { createSlice } from "@reduxjs/toolkit";

export const userRoleModuleAccessSlice = createSlice({
  name: "user-role-module-access",
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: "",
  },
  reducers: {
    onGetUserRoleModuleAccess: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: {},
        error: {},
        message: "",
      };
    },

    onGetUserRoleModuleAccessSuccess: (state, { payload }) => {
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

    onGetUserRoleModuleAccessError: (state, { payload }) => {
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

    onPostUserRoleModuleAccess: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: {},
        error: {},
        message: "",
      };
    },

    onPostUserRoleModuleAccessSuccess: (state, { payload }) => {
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

    onPostUserRoleModuleAccessError: (state, { payload }) => {
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

    onUpdateUserRoleModuleAccess: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: {},
        error: {},
        message: "",
      };
    },

    onUpdateUserRoleModuleAccessSuccess: (state, { payload }) => {
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

    onUpdateUserRoleModuleAccessError: (state, { payload }) => {
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
export const { 
  onGetUserRoleModuleAccess, 
  onGetUserRoleModuleAccessSuccess, 
  onGetUserRoleModuleAccessError, 
  onPostUserRoleModuleAccess, 
  onPostUserRoleModuleAccessSuccess, 
  onPostUserRoleModuleAccessError, 
  onUpdateUserRoleModuleAccess, 
  onUpdateUserRoleModuleAccessSuccess, 
  onUpdateUserRoleModuleAccessError
 } = userRoleModuleAccessSlice.actions;

export default userRoleModuleAccessSlice.reducer;
