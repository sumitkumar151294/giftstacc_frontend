import { createSlice } from "@reduxjs/toolkit";

export const userMasterSlice = createSlice({
  name: "userMaster",
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: "",
  },
  reducers: {
    onUserSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        postdata: {},
        error: {},
        message: "",
      };
    },

    onUserSubmitSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        postdata:data,
        message,
        status_code,
        error: {},
      };
    },

    onUserSubmitReset: (state) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        postdata: {},
        message:"",
        status_code:"",
        error: {},
      };
    },

    onUserSubmitError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        postdata:data,
        message,
        status_code,
        isLoading: false,
        isError: true,
        error: {},
      };
    },

    onGetUser: (state) => {
      return { ...state, isLoading: true, data: {}, getmessage: '', error: {}, isError: false };
    },
    onGetUserSuccess: (state, { payload }) => {
      const { data = {}, message = '', status_code } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        data,
        error: {},
        getmessage:message,
        status_code
      };
    },
    onGetUserError: (state, { payload }) => {
      const { data = {}, message = '', status_code } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        data:data,
        getmessage:message,
        status_code
      };
    },

  },
});
export const { onUserSubmit, onUserSubmitReset, onUserSubmitError, onUserSubmitSuccess, onGetUser, onGetUserSuccess, onGetUserError } =
  userMasterSlice.actions;

export default userMasterSlice.reducer;
