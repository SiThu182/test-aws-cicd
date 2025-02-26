import { createSlice } from "@reduxjs/toolkit";
import { fetchTestPostListAsync } from "../thunk/SideDrawer";

let initialState = {
  testPostListStatus: null,
  testPostList: {
    ra: null,
    rs: null,
    rl: null,
    di: null,
    asq: null,
    we: null,
    swt: null,
    rsmc: null,
    rmc: null,
    rwfib: null,
    rfib: null,
    rop: null,
    smc: null,
    mc: null,
    hcs: null,
    smw: null,
    hiw: null,
    fib: null,
    sst: null,
    wfd: null,
  },

  testPostListError: null,
};

const SideDrawerSlice = createSlice({
  name: "SideDrawerSlice",
  initialState,
  reducer: {},

  extraReducers: (builder) => {
    builder.addCase(fetchTestPostListAsync.pending, (state) => {
      state.testPostListStatus = "loading";
      state.testPostListError = null;
    });
    builder.addCase(fetchTestPostListAsync.fulfilled, (state, action) => {
      state.testPostListStatus = "succeeded";
      state.testPostListError = null;
      let category = action.payload.category;

      state.testPostList[category] = action.payload.data;
    });

    builder.addCase(fetchTestPostListAsync.rejected, (state, action) => {
      state.testPostListStatus = "failed";
      state.testPostListError = action.error.message;
    });
  },
});

export default SideDrawerSlice.reducer;
