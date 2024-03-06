import { createSlice } from "@reduxjs/toolkit";

export const clientCommissionReportSlice = createSlice({
  name: "clientCommissionReport",
  initialState: {
    reportData: [],
  },
  reducers: {
    onGetCommissionReport: (state) => {
      return {
        ...state,
        reportData: [
          {
            supplier: "Quick Silver",
            brand: "Amazon",
            noOfVouchers: "2",
            totalFaceValue: "₹5000",
            totalPaidAmount: "₹5000",
            commission: "2%",
            commissionAmount: "₹100",
          },
          {
            supplier: "Quick Silver",
            brand: "Amazon",
            noOfVouchers: "2",
            totalFaceValue: "₹5000",
            totalPaidAmount: "₹5000",
            commission: "2%",
            commissionAmount: "₹100",
          },
          {
            supplier: "Quick Silver",
            brand: "Amazon",
            noOfVouchers: "2",
            totalFaceValue: "₹5000",
            totalPaidAmount: "₹5000",
            commission: "2%",
            commissionAmount: "₹100",
          },
          {
            supplier: "Quick Silver",
            brand: "Amazon",
            noOfVouchers: "2",
            totalFaceValue: "₹5000",
            totalPaidAmount: "₹5000",
            commission: "2%",
            commissionAmount: "₹100",
          },
          {
            supplier: "Quick Silver",
            brand: "Amazon",
            noOfVouchers: "2",
            totalFaceValue: "₹5000",
            totalPaidAmount: "₹5000",
            commission: "2%",
            commissionAmount: "₹100",
          },
          {
            supplier: "Quick Silver",
            brand: "Amazon",
            noOfVouchers: "2",
            totalFaceValue: "₹5000",
            totalPaidAmount: "₹5000",
            commission: "2%",
            commissionAmount: "₹100",
          },
        ],
      };
    },
  },
});
export const { onGetCommissionReport } = clientCommissionReportSlice.actions;

export default clientCommissionReportSlice.reducer;
