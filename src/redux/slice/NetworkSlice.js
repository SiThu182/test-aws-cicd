import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  online: "",
};

const NetworkSlice = createSlice({
  name: "networkSlice",
  initialState,
  reducers: {
    setOnline: (state, action) => {
      state.online = action.payload;
    },
  },
});

export const { setOnline } = NetworkSlice.actions;
export default NetworkSlice.reducer;
