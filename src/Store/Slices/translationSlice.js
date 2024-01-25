import { createSlice } from "@reduxjs/toolkit";

export const translationSlice = createSlice({
  name: "translation",
  initialState: {
    isLoading: false,
    isError: false,
    data: {},
    error: {},
    message: "",
  },
  reducers: {
    onTranslationSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: {},
        error: {},
        message: "",
      };
    },

    onTranslationSubmitSuccess: (state, { payload }) => {
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

    onTranslationSubmitError: (state, { payload }) => {
  
      const { data = {}, message = "", status_code = 401 } = payload;
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
  onTranslationSubmit,
  onTranslationSubmitError,
  onTranslationSubmitSuccess,
} = translationSlice.actions;

export default translationSlice.reducer;