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
        data: {},
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
        data,
        message,
        status_code,
        error: {},
      };
    },

    onUserSubmitError: (state, { payload }) => {
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
export const { onUserSubmit, onUserSubmitError, onUserSubmitSuccess } =
  userMasterSlice.actions;

export default userMasterSlice.reducer;
