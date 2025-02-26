import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// icon
import DashboardCard from "../../components/Backend/CardComponents/Card";
import { fetchWritingCountAsync } from "../../redux/thunk/Count";
import PageTitle from "../../components/Backend/PageTitle";

function Writing() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  let [assign, setAssign] = useState(false);
  let [we, setWe] = useState("");
  let [swt, setSwt] = useState("");
  let [wemail, setWemail] = useState("");

  const path = `student_status/${userId}?type=writing`;
  const { writingCount, writingStatus } = useSelector((state) => state.count);
  useEffect(() => {
    dispatch(fetchWritingCountAsync(path));
    setAssign(true);
  }, [dispatch, path]);

  useEffect(() => {
    if (
      writingStatus === "succeeded" &&
      assign &&
      writingCount !== undefined &&
      writingCount.data !== undefined
    ) {
      let findCount = (cat) => {
        let total;
        if (writingCount.data.post_count.length === 0) {
          total = 0;
        } else {
          total = writingCount.data.post_count.find((c) => c.category === cat);
        }
        let user;
        if (writingCount.data.user_count.length === 0) {
          user = 0;
        } else {
          user = writingCount.data.user_count.find((c) => c.category === cat);
        }
        return `${user !== 0 && user !== undefined ? user.s_count : 0} / ${
          total !== 0 && total !== undefined ? total.c_count : 0
        }`;
      };
      setWe(findCount("we"));
      setSwt(findCount("swt"));
      setWemail(findCount("wemail"));

      setAssign(false);
    }
  }, [assign, writingCount, writingStatus]);
  const pages = [
    [we, "Write Essay", "/we/test"],
    [swt, "Summarize Written Test", "/swt/test"],
    [wemail, "Write Email (PTE Core)", "/we/test"],
  ];
  return (
    <>
      <PageTitle text="Writing" />
      <DashboardCard pages={pages}></DashboardCard>
    </>
  );
}

export default Writing;
