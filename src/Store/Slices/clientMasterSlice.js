// import { createSlice } from '@reduxjs/toolkit';

// export const clientMasterSlice = createSlice({
//   name: 'clientMaster',
//   initialState: {
//     isLoading: false,
//     isError: false,
//     data: {},
//     error: {},
//     message: ''
//   },
//   reducers: {
//     onClientMasterSubmit: (state) => {
//       return { ...state, isLoading: true, data: {}, message: '', error: {}, isError: false };
//     },
//     onClientMasterSubmitSuccess: (state, { payload }) => {
//       const { data = {}, message = '', status_code = 200 } = payload;
//       return {
//         ...state,
//         isLoading: false,
//         isError: false,
//         data,
//         error: {},
//         message,
//         status_code
//       };
//     },
//     onClientMasterSubmitError: (state, { payload }) => {
//       const { data = {}, message = '', status_code = 200 } = payload;
//       return {
//         ...state,
//         isLoading: false,
//         isError: true,
//         data: data,
//         message,
//         status_code
//       };
//     },
//     onClientMasterReset: (state) => {
//       return { ...state, isLoading: false, data: {}, message: '', error: {}, status_code: 400, isError: false };
//     },
//   }
// });

// export const { onClientMasterSubmit, onClientMasterSubmitError, onClientMasterSubmitSuccess, onClientMasterReset} =
//   clientMasterSlice.actions;

// export default clientMasterSlice.reducer;
