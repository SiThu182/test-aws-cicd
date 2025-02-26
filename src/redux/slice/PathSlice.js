import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prevPath: "",
};

const PathSlice = createSlice({
  name: "pathSlice",
  initialState,
  reducers: {
    setPath: (state) => {
      state.prevPath = window.location.pathname;
    },
  },
});

export const { setPath } = PathSlice.actions;
export default PathSlice.reducer;
