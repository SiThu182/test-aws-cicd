import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// icon
import DashboardCard from "../../components/Backend/CardComponents/Card";
import { fetchReadingCountAsync } from "../../redux/thunk/Count";
import PageTitle from "../../components/Backend/PageTitle";

function Reading() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  let [assign, setAssign] = useState(false);
  let [rsmc, setRsmc] = useState("");
  let [rmc, setRmc] = useState("");
  let [rfib, setRfib] = useState("");
  let [rwfib, setRwfib] = useState("");
  let [rop, setRop] = useState("");

  const path = `student_status/${userId}?type=reading`;
  const { readingCount, readingStatus } = useSelector((state) => state.count);
  useEffect(() => {
    dispatch(fetchReadingCountAsync(path));
    setAssign(true);
  }, [dispatch, path]);
 
  useEffect(() => {
    if (
      readingStatus === "succeeded" &&
      assign &&
      readingCount !== undefined &&
      readingCount.data !== undefined
    ) {
      let findCount = (cat) => {
        let total;
        if (readingCount.data.post_count.length === 0) {
          total = 0;
        } else {
          total = readingCount.data.post_count.find((c) => c.category === cat);
        }
        let user;
        if (readingCount.data.user_count.length === 0) {
          user = 0;
        } else {
          user = readingCount.data.user_count.find((c) => c.category === cat);
        }
        return `${user !== 0 && user !== undefined ? user.s_count : 0} / ${
          total !== 0 && total !== undefined ? total.c_count : 0
        }`;
      };
      setRsmc(findCount("rsmc"));
      setRmc(findCount("rmc"));
      setRfib(findCount("rfib"));
      setRwfib(findCount("rwfib"));
      setRop(findCount("rop"));
      setAssign(false);
    }
  }, [assign, readingCount, readingStatus]);

  const pages = [
    [rsmc, "MC Single Answer", "/r-mc-sa/test"],
    [rmc, "MC Multiple Answers", "/r-mc-ma/test"],
    [rfib, "Fill in the Blanks", "/r-fib/test"],
    [rop, "Reorder Paragraph", "/r-rop/test"],
    [rwfib, "R&W Fill in the Blanks", "/r-r&wfib/test"],
  ];
  return (
    <>
      <PageTitle text="Reading" />

      <DashboardCard pages={pages}></DashboardCard>
    </>
  );
}

export default Reading;
