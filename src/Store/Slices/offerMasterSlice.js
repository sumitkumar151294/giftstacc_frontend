import { createSlice } from "@reduxjs/toolkit";

export const offerMasterSlice = createSlice({  
    name: "offerMaster",
    initialState: {
        postData:{}
    },
    reducers: {
        onPostOfferMasterSubmit: (state) => {
            return {
              ...state,
              postdata: {},
              message: "",
              status_code:null
            };
        },
        onPostOfferMasterSuccess: (state,{payload}) => {
            const {  postData = {}, message = "", status_code = 200 } = payload;
            return {
               ...state,
               postdata:postData,
               message,
               status_code,
            };
        },
        onPostOfferMasterError: (state,{payload}) => {
            const { postData = {}, message = "", status_code = 400 } = payload;
            return {
               ...state,
               postdata:postData,
               message,
               status_code,
            };
        },
        onPostOfferMasterReset: (state) => {
          return {
            ...state,
            postData: {}, 
            message:"",
            status_code:null
          };
        },
    
        onGetOfferMaster: (state) => {
            return {
              ...state,
              getData: {},
              message: "",
            };
          },
      
          onGetOfferMasterSuccess: (state, { payload }) => {
            const { getData = {}, message = "", status_code = 200 } = payload;
            return {
              ...state,
              getData:getData,
              message,
              status_code,
            };
          },
      
          onGetOfferMasterError: (state, { payload }) => {
            const { getData = {}, message = "", status_code = 400 } = payload;
            return {
              ...state,
              getData:getData,
              message,
              status_code
            };
          },
          onUpdateOfferMaster: (state) => {
            return {
              ...state,
              updateData: {},  
              updateMessage: "",
            };
          },      
          onUpdateOfferMasterSuccess: (state, { payload }) => {
            const { updateData = {}, message = "", status_code = 200 } = payload;
            return {
              ...state,
              updateData: updateData,  
              updateMessage:message,
              update_status_code:status_code
            };
          },    
          onUpdateOfferMasterError: (state, { payload }) => {
            const {updateData = {}, message = "", status_code = 400 } = payload;
            return {
              ...state,
              updateCategoryData: updateData,  
              updateMessage:message,
              update_status_code:status_code
            };
          },
    }
});

export const {onPostOfferMasterSubmit,
    onPostOfferMasterSuccess,
    onPostOfferMasterError,
    onPostOfferMasterReset,
    onGetOfferMaster,
    onGetOfferMasterSuccess,
    onGetOfferMasterError,
    onUpdateOfferMaster,
    onUpdateOfferMasterSuccess,
    onUpdateOfferMasterError,
} = offerMasterSlice.actions;

export default offerMasterSlice.reducer;
