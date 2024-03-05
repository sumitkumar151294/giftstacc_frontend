import { createSlice } from "@reduxjs/toolkit";

export const userRoleSlice = createSlice({
  name: "customer-list",
  initialState: {
    customerData: [],
  },
  reducers: {
    onGetCustomer: (state) => {
      return {
        ...state,
        customerData:  [
            {
                name: 'Ricky Antony',
                email: 'info@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
            {
                name: 'Ricky Antony',
                email: 'info@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
            {
                name: 'Ricky Antony',
                email: 'info@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
            {
                name: 'Ricky Antony',
                email: 'info@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
            {
                name: 'Ricky Antony',
                email: 'info@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
            {
                name: 'Ricky Antony',
                email: 'info@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
            {
              name: 'Ricky Antony',
              email: 'info@example.com',
              phone: '(201) 200-1851',
              joined: '30/03/2018'
          },
          {
            name: 'Ricky Antony',
            email: 'info@example.com',
            phone: '(201) 200-1851',
            joined: '30/03/2018'
        },
        {
          name: 'Ricky Antony',
          email: 'info@example.com',
          phone: '(201) 200-1851',
          joined: '30/03/2018'
      },
        ],
      };
    },

    onGetCustomerSuccess: (state, { payload }) => {
      const { data =[] } = payload;
      return {
        ...state,
        customerData:data,
      };
    },

    onGetCustomerError: (state, { payload }) => {
      const { data = []} = payload;
      return {
        ...state,
        customerData:data,
      };
    },
    onGetCustomerReset: (state) => {
      return {
        ...state,
        customerData: [],
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
