import { createSlice } from "@reduxjs/toolkit";

export const userRoleSlice = createSlice({
  name: "user-role",
  initialState: {
    isLoading: false,
    isError: false,
    userRoleData: {},  
    error: {},
    message: "",
  },
  reducers: {
    onGetUserRole: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        userRoleData: {},  
        error: {},
        message: "",
      };
    },

    onGetUserRoleSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        userRoleData: data,  
        message,
        status_code,
        error: {},
      };
    },

    onGetUserRoleError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        userRoleData: data,  
        message,
        status_code,
        isLoading: false,
        isError: true,
        error: {},
      };
    },

    onPostUserRole: (state) => {
      return {
        ...state,
        postLoading: true,
        isError: false,
        postRoleData: {},  
        error: {},
        message: "",
      };
    },

    onPostUserRoleSuccess: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        postLoading: false,
        isError: false,
        postRoleData: postData,
        message,
        status_code,
        error: {},
      };
    },

    onPostUserRoleError: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        postRoleData: postData, 
        message,
        status_code,
        postLoading: false,
        isError: true,
        error: {},
      };
    },
    onPostUserRoleReset: (state) => {
      return {
        ...state,
        postRoleData: {}, 
        message:"",
        status_code:null,
        postLoading: false,
        isError: false,
        error: {},
      };
    },

    onUpdateUserRole: (state) => {
      return {
        ...state,
        updateLoading: true,
        isError: false,
        updatedUserRoleData: {},  
        error: {},
        message: "",
      };
    },

    onUpdateUserRoleSuccess: (state, { payload }) => {
      const { message = "", status_code = 200 } = payload;
      return {
        ...state,
        updateLoading: false,
        isError: false,
        message,
        status_code,
        error: {},
      };
    },

    onUpdateUserRoleError: (state, { payload }) => {
      const { message = "", status_code = 400 } = payload;
      return {
        ...state,
        message,
        status_code,
        updateLoading: false,
        isError: true,
        error: {},
      };
    },
    onUpdateUserRoleReset: (state, { payload }) => {
      return {
        ...state,
        message:"",
        status_code:null,
        updateLoading: false,
        isError: false,
      };
    },
  },
});

export const {
  onGetUserRole,
  onGetUserRoleSuccess,
  onGetUserRoleError,
  onPostUserRole,
  onPostUserRoleSuccess,
  onPostUserRoleError,
  onUpdateUserRole,
  onUpdateUserRoleSuccess,
  onUpdateUserRoleError,
  onUpdateUserRoleReset,
  onPostUserRoleReset
} = userRoleSlice.actions;

export default userRoleSlice.reducer;
