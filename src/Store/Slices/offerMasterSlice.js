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
            const { postData = {}, message = "", status_code = 200 } = payload;
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
    }
});

export const {onPostOfferMasterSubmit,
    onPostOfferMasterSuccess,
    onPostOfferMasterError,
    onPostOfferMasterReset,
    onGetOfferMaster,
    onGetOfferMasterSuccess,
    onGetOfferMasterError,
} = offerMasterSlice.actions;

export default offerMasterSlice.reducer;
