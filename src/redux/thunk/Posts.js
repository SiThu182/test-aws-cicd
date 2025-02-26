import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  FetchEditPosts,
  FetchPostCount,
  FetchPosts,
  FetchPostsByPage,
  FetchScorePosts,
} from "../api/PostApi";

//speaking section post list async thunk
export const fetchPostsAsync = createAsyncThunk(
  "posts/fetchPosts",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);

export const fetchRaPostsAsync = createAsyncThunk(
  "ra/fetch",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  },
  {
    // Additional options, including the meta property
    meta: { debounce: 500 }, // Adjust the debounce value as needed
  }
);
export const fetchRsPostsAsync = createAsyncThunk("rs/fetch", async (path) => {
  const response = await FetchPosts(path);
  return response.data.data;
});
export const fetchRlPostsAsync = createAsyncThunk("rl/fetch", async (path) => {
  const response = await FetchPosts(path);
  return response.data.data;
});
export const fetchRTSPostsAsync = createAsyncThunk(
  "rts/fetch",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);

export const fetchDiPostsAsync = createAsyncThunk("di/fetch", async (path) => {
  const response = await FetchPosts(path);
  return response.data.data;
});
export const fetchAsqPostsAsync = createAsyncThunk(
  "asq/fetch",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);

//writing
export const fetchWritingPostsAsync = createAsyncThunk(
  "writing/fetch",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);
//reading
//multtiplechoice
export const fetchRmcPostsAsync = createAsyncThunk(
  "rmc/fetch",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);
//rfib
export const fetchRfibPostsAsync = createAsyncThunk(
  "rfib/fetch",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);
//rop
export const fetchRopPostsAsync = createAsyncThunk(
  "rop/fetch",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);

//listening
//multtiplechoice
export const fetchLmcPostsAsync = createAsyncThunk(
  "lmc/fetch",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);

//fib & hiw
export const fetchLfibPostsAsync = createAsyncThunk(
  "lfib/fetch",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);

//sst & wfd
export const fetchLwritingPostsAsync = createAsyncThunk(
  "lwriting/fetch",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);

export const fetchMtPostsAsync = createAsyncThunk(
  "mtpost/fetch",
  async (path) => {
    const response = await FetchPosts(path);
    return response.data.data;
  }
);

//speaking section post edit
export const fetcheditPostsAsync = createAsyncThunk(
  "posts/edit/fetchPosts",
  async (routeData) => {
    const { path, id } = routeData;

    const response = await FetchEditPosts(path, id);
    if (path === "mt-test") {
      return response;
    } else {
      return response.data;
    }
  }
);

//speaking section post test
export const fetchPostsByPageAsync = createAsyncThunk(
  "posts/fetchPostsByPage",
  async (routeData) => {
    const { path, page } = routeData;
    const response = await FetchPostsByPage(path, page);
    return response.data;
  }
);

export const fetchPostsCountAsync = createAsyncThunk(
  "posts/fetchPostsCount",
  async (routeData) => {
    const { user_id, path } = routeData;
    const response = await FetchPostCount(user_id, path);
    return response.data;
  }
);

// export const fetchScoreMTAsync = createAsyncThunk(
//   "posts/fetchPostsCount",
//   async (routeData) => {
//     const { user_id, path } = routeData;
//     const response = await FetchPostCount(user_id, path);
//     return response.data;
//   }
// );

export const fetchScorePostsAsync = createAsyncThunk(
  "score/fetch",
  async (path) => {
    const response = await FetchScorePosts(path);
    return response.data.data;
  }
);
export const fetchScoreRmcPostsAsync = createAsyncThunk(
  "scorermc/fetch",
  async (path) => {
    const response = await FetchScorePosts(path);
    return response.data.data;
  }
);
export const fetchScoreLmcPostsAsync = createAsyncThunk(
  "scorelmc/fetch",
  async (path) => {
    const response = await FetchScorePosts(path);
    return response.data.data;
  }
);

export const fetchScoreWmcPostsAsync = createAsyncThunk(
  "scorewmc/fetch",
  async (path) => {
    const response = await FetchScorePosts(path);
    return response.data.data;
  }
);
export const fetchScoreRaPostsAsync = createAsyncThunk(
  "scorera/fetch",
  async (path) => {
    const response = await FetchScorePosts(path);
    return response.data.data;
  }
);
export const fetchScoreRsPostsAsync = createAsyncThunk(
  "scorers/fetch",
  async (path) => {
    const response = await FetchScorePosts(path);
    return response.data.data;
  }
);
export const fetchScoreRlPostsAsync = createAsyncThunk(
  "scorerl/fetch",
  async (path) => {
    const response = await FetchScorePosts(path);
    return response.data.data;
  }
);
export const fetchScoreRtsPostsAsync = createAsyncThunk(
  "scorerts/fetch",
  async (path) => {
    const response = await FetchScorePosts(path);
    return response.data.data;
  }
);
export const fetchScoreDiPostsAsync = createAsyncThunk(
  "scoredi/fetch",
  async (path) => {
    const response = await FetchScorePosts(path);
    return response.data.data;
  }
);
export const fetchScoreAsqPostsAsync = createAsyncThunk(
  "scoreasq/fetch",
  async (path) => {
    const response = await FetchScorePosts(path);
    return response.data.data;
  }
);

export const fetchScoreMtPostsAsync = createAsyncThunk(
  "scoremt/fetch",
  async (path) => {
    const response = await FetchScorePosts(path);
    return response.data.data;
  }
);
