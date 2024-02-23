import { createSlice } from "@reduxjs/toolkit";

export const cmsSlice = createSlice({
  name: "cms",
  initialState: {

  },
  reducers: {
    onCmsSubmit : (state) =>{
      debugger
      return {
       ...state
      };

    }
  },
});

export const {
  onCmsSubmit
} = cmsSlice.actions;

export default cmsSlice.reducer;
