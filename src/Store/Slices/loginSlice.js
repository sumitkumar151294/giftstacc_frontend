import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: "",
  },
  reducers: {
    onLoginSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: {},
        status_code:null
      };
    },

    onLoginSubmitSuccess: (state, { payload }) => {
      const { message, status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        status_code,
        message,
        error: {},
      };
    },

    onLoginSubmitError: (state, { payload }) => {
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
    onLogout: (state) => {
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
export const { onLoginSubmit, onLoginSubmitError, onLoginSubmitSuccess,onLogout  } =
  loginSlice.actions;

export default loginSlice.reducer;
