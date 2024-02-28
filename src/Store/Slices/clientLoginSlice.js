import { createSlice } from "@reduxjs/toolkit";

export const clientLoginSlice = createSlice({
  name: "clientLogin",
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: "",
  },
  reducers: {
    onClientLoginSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: {},
        status_code:null
      };
    },

    onClientLoginSubmitSuccess: (state, { payload }) => {
      const { data, message, status_code = 200 } = payload;
      return {
        ...state,
        data,
        isLoading: false,
        isError: false,
        status_code,
        message,
        error: {},
      };
    },

    onClientLoginSubmitError: (state, { payload }) => {
      const { message, status_code = 400 } = payload;
      return {
        ...state,
        status_code,
        isLoading: false,
        isError: true,
        message,
        error: {},
      };
    },
    onClientLogout: (state) => {
      return {
        data: {},
        isError: false,
        isLoading: false,
        error: {},
        message: "",
      };
    },
  },
});
export const { onClientLoginSubmit, onClientLoginSubmitError, onClientLoginSubmitSuccess,onLogout  } =
  clientLoginSlice.actions;

export default clientLoginSlice.reducer;
