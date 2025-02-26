import { createSlice } from "@reduxjs/toolkit";

import { fetchAllAnswersAsync } from "../thunk/AnswerAndDiscussion";

let initialState = {
  allAnswerStatus: null,
  userAnswerHistory: {
    ra: null,
    rs: null,
    rl: null,
    rts: null,
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
    wemail: null,
  },
  otherAnswer: {
    ra: null,
    rs: null,
    rl: null,
    rts: null,
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
    wemail: null,
  },
  allAnswerError: null,
  answerCategory: null,
};

const AnswerAndDiscussionSlice = createSlice({
  name: "AnswerAndDiscussionSlice",
  initialState,
  reducers: {
    setInitialStatus: (state) => {
      state.allAnswerStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllAnswersAsync.pending, (state) => {
      state.allAnswerStatus = "loading";
      state.allAnswerError = null;
    });
    builder.addCase(fetchAllAnswersAsync.fulfilled, (state, action) => {
      state.allAnswerStatus = "succeeded";

      state.allAnswerError = null;
      let category = action.payload?.category;
      state.userAnswerHistory[category] = action.payload?.user_record_scores;
      state.otherAnswer[category] = action.payload?.other_record_scores;
      setInitialStatus();
    });

    builder.addCase(fetchAllAnswersAsync.rejected, (state, action) => {
      state.allAnswerStatus = "failed";
      state.allAnswerError = action.error.message;
    });
  },
});

export const { setInitialStatus } = AnswerAndDiscussionSlice.actions;
export default AnswerAndDiscussionSlice.reducer;
