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
        status_code: null,
      };
    },

    onClientLoginSubmitSuccess: (state, { payload }) => {
      const { data, message, status_code = 201 } = payload;
      return {
        ...state,
        data,
        isLoading: false,
        status_code,
        message,
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
      };
    },
  },
});
export const {
  onClientLoginSubmit,
  onClientLoginSubmitError,
  onClientLoginSubmitSuccess,
  onLogout,
} = clientLoginSlice.actions;

export default clientLoginSlice.reducer;
