import { createSlice } from "@reduxjs/toolkit";

export const emailEventMasterSlice = createSlice({
  name: "eventEmailMaster",
  initialState: {
    emailEventData: [],
  },
  reducers: {
    onGetEmailEventMaster: (state) => {
      return {
        ...state,
        emailEventData: [
            {
                id: 1,
                status: "Order Confirmed",
                date: "12-20-2023",
                placeholders: ["%orderid%", "%firstname%", "%lastname%"],
              },
              {
                id: 2,
                status: "OTP",
                date: "12-20-2023",
                placeholders: ["%firstname%", "%lastname%"],
              },
              {
                id: 3,
                status: "Welcome",
                date: "12-20-2023",
                placeholders: ["%firstname%", "%lastname%"],
              },
              {
                id: 4,
                status: "Order Delivered",
                date: "12-20-2023",
                placeholders: ["%orderid%", "%firstname%", "%lastname%"],
              },
              {
                id: 4,
                status: "Order Delivered",
                date: "12-20-2023",
                placeholders: ["%orderid%", "%firstname%", "%lastname%"],
              },
               {
                id: 4,
                status: "Order Delivered",
                date: "12-20-2023",
                placeholders: ["%orderid%", "%firstname%", "%lastname%"],
              },
        ],
      };
    },
  },
});
export const { onGetEmailEventMaster } = emailEventMasterSlice.actions;

export default emailEventMasterSlice.reducer;
