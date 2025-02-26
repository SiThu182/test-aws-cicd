import { createSlice } from "@reduxjs/toolkit";
import { fetchSaveNoteListAsync } from "../thunk/Note";

const initialState = {
  saveNoteList: [],
  status: "",
  error: null,
};

const SaveNoteSlice = createSlice({
  name: "SaveNoteSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSaveNoteListAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSaveNoteListAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.saveNoteList = action.payload;
    });
    builder.addCase(fetchSaveNoteListAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default SaveNoteSlice.reducer;
