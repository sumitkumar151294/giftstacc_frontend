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
            const { getData = {}, message, status_code } = payload;
            return {
              ...state,
              getData:getData,
              message:message,
              status_code:status_code
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
            const { updateData = {}, updateMessage = "", update_status_code = 200 } = payload;
            return {
              ...state,
              updateData: updateData,  
              updateMessage:updateMessage,
              update_status_code:update_status_code
            };
          },    
          onUpdateOfferMasterError: (state, { payload }) => {
            const {updateData = {}, updateMessage = "", update_status_code = 400 } = payload;
            return {
              ...state,
              updateData: updateData,  
              updateMessage:updateMessage,
              update_status_code:update_status_code
            };
          },
          onUpdateOfferMasterReset: (state) => {
            return {
              ...state,
              updateData: {}, 
              updateMessage:"",
              update_status_code:null
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
    onUpdateOfferMasterReset,
} = offerMasterSlice.actions;

export default offerMasterSlice.reducer;
