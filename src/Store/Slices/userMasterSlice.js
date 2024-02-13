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
        postMessage: "",
        postdata: {},
      };
    },

    onUserSubmitSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code  } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        postdata: data,
        postMessage:message,
        post_status_code:status_code,
      };
    },

    

    onUserSubmitError: (state, { payload }) => {
      const { data = {}, message = "", status_code } = payload;
      return {
        ...state,
        postdata: data,
        postMessage:message,
        post_status_code:status_code,
        isLoading: false,
        isError: true,
      };
    },
    onUserSubmitReset: (state) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        postdata: {},
        postMessage:"",
        post_status_code:null,
      };
    },
    onGetUser: (state) => {
      return {
        ...state,
        isLoading: true,
        getData: {},
        getmessage: "",
        isError: false,
        status_code: null 
      };
    },
    onGetUserSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        getData: data,
        getmessage: message,
        get_status_code :status_code,
      };
    },
    onGetUserError: (state, { payload }) => {
      const { data = {}, message = "", status_code } = payload;
      return {
        ...state,
        isLoading: false,
        isError: true,
        getData: data,
        getmessage: message,
        get_status_code :status_code,
      };
    },
    onUserUpdate: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        updatedUserData: {},
        message: "",
      };
    },

    onUserUpdateSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code  } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        updatedUserData: data,
        updateMessage:message,
        update_status_code:status_code,
      };
    },

    onUserUpdateError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        updatedUserData: data,
        updateMessage:message,
        update_status_code:status_code,
        isLoading: false,
        isError: true,
      };
    },
    onUserUpdateReset: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        postdata: {},
        updateMessage:"",
        update_status_code:null,
      };
    },
  },
});
export const {
  onUserSubmit,
  onUserUpdateReset,
  onUserSubmitReset,
  onUserSubmitError,
  onUserSubmitSuccess,
  onGetUser,
  onGetUserSuccess,
  onGetUserError,
  onUserUpdate,
  onUserUpdateSuccess,
  onUserUpdateError,
} = userMasterSlice.actions;

export default userMasterSlice.reducer;
