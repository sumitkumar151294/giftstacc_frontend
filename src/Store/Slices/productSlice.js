import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    data: {},
    message: "",
  },
  reducers: {
    onProductByIdSubmit: (state) => {
      return {
        ...state,
        productById: {},
        message: "",
        status_code: null,
        isLoading: true,
      };
    },

    onProductByIdSuccess: (state, { payload }) => {
      const { data, message, status_code = 200 } = payload;
      return {
        ...state,
        productById: data,
        message: message,
        status_code: status_code,
        isLoading: false,
      };
    },

    onProductByIdError: (state, { payload }) => {
      const { message, status_code = 400 } = payload;
      return {
        ...state,
        productById: {},
        message: message,
        status_code: status_code,
        isLoading: false,
      };
    },
  },
});
export const { onProductByIdSubmit, onProductByIdSuccess, onProductByIdError } =
  productSlice.actions;

export default productSlice.reducer;
