import { createSlice } from "@reduxjs/toolkit";

export const cmsSlice = createSlice({
  name: "cms",
  initialState: {
    isLoading: false,
    isError: false,
    cmspostdata: {},
    error: {},
    message: "",
  },
  reducers: {
    onPostCms : (state) =>{
      debugger
      return {
       ...state,
       isLoading: true,
       isError: false,
       cmspostdata: {},
       error: {},
       message: "",
      };

    }
  },
});

export const {
  onPostCms
} = cmsSlice.actions;

export default cmsSlice.reducer;
