import { createSlice } from "@reduxjs/toolkit";

export const userRoleSlice = createSlice({
  name: "customer-list",
  initialState: {
    isLoading: false,
    isError: false,
    customerData: {},
    error: {},
    message: "",
  },
  reducers: {
    onGetCustomer: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false,
        customerData:  [
            {
                name: 'Ricky Antony',
                email: 'info@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
            {
                name: 'cicky Antony',
                email: 'info@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
            {
                name: 'kicky Antony',
                email: 'info@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
            {
                name: 'micky Antony',
                email: 'info@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
            {
                name: 'licky Antony',
                email: 'info@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
            {
                name: 'picky Antony',
                email: 'info@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
        ],
        error: {},
        message: "",
      };
    },

    onGetCustomerSuccess: (state, { payload }) => {
      const { data ={} , message = "", status_code = 200 } = payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        customerData:data,
        message,
        status_code,
        error: {},
      };
    },

    onGetCustomerError: (state, { payload }) => {
      const { data = {}, message = "", status_code = 400 } = payload;
      return {
        ...state,
        customerData:data,
        message,
        status_code,
        isLoading: false,
        isError: true,
        error: {},
      };
    },
    onGetCustomerReset: (state) => {
      return {
        ...state,
        isLoading: false,
        customerData: {},
        message: "",
        error: {},
        status_code: null,
        isError: false,
      };
    },
  },
});
export const { 
    onGetCustomer, 
    onGetCustomerSuccess, 
    onGetCustomerError, 
    onGetCustomerReset,
} = userRoleSlice.actions;

export default userRoleSlice.reducer;
