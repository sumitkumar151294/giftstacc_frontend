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
                name: 'abc',
                email: 'abc@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
            {
                name: 'def',
                email: 'def@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
            {
                name: 'ghi',
                email: 'ghi@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
            {
                name: 'jkl',
                email: 'jkl@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
            {
                name: 'mno',
                email: 'mno@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
            {
                name: 'pqr',
                email: 'pqr@example.com',
                phone: '(201) 200-1851',
                joined: '30/03/2018'
            },
            {
              name: 'stu',
              email: 'stu@example.com',
              phone: '(201) 200-1851',
              joined: '30/03/2018'
          },
          {
            name: 'vwx',
            email: 'vwx@example.com',
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
