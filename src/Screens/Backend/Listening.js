import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// icon
import DashboardCard from "../../components/Backend/CardComponents/Card";
import { fetchListeningCountAsync } from "../../redux/thunk/Count";
import PageTitle from "../../components/Backend/PageTitle";

function Listening() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  let [assign, setAssign] = useState(false);
  let [smc, setSmc] = useState("");
  let [mc, setMc] = useState("");
  let [fib, setFib] = useState("");
  let [hiw, setHiw] = useState("");
  let [hcs, setHcs] = useState("");
  let [smw, setSmw] = useState("");
  let [sst, setSst] = useState("");
  let [wfd, setWfd] = useState("");

  const path = `student_status/${userId}?type=listening`;
  const { listeningCount, listeningStatus } = useSelector(
    (state) => state.count
  );
  useEffect(() => {
    dispatch(fetchListeningCountAsync(path));
    setAssign(true);
  }, [dispatch, path]);

  useEffect(() => {
    if (
      listeningStatus === "succeeded" &&
      assign &&
      listeningCount !== undefined &&
      listeningCount.data !== undefined
    ) {
      let findCount = (cat) => {
        let total;
        if (listeningCount.data.post_count.length === 0) {
          total = 0;
        } else {
          total = listeningCount.data.post_count.find(
            (c) => c.category === cat
          );
        }
        let user;
        if (listeningCount.data.user_count.length === 0) {
          user = 0;
        } else {
          user = listeningCount.data.user_count.find((c) => c.category === cat);
        }
        return `${user !== 0 && user !== undefined ? user.s_count : 0} / ${
          total !== 0 && total !== undefined ? total.c_count : 0
        }`;
      };
      setSmc(findCount("smc"));
      setMc(findCount("mc"));
      setFib(findCount("fib"));
      setHiw(findCount("hiw"));
      setHcs(findCount("hcs"));
      setSmw(findCount("smw"));
      setSst(findCount("sst"));
      setWfd(findCount("wfd"));
      setAssign(false);
    }
  }, [assign, listeningCount, listeningStatus]);

  const pages = [
    [smc, "MC Single Answer", "/mc-sa/test"],
    [mc, "MC Multiple Answers", "/mc-ma/test"],
    [hiw, "Highlight Incorrect Words", "/hiw/test"],
    [hcs, "Highlight Correct Summary", "/hcs/test"],
    [fib, "Fill in the Blanks", "/fib/test"],
    [smw, "Select Missing Words", "/smw/test"],
    [wfd, "Write from Dictation", "/wfd/test"],
    [sst, "Summarize Spoken Text", "/sst/test"],
  ];
  return (
    <>
      <PageTitle text="Listening" />

      <DashboardCard pages={pages}></DashboardCard>
    </>
  );
}

export default Listening;
