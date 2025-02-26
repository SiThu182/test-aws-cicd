import React, { useEffect, useState } from "react";
import AnswerAndDiscussionTabs from "./UserAnswerTabs";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAnswersAsync } from "../../../redux/thunk/AnswerAndDiscussion";

function AnswerParentComponent(props) {
  const { postId, type, category } = props;
  const dispatch = useDispatch();
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [totalPage1, setTotalPage1] = useState(1);
  const [totalPage2, setTotalPage2] = useState(1);
  const [saveUserAnswerArray, setSaveUserAnswerArray] = useState("");

  const [saveOtherAnswerArray, setSaveOtherAnswerArray] = useState("");
  const [startUserAssign, setStartUserAssign] = useState(false);
  const [startOtherAssign, setStartOtherAssign] = useState(false);
  const { allAnswerStatus, userAnswerHistory, otherAnswer } = useSelector(
    (state) => state.answerAndDiscussion
  );

  useEffect(() => {
    if (postId !== undefined) {
      dispatch(fetchAllAnswersAsync({ postId: postId, page: 1 }));

      setPage1(1);
      setPage2(1);

      setSaveUserAnswerArray("");
      setSaveOtherAnswerArray("");
      setStartUserAssign(true);
      setStartOtherAssign(true);
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (
      allAnswerStatus === "succeeded" &&
      (startOtherAssign === true || startUserAssign === true) &&
      userAnswerHistory[category] !== null &&
      otherAnswer[category] !== null
    ) {
      if (
        startUserAssign &&
        userAnswerHistory[category]?.current_page === page1
      ) {
        setTotalPage1(userAnswerHistory[category].last_page);
        let arrFromDataLength;
        if (
          saveUserAnswerArray.length !== userAnswerHistory[category].last_page
        ) {
          arrFromDataLength = new Array(
            userAnswerHistory[category].last_page
          ).fill("");
        } else {
          arrFromDataLength = saveUserAnswerArray;
        }
        arrFromDataLength[page1 - 1] = userAnswerHistory[category].data;
        setSaveUserAnswerArray(arrFromDataLength);
      }
      if (startOtherAssign && otherAnswer[category]?.current_page === page2) {
        setTotalPage2(otherAnswer[category].last_page);
        let arrFromDataLength;
        if (saveUserAnswerArray.length !== otherAnswer[category].last_page) {
          arrFromDataLength = new Array(otherAnswer[category].last_page).fill(
            ""
          );
        } else {
          arrFromDataLength = saveOtherAnswerArray;
        }
        arrFromDataLength[page2 - 1] = otherAnswer[category].data;
        setSaveOtherAnswerArray(arrFromDataLength);
      }

      setStartUserAssign(false);
      setStartOtherAssign(false);
    }
  }, [
    startUserAssign,
    dispatch,
    otherAnswer,
    category,
    startOtherAssign,
    page1,
    page2,
    userAnswerHistory,
    allAnswerStatus,
    saveUserAnswerArray,
    saveOtherAnswerArray,
  ]);

  let handleChange1 = (event, p) => {
    setPage1(p);
    if (saveUserAnswerArray[p - 1] === "") {
      dispatch(fetchAllAnswersAsync({ postId: postId, page: p }));
      setStartUserAssign(true);
    }
  };
  let handleChange2 = (event, p) => {
    setPage2(p);

   
    if (saveOtherAnswerArray[p - 1] === "") {
      dispatch(fetchAllAnswersAsync({ postId: postId, page: p }));
      setStartOtherAssign(true);
    }
  };

  return (
    <>
      <AnswerAndDiscussionTabs
        page={[page1, page2]}
        totalPage={[totalPage1, totalPage2]}
        type={type}
        category={category}
        handleChange={[handleChange1, handleChange2]}
        saveArray={[
          saveUserAnswerArray[page1 - 1],
          saveOtherAnswerArray[page2 - 1],
        ]}
      ></AnswerAndDiscussionTabs>
    </>
  );
}

export default AnswerParentComponent;
