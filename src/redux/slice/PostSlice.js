import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAsqPostsAsync,
  fetchDiPostsAsync,
  fetcheditPostsAsync,
  fetchLfibPostsAsync,
  fetchLmcPostsAsync,
  fetchLwritingPostsAsync,
  fetchMtPostsAsync,
  fetchPostsAsync,
  fetchPostsByPageAsync,
  fetchPostsCountAsync,
  fetchRaPostsAsync,
  fetchRfibPostsAsync,
  fetchRlPostsAsync,
  fetchRmcPostsAsync,
  fetchRopPostsAsync,
  fetchRsPostsAsync,
  fetchRTSPostsAsync,
  fetchScoreAsqPostsAsync,
  fetchScoreDiPostsAsync,
  fetchScoreLmcPostsAsync,
  fetchScoreMtPostsAsync,
  fetchScorePostsAsync,
  fetchScoreRaPostsAsync,
  fetchScoreRlPostsAsync,
  fetchScoreRmcPostsAsync,
  fetchScoreRsPostsAsync,
  fetchScoreRtsPostsAsync,
  fetchScoreWmcPostsAsync,
  fetchWritingPostsAsync,
} from "../thunk/Posts";

// initialize userToken from local storage
// const userToken = getCookie("userToken")
//   ? getCookie("userToken")
//   : null;

// const PostAsyncFun = {
//   fetchPostsAsync,
//   fetchPostsRsAsync,
// };

const initialState = {
  loading: true,
  //score
  scoreLoading: true,
  scorePosts: [],
  scoreRmcLoading: true,
  scoreRmcPosts: [],
  scoreRmcStatus: "",
  scoreLmcLoading: true,
  scoreLmcPosts: [],
  scoreLmcStatus: "",
  scoreWmcLoading: true,
  scoreWmcPosts: [],
  scoreWmcStatus: "",
  scoreRaLoading: true,
  scoreRaPosts: [],
  scoreRaStatus: "",
  scoreRsLoading: true,
  scoreRsPosts: [],
  scoreRsStatus: "",
  scoreRlLoading: true,
  scoreRlPosts: [],
  scoreRlStatus: "",
  scoreDiLoading: true,
  scoreDiPosts: [],
  scoreDiStatus: "",
  scoreAsqLoading: true,
  scoreAsqPosts: [],
  scoreAsqStatus: "",
  //score mocktest
  scoreMtLoading: true,
  scoreMtPosts: [],
  scoreMtStatus: "",
  scoreRtsLoading: true,
  scoreRtsPosts: [],
  scoreRtsStatus: "",

  //test post
  raTestPost: [],
  raTestPostStatus: [],
  raTestPostError: [],
  raTestPostTotalPage: [],

  rsTestPost: [],
  rsTestPostStatus: [],
  rsTestPostError: [],
  rsTestPostTotalPage: [],

  rlTestPost: [],
  rlTestPostStatus: [],
  rlTestPostError: [],
  rlTestPostTotalPage: [],

  rtsTestPost: [],
  rtsTestPostStatus: [],
  rtsTestPostError: [],
  rtsTestPostTotalPage: [],

  diTestPost: [],
  diTestPostStatus: [],
  diTestPostError: [],
  diTestPostTotalPage: [],

  asqTestPost: [],
  asqTestPostStatus: [],
  asqTestPostError: [],
  asqTestPostTotalPage: [],

  //admin data entry
  raLoading: true,
  raStatus: "",
  raPosts: [],
  rsLoading: true,
  rsStatus: "",
  rsPosts: [],
  rlLoading: true,
  rlStatus: "",
  rlPosts: [],

  rtsLoading: true,
  rtsStatus: "",
  rtsPosts: [],

  diLoading: true,
  diStatus: "",
  diPosts: [],
  asqLoading: true,
  asqStatus: "",
  asqPosts: [],
  //adminWriting
  writingLoading: true,
  writingStatus: "",
  writingPosts: [],
  //reading mc
  rmcLoading: true,
  rmcStatus: "",
  rmcPosts: [],
  //reading fib & rwfib
  rfibLoading: true,
  rfibStatus: "",
  rfibPosts: [],
  //reading rop
  ropLoading: true,
  ropStatus: "",
  ropPosts: [],
  //listening mc
  lmcLoading: true,
  lmcStatus: "",
  lmcPosts: [],
  //listening fib
  lfibLoading: true,
  lfibStatus: "",
  lfibPosts: [],
  //listening swt wfd
  lwritingLoading: true,
  lwritingStatus: "",
  lwritingPosts: [],
  // mock test
  mtLoading: true,
  mtStatus: "",
  mtPosts: [],
  postCancelToken: null,

  status: "",
  scoreStatus: "",
  userInfo: null,
  error: null,
  success: false,
  postId: "",
  posts: [],
  editPost: [],
  editStatus: "",
  editError: null,
  editLoading: true,
  postsByPage: [],
  postCount: [],
  postCountStatus: "",
  correctIndex: "",
  totalPage: 0,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPost: (state) => {
      state.posts = [];
    },
    setCancelToken: (state, action) => {
      state.postCancelToken = action.data;
    },
    resetPostsByPage: (state) => {
      state.postsByPage = [];
    },

    resetLoading: (state) => {
      state.loading = true;
      state.status = "loading";
      state.posts = [];
      // state.editPost = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostsAsync.pending, (state) => {
      state.loading = true;
      state.status = "loading";
    });
    builder.addCase(fetchPostsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";
      state.posts = action.payload;
      state.totalPage =
        action.payload !== undefined &&
        action.payload.last_page !== undefined &&
        action.payload.last_page !== ""
          ? action.payload.last_page
          : undefined;
    });
    builder.addCase(fetchPostsAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //admin
    //mocktest
    builder.addCase(fetchMtPostsAsync.pending, (state) => {
      state.mtLoading = true;
      state.mtStatus = "loading";
    });
    builder.addCase(fetchMtPostsAsync.fulfilled, (state, action) => {
      state.mtLoading = false;
      state.mtStatus = "succeeded";
      state.mtPosts = action.payload;
      state.totalPage =
        action.payload !== undefined &&
        action.payload.last_page !== undefined &&
        action.payload.last_page !== ""
          ? action.payload.last_page
          : undefined;
    });
    builder.addCase(fetchMtPostsAsync.rejected, (state, action) => {
      state.mtStatus = "failed";
      state.error = action.error.message;
    });
    //admin
    //speaking Ra
    builder.addCase(fetchRaPostsAsync.pending, (state) => {
      state.raLoading = true;
      state.raStatus = "loading";
    });
    builder.addCase(fetchRaPostsAsync.fulfilled, (state, action) => {
      state.raLoading = false;
      state.raStatus = "succeeded";
      state.raPosts = action.payload;
    });
    builder.addCase(fetchRaPostsAsync.rejected, (state, action) => {
      state.raStatus = "failed";
      state.error = action.error.message;
    });
    //speaking Rs
    builder.addCase(fetchRsPostsAsync.pending, (state) => {
      state.rsLoading = true;
      state.rsStatus = "loading";
    });
    builder.addCase(fetchRsPostsAsync.fulfilled, (state, action) => {
      state.rsLoading = false;
      state.rsStatus = "succeeded";
      state.rsPosts = action.payload;
    });
    builder.addCase(fetchRsPostsAsync.rejected, (state, action) => {
      state.rsStatus = "failed";
      state.error = action.error.message;
    });
    //speaking Rl
    builder.addCase(fetchRlPostsAsync.pending, (state) => {
      state.rlLoading = true;
      state.rlStatus = "loading";
    });
    builder.addCase(fetchRlPostsAsync.fulfilled, (state, action) => {
      state.rlLoading = false;
      state.rlStatus = "succeeded";
      state.rlPosts = action.payload;
    });
    builder.addCase(fetchRlPostsAsync.rejected, (state, action) => {
      state.rlStatus = "failed";
      state.error = action.error.message;
    });
    //speaking rts
    builder.addCase(fetchRTSPostsAsync.pending, (state) => {
      state.rtsLoading = true;
      state.rtsStatus = "loading";
    });
    builder.addCase(fetchRTSPostsAsync.fulfilled, (state, action) => {
      state.rtsLoading = false;
      state.rtsStatus = "succeeded";
      state.rtsPosts = action.payload;
    });
    builder.addCase(fetchRTSPostsAsync.rejected, (state, action) => {
      state.rtsStatus = "failed";
      state.error = action.error.message;
    });
    //speaking Di
    builder.addCase(fetchDiPostsAsync.pending, (state) => {
      state.diLoading = true;
      state.diStatus = "loading";
    });
    builder.addCase(fetchDiPostsAsync.fulfilled, (state, action) => {
      state.diLoading = false;
      state.diStatus = "succeeded";
      state.diPosts = action.payload;
    });
    builder.addCase(fetchDiPostsAsync.rejected, (state, action) => {
      state.diStatus = "failed";
      state.error = action.error.message;
    });
    //speaking Asq
    builder.addCase(fetchAsqPostsAsync.pending, (state) => {
      state.asqLoading = true;
      state.asqStatus = "loading";
    });
    builder.addCase(fetchAsqPostsAsync.fulfilled, (state, action) => {
      state.asqLoading = false;
      state.asqStatus = "succeeded";
      state.asqPosts = action.payload;
    });
    builder.addCase(fetchAsqPostsAsync.rejected, (state, action) => {
      state.asqStatus = "failed";
      state.error = action.error.message;
    });
    //Writing
    builder.addCase(fetchWritingPostsAsync.pending, (state) => {
      state.writingLoading = true;
      state.writingStatus = "loading";
    });
    builder.addCase(fetchWritingPostsAsync.fulfilled, (state, action) => {
      state.writingLoading = false;
      state.writingStatus = "succeeded";
      state.writingPosts = action.payload;
    });
    builder.addCase(fetchWritingPostsAsync.rejected, (state, action) => {
      state.writingStatus = "failed";
      state.error = action.error.message;
    });
    //Reading multiple choice
    builder.addCase(fetchRmcPostsAsync.pending, (state) => {
      state.rmcLoading = true;
      state.rmcStatus = "loading";
    });
    builder.addCase(fetchRmcPostsAsync.fulfilled, (state, action) => {
      state.rmcLoading = false;
      state.rmcStatus = "succeeded";
      state.rmcPosts = action.payload;
    });
    builder.addCase(fetchRmcPostsAsync.rejected, (state, action) => {
      state.rmcStatus = "failed";
      state.error = action.error.message;
    });
    //Reading fib rwfib
    builder.addCase(fetchRfibPostsAsync.pending, (state) => {
      state.rfibLoading = true;
      state.rfibStatus = "loading";
    });
    builder.addCase(fetchRfibPostsAsync.fulfilled, (state, action) => {
      state.rfibLoading = false;
      state.rfibStatus = "succeeded";
      state.rfibPosts = action.payload;
    });
    builder.addCase(fetchRfibPostsAsync.rejected, (state, action) => {
      state.rfibStatus = "failed";
      state.error = action.error.message;
    });
    //Reading rop
    builder.addCase(fetchRopPostsAsync.pending, (state) => {
      state.ropLoading = true;
      state.ropStatus = "loading";
    });
    builder.addCase(fetchRopPostsAsync.fulfilled, (state, action) => {
      state.ropLoading = false;
      state.ropStatus = "succeeded";
      state.ropPosts = action.payload;
    });
    builder.addCase(fetchRopPostsAsync.rejected, (state, action) => {
      state.ropStatus = "failed";
      state.error = action.error.message;
    });
    //Listening multiple choice
    builder.addCase(fetchLmcPostsAsync.pending, (state) => {
      state.lmcLoading = true;
      state.lmcStatus = "loading";
    });
    builder.addCase(fetchLmcPostsAsync.fulfilled, (state, action) => {
      state.lmcLoading = false;
      state.lmcStatus = "succeeded";
      state.lmcPosts = action.payload;
    });
    builder.addCase(fetchLmcPostsAsync.rejected, (state, action) => {
      state.lmcStatus = "failed";
      state.error = action.error.message;
    });
    //Listening fib hiw
    builder.addCase(fetchLfibPostsAsync.pending, (state) => {
      state.lfibLoading = true;
      state.lfibStatus = "loading";
    });
    builder.addCase(fetchLfibPostsAsync.fulfilled, (state, action) => {
      state.lfibLoading = false;
      state.lfibStatus = "succeeded";
      state.lfibPosts = action.payload;
    });
    builder.addCase(fetchLfibPostsAsync.rejected, (state, action) => {
      state.lfibStatus = "failed";
      state.error = action.error.message;
    });
    //Listening sst wfd
    builder.addCase(fetchLwritingPostsAsync.pending, (state) => {
      state.lwritingLoading = true;
      state.lwritingStatus = "loading";
    });
    builder.addCase(fetchLwritingPostsAsync.fulfilled, (state, action) => {
      state.lwritingLoading = false;
      state.lwritingStatus = "succeeded";
      state.lwritingPosts = action.payload;
    });
    builder.addCase(fetchLwritingPostsAsync.rejected, (state, action) => {
      state.lwritingStatus = "failed";
      state.error = action.error.message;
    });
    //edit post
    builder.addCase(fetcheditPostsAsync.pending, (state) => {
      state.editLoading = true;
      state.editStatus = "loading";
    });
    builder.addCase(fetcheditPostsAsync.fulfilled, (state, action) => {
      state.editLoading = false;
      state.editStatus = "succeeded";
      state.editPost = action.payload.data;
      state.correctIndex = action.payload.correctIndex;
    });
    builder.addCase(fetcheditPostsAsync.rejected, (state, action) => {
      state.editStatus = "failed";
      state.editError = action.error.message;
    });
    //test page
    builder.addCase(fetchPostsByPageAsync.pending, (state) => {
      state.loading = true;
      state.status = "loading";
    });
    builder.addCase(fetchPostsByPageAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";
      state.postsByPage = action.payload;
    });
    builder.addCase(fetchPostsByPageAsync.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.error = action.error.message;
    });
    //taken test and total test count
    builder.addCase(fetchPostsCountAsync.pending, (state) => {
      state.loading = true;
      state.postCountStatus = "loading";
    });
    builder.addCase(fetchPostsCountAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.postCountStatus = "succeeded";
      state.postCount = action.payload;
    });
    builder.addCase(fetchPostsCountAsync.rejected, (state, action) => {
      state.loading = false;
      state.postCountStatus = "failed";
      state.error = action.error.message;
    });

    //score
    builder.addCase(fetchScorePostsAsync.pending, (state) => {
      state.scoreLoading = true;
      state.scoreStatus = "loading";
    });
    builder.addCase(fetchScorePostsAsync.fulfilled, (state, action) => {
      state.scoreLoading = false;
      state.scoreStatus = "succeeded";
      state.scorePosts = action.payload;
    });
    builder.addCase(fetchScorePostsAsync.rejected, (state, action) => {
      state.scoreStatus = "failed";
      state.error = action.error.message;
    });
    //score Rmc
    builder.addCase(fetchScoreRmcPostsAsync.pending, (state) => {
      state.scoreRmcLoading = true;
      state.scoreRmcStatus = "loading";
    });
    builder.addCase(fetchScoreRmcPostsAsync.fulfilled, (state, action) => {
      state.scoreRmcLoading = false;
      state.scoreRmcStatus = "succeeded";
      state.scoreRmcPosts = action.payload;
    });
    builder.addCase(fetchScoreRmcPostsAsync.rejected, (state, action) => {
      state.scoreRmcStatus = "failed";
      state.error = action.error.message;
    });
    //score Lmc
    builder.addCase(fetchScoreLmcPostsAsync.pending, (state) => {
      state.scoreLmcLoading = true;
      state.scoreLmcStatus = "loading";
    });
    builder.addCase(fetchScoreLmcPostsAsync.fulfilled, (state, action) => {
      state.scoreLmcLoading = false;
      state.scoreLmcStatus = "succeeded";
      state.scoreLmcPosts = action.payload;
    });
    builder.addCase(fetchScoreLmcPostsAsync.rejected, (state, action) => {
      state.scoreLmcStatus = "failed";
      state.error = action.error.message;
    });

    //score wmc
    builder.addCase(fetchScoreWmcPostsAsync.pending, (state) => {
      state.scoreWmcLoading = true;
      state.scoreWmcStatus = "loading";
    });
    builder.addCase(fetchScoreWmcPostsAsync.fulfilled, (state, action) => {
      state.scoreWmcLoading = false;
      state.scoreWmcStatus = "succeeded";
      state.scoreWmcPosts = action.payload;
    });
    builder.addCase(fetchScoreWmcPostsAsync.rejected, (state, action) => {
      state.scoreWmcStatus = "failed";
      state.error = action.error.message;
    });
    //score speaking
    //ra
    builder.addCase(fetchScoreRaPostsAsync.pending, (state, action) => {
      state.scoreRaLoading = true;
      state.scoreRaStatus = "loading";
    });
    builder.addCase(fetchScoreRaPostsAsync.fulfilled, (state, action) => {
      state.scoreRaLoading = false;
      state.scoreRaStatus = "succeeded";
      state.scoreRaPosts = action.payload;
    });
    builder.addCase(fetchScoreRaPostsAsync.rejected, (state, action) => {
      state.scoreRaStatus = "failed";
      state.error = action.error.message;
    });
    //rs
    builder.addCase(fetchScoreRsPostsAsync.pending, (state) => {
      state.scoreRsLoading = true;
      state.scoreRsStatus = "loading";
    });
    builder.addCase(fetchScoreRsPostsAsync.fulfilled, (state, action) => {
      state.scoreRsLoading = false;
      state.scoreRsStatus = "succeeded";
      state.scoreRsPosts = action.payload;
    });
    builder.addCase(fetchScoreRsPostsAsync.rejected, (state, action) => {
      state.scoreRsStatus = "failed";
      state.error = action.error.message;
    });
    //rl
    builder.addCase(fetchScoreRlPostsAsync.pending, (state) => {
      state.scoreRlLoading = true;
      state.scoreRlStatus = "loading";
    });
    builder.addCase(fetchScoreRlPostsAsync.fulfilled, (state, action) => {
      state.scoreRlLoading = false;
      state.scoreRlStatus = "succeeded";
      state.scoreRlPosts = action.payload;
    });
    builder.addCase(fetchScoreRlPostsAsync.rejected, (state, action) => {
      state.scoreRlStatus = "failed";
      state.error = action.error.message;
    });
    //rl
    builder.addCase(fetchScoreRtsPostsAsync.pending, (state) => {
      state.scoreRtsLoading = true;
      state.scoreRtsStatus = "loading";
    });
    builder.addCase(fetchScoreRtsPostsAsync.fulfilled, (state, action) => {
      state.scoreRtsLoading = false;
      state.scoreRtsStatus = "succeeded";
      state.scoreRtsPosts = action.payload;
    });
    builder.addCase(fetchScoreRtsPostsAsync.rejected, (state, action) => {
      state.scoreRtsStatus = "failed";
      state.error = action.error.message;
    });
    //di
    builder.addCase(fetchScoreDiPostsAsync.pending, (state) => {
      state.scoreDiLoading = true;
      state.scoreDiStatus = "loading";
    });
    builder.addCase(fetchScoreDiPostsAsync.fulfilled, (state, action) => {
      state.scoreDiLoading = false;
      state.scoreDiStatus = "succeeded";
      state.scoreDiPosts = action.payload;
    });
    builder.addCase(fetchScoreDiPostsAsync.rejected, (state, action) => {
      state.scoreDiStatus = "failed";
      state.error = action.error.message;
    });
    //asq
    builder.addCase(fetchScoreAsqPostsAsync.pending, (state) => {
      state.scoreAsqLoading = true;
      state.scoreAsqStatus = "loading";
    });
    builder.addCase(fetchScoreAsqPostsAsync.fulfilled, (state, action) => {
      state.scoreAsqLoading = false;
      state.scoreAsqStatus = "succeeded";
      state.scoreAsqPosts = action.payload;
    });
    builder.addCase(fetchScoreAsqPostsAsync.rejected, (state, action) => {
      state.scoreAsqStatus = "failed";
      state.error = action.error.message;
    });
    //asq
    builder.addCase(fetchScoreMtPostsAsync.pending, (state) => {
      state.scoreMtLoading = true;
      state.scoreMtStatus = "loading";
    });
    builder.addCase(fetchScoreMtPostsAsync.fulfilled, (state, action) => {
      state.scoreMtLoading = false;
      state.scoreMtStatus = "succeeded";
      state.scoreMtPosts = action.payload;
    });
    builder.addCase(fetchScoreMtPostsAsync.rejected, (state, action) => {
      state.scoreMtStatus = "failed";
      state.error = action.error.message;
    });
  },
});

export const { setPost, resetPostsByPage, resetLoading, setCancelToken } =
  postSlice.actions;
export default postSlice.reducer;
