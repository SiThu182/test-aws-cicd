import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchSavePostNoteList } from "../api/NoteApi";

export const fetchSaveNoteListAsync = createAsyncThunk(
  "note/get-save-note-list",
  async ({ post_id }, { rejectWithValue }) => {
    try {
      let user_id = localStorage.getItem("userId");
      const response = await FetchSavePostNoteList(post_id, user_id);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
