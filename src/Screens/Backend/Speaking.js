import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/Backend/AnimationLoader/Loader";
// icon
import SpeakingCard from "../../components/Backend/CardComponents/Card";
import { fetchPostsCountAsync } from "../../redux/thunk/Posts";
import PageTitle from "../../components/Backend/PageTitle";

function Speaking() {
  let { postCount, postCountStatus } = useSelector((state) => state.posts);
  let userId = localStorage.getItem("userId");

  const dispatch = useDispatch();
  let postPath = "student_status/";
  let { post_count, user_count } = postCount;

  useEffect(() => {
    dispatch(fetchPostsCountAsync({ path: postPath, user_id: userId }));
  }, [dispatch, postPath, userId]);
  // let post_ra =   post_count.filter( post => post.category === 'ra');

  var pages;
  if (
    postCount &&
    Object.keys(postCount).length > 0 &&
    postCount.post_count.length > 0
  ) {
    const post_ra =
      post_count && post_count.filter((obj) => obj.category === "ra");
    const post_rts =
      post_count && post_count.filter((obj) => obj.category === "rts");
    const post_rs =
      post_count && post_count.filter((obj) => obj.category === "rs");
    const post_rl =
      post_count && post_count.filter((obj) => obj.category === "rl");
    const post_di =
      post_count && post_count.filter((obj) => obj.category === "di");
    const post_asq =
      post_count && post_count.filter((obj) => obj.category === "asq");

    const user_ra =
      user_count && user_count.filter((obj) => obj.category === "ra");
    const user_rts =
      user_count && user_count.filter((obj) => obj.category === "rts");
    const user_rs =
      user_count && user_count.filter((obj) => obj.category === "rs");
    const user_rl =
      user_count && user_count.filter((obj) => obj.category === "rl");
    const user_di =
      user_count && user_count.filter((obj) => obj.category === "di");
    const user_asq =
      user_count && user_count.filter((obj) => obj.category === "asq");
    let user_post_racount = user_ra.length > 0 ? user_ra[0].s_count : 0;
    let user_post_rlcount = user_rl.length > 0 ? user_rl[0].s_count : 0;

    let user_post_rscount = user_rs.length > 0 ? user_rs[0].s_count : 0;
    let user_post_dicount = user_di.length > 0 ? user_di[0].s_count : 0;
    let user_post_asqcount = user_asq.length > 0 ? user_asq[0].s_count : 0;
    let user_post_rtscount = user_rts.length > 0 ? user_rts[0].s_count : 0;

    let ra_count = user_post_racount + "/" + post_ra[0].c_count;
    let rl_count = user_post_rlcount + "/" + post_rl[0].c_count;

    let rs_count = user_post_rscount + "/" + post_rs[0].c_count;
    let di_count = user_post_dicount + "/" + post_di[0].c_count;
    let asq_count = user_post_asqcount + "/" + post_asq[0].c_count;
    let rts_count = user_post_rtscount + "/" + post_rts[0].c_count;

    pages = [
      [ra_count, "Read aloud", "/ra/test"],
      [rs_count, "Repeat sentence", "/rs/test"],
      [di_count, "Describe Image", "/di/test"],
      [rl_count, "Retell Lecture", "/rl/test"],
      [asq_count, "Answer Short Question", "/asq/test"],
      [rts_count, "Response to Situation(PTE Core)", "/rts/test"],
    ];
  } else {
    pages = [
      ["0/0", "Read aloud", "/ra/test"],
      ["0/0", "Repeat sentence", "/rs/test"],
      ["0/0", "Describe Image", "/di/test"],
      ["0/0", "Retell Lecture", "/rl/test"],
      ["0/0", "Answer Short Question", "/asq/test"],
      ["0/0", "Response to Situation", "/rts/test"],
    ];
  }
  // let pcount =
  return (
    <>
      <PageTitle text="Speaking" />
      {postCountStatus === "loading" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "85vh",
          }}
        >
          <Box
            sx={{
              height: "10rem",
              width: "10rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: 5,
              backgroundImage: "linear-gradient(45deg, #2196f3, #e3f2fd)",
              backdropFilter: "blur(45px)",
            }}
          >
            <Loader></Loader>
          </Box>
        </Box>
      )}
      {postCountStatus === "succeeded" && (
        <SpeakingCard pages={pages}></SpeakingCard>
      )}
    </>
  );
}

export default Speaking;
