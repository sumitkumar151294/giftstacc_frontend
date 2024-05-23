import { createSlice } from "@reduxjs/toolkit";

export const promotionalAllocateBrandSlice = createSlice({
  name: "promotionalAlloocateBrand",
  initialState: {
    isLoading: false,
    data: [],
    message: "",
  },
  reducers: {
    onGetAllPromotionalAllocateBrand: (state) => {
      return {
        ...state,
        getAllLoading: true,
        getAllData: [],
        message: "",
      };
    },
    onGetAllPromotionalAllocateBrandSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        getAllLoading: false,
        getAllData: data,
        message,
        status_code,
      };
    },
    onGetAllPromotionalAllocateBrandError: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        getAllLoading: false,
        getAllData: data,
        message,
        status_code,
      };
    },
    onGetPromotionalAllocateBrandByPromotionalId: (state) => {
      return {
        ...state,
        getByIdLoading: true,
        getAllDataById: [],
        message: "",
      };
    },
    onGetPromotionalAllocateBrandByPromotionalIdSuccess: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        getByIdLoading: false,
        getAllDataById: data,
        message,
        status_code,
      };
    },
    onGetPromotionalAllocateBrandByPromotionalIdError: (state, { payload }) => {
      const { data = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        getByIdLoading: false,
        getAllDataById: data,
        message,
        status_code,
      };
    },
    onGetPromotionalAllocateBrandByPromotionalIdReset: (state) => {
      return {
        ...state,
        getByIdLoading: false,
        getAllDataById: [],
        message: "",
        status_code: null,
      };
    },
    onPostPromotionalAllocateBrand: (state) => {
      return {
        ...state,
        postLoading: true,
        postData: [],
        post_status_code: null,
        message: "",
      };
    },
    onPostPromotionalAllocateBrandSuccess: (state, { payload }) => {
      const { postData = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        postLoading: false,
        postData: postData,
        message: message,
        post_status_code: status_code,
      };
    },
    onPostPromotionalAllocateBrandError: (state, { payload }) => {
      const { postData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        postLoading: false,
        postData: postData,
        message: message,
        post_status_code: status_code,
      };
    },
    onPostPromotionalAllocateBrandReset: (state) => {
      return {
        ...state,
        postData: [],
        message: "",
        post_status_code: null,
        postLoading: false,
      };
    },
    onPutPromotionalAllocateBrand: (state) => {
      return {
        ...state,
        updateLoading: true,
        updateData: [],
        updateMessage: "",
        update_status_code: null,
      };
    },
    onPutPromotionalAllocateBrandSuccess: (state, { payload }) => {
      const { updateData = [], message = "", status_code = 200 } = payload;
      return {
        ...state,
        updateLoading: false,
        updateData: updateData,
        updateMessage: message,
        update_status_code: status_code,
      };
    },
    onPutPromotionalAllocateBrandError: (state, { payload }) => {
      const { updateData = [], message = "", status_code = 400 } = payload;
      return {
        ...state,
        updateLoading: false,
        updateData: updateData,
        updateMessage: message,
        update_status_code: status_code,
      };
    },
    onPutPromotionalAllocateBrandReset: (state) => {
      return {
        ...state,
        updateLoading: false,
        updateData: [],
        updateMessage: "",
        update_status_code: null,
      };
    },
  },
});

export const {
    onGetAllPromotionalAllocateBrand,
    onGetAllPromotionalAllocateBrandSuccess,
    onGetAllPromotionalAllocateBrandError,
    onGetPromotionalAllocateBrandByPromotionalId,
    onGetPromotionalAllocateBrandByPromotionalIdSuccess,
    onGetPromotionalAllocateBrandByPromotionalIdError,
    onGetPromotionalAllocateBrandByPromotionalIdReset,
    onPostPromotionalAllocateBrand,
    onPostPromotionalAllocateBrandSuccess,
    onPostPromotionalAllocateBrandError,
    onPostPromotionalAllocateBrandReset,
    onPutPromotionalAllocateBrand,
    onPutPromotionalAllocateBrandSuccess,
    onPutPromotionalAllocateBrandError,
    onPutPromotionalAllocateBrandReset,
} = promotionalAllocateBrandSlice.actions;

export default promotionalAllocateBrandSlice.reducer;
