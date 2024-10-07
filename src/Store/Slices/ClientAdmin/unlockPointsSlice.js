import { createSlice } from "@reduxjs/toolkit";

export const unlockPointsSlice = createSlice({
  name: "unlockPoints",
  initialState: {
    isLoading: false,
    data: {},
  },
  reducers: {
    onUnlockPointsSubmit: (state) => {
      return {
        ...state,
        isLoading: true,
        postdata: {},
      };
    },

    onUnlockPointsSubmitSuccess: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        postdata: postData,
        message,
        status_code,
      };
    },

    onUnlockPointsSubmitReset: (state) => {
      return {
        ...state,
        status_code: null,
      };
    },

    onUnlockPointsSubmitError: (state, { payload }) => {
      const { postData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        isLoading: false,
        postdata: postData,
        message,
        status_code,
      };
    },

    onGetUnlockPoints: (state) => {
      return {
        ...state,
        isLoading: false,
        getData: {},
        getmessage: "",
      };
    },
    onGetUnlockPointsSuccess: (state, { payload }) => {
      const { data = {}, message = "", status_code } = payload;
      return {
        ...state,
        getData: data,
        getmessage: message,
        status_code,
      };
    },
    onGetUnlockPointsError: (state, { payload }) => {
      const { data = {}, message, status_code } = payload;
      return {
        ...state,
        getData: data,
        getmessage: message,
        status_code,
      };
    },
    onUnlockPointsUpdate: (state) => {
      return {
        ...state,
        updatedUserData: {},
        isLoading: true,
        message: "",
        status_code: null,
      };
    },

    onUnlockPointsUpdateSuccess: (state, { payload }) => {
      const { updateData = {}, message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        updatedUserData: updateData,
        message,
        status_code,
      };
    },

    onUnlockPointsUpdateError: (state, { payload }) => {
      const { updateData = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        isLoading: false,
        updatedUserData: updateData,
        message,
        status_code,
      };
    },
  },
});
export const {
  onUnlockPointsSubmit,
  onUnlockPointsSubmitSuccess,
  onUnlockPointsSubmitError,
  onUnlockPointsSubmitReset,
  onGetUnlockPoints,
  onGetUnlockPointsSuccess,
  onGetUnlockPointsError,
  onUnlockPointsUpdate,
  onUnlockPointsUpdateSuccess,
  onUnlockPointsUpdateError,
} = unlockPointsSlice.actions;

export default unlockPointsSlice.reducer;
