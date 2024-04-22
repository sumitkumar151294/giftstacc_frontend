import { createSlice } from "@reduxjs/toolkit";


export const addSpecialSlice = createSlice({
    name: "addSpecial",
    initialState: {
        isLoading:false,
        data: {},
    },
    reducers: {
        onAddSpecialSubmit: (state) => {
            return {
                ...state,
                isLoading:true,
                postdata: {},
            };
        },

        onAddSpecialSubmitSuccess: (state, { payload }) => {
            const { postData = {}, message = "", status_code = 200 } = payload;
            return {
                ...state,
                isLoading:false,
                postdata: postData,
                message,
                status_code,
            };
        },

        onAddSpecialSubmitReset: (state) => {
            return {
                ...state,
                status_code: null,
            };
        },

        onAddSpecialSubmitError: (state, { payload }) => {
            const { postData = {}, message = "", status_code = 400 } = payload;
            return {
                ...state,
                isLoading:false,
                postdata: postData,
                message,
                status_code,
            };
        },

        onGetAddSpecial: (state) => {
            return {
                ...state,
                isLoading:false,
                getData: {},
                getmessage: ''
            };
        },
        onGetAddSpecialSuccess: (state, { payload }) => {
            const { data = {}, message = '', status_code } = payload;
            return {
                ...state,
                getData: data,
                getmessage: message,
                status_code
            };
        },
        onGetAddSpecialError: (state, { payload }) => {
            const { data = {}, message, status_code } = payload;
            return {
                ...state,
                getData: data,
                getmessage: message,
                status_code
            };
        },
        onAddSpecialUpdate: (state) => {
            return {
                ...state,
                updatedUserData: {},
                isLoading:true,
                message: "",
                status_code: null
            };
        },

        onAddSpecialUpdateSuccess: (state, { payload }) => {
            const { updateData = {}, message = "", status_code = 200 } = payload;
            return {
                ...state,
                isLoading:false,
                updatedUserData: updateData,
                message,
                status_code,
            };
        },

        onAddSpecialUpdateError: (state, { payload }) => {
            const { updateData = {}, message = "", status_code = 400 } = payload;
            return {
                ...state,
                isLoading:false,
                updatedUserData: updateData,
                message,
                status_code,
            };
        },

    },
});
export const { onAddSpecialSubmit, onAddSpecialSubmitSuccess, onAddSpecialSubmitError, onAddSpecialSubmitReset, onGetAddSpecial, onGetAddSpecialSuccess, onGetAddSpecialError, onAddSpecialUpdate, onAddSpecialUpdateSuccess, onAddSpecialUpdateError } =
    addSpecialSlice.actions;

export default addSpecialSlice.reducer;
