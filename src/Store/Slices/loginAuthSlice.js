import { createSlice } from "@reduxjs/toolkit";

export const loginAuthSlice = createSlice({
  name: "loginAuth",
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: "",
  },
  reducers: {
    onLoginAuthSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: {},
        error: {},
        message: "",
      };
    },

    onLoginAuthSuccess: (state, { payload }) => {
      debugger
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

    onLoginAuthError: (state, { payload }) => {
      debugger
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
export const { onLoginAuthSubmit, onLoginAuthError, onLoginAuthSuccess } =
loginAuthSlice.actions;

export default loginAuthSlice.reducer;
