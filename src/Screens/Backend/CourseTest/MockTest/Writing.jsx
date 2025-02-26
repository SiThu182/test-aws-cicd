import React, { useEffect } from "react";
import { useState } from "react";
import ReusableTest from "./Writing/ReusableTest";
import { useParams } from "react-router-dom";

function Writing(props) {
  const data = useParams();
  const [we, setWe] = useState(true);
  const [swt, setSwt] = useState(true);
  const [currentCategory, setCurrentCategory] = useState();
  const [currentIndex, setCurrentIndex] = useState();

  useEffect(() => {
    props.setCategory(currentCategory);
    props.setIndex(currentIndex);
  }, [currentCategory, currentIndex, props]);
  return (
    <>
      {swt && (
        <ReusableTest
          mockId={data.id}
          testPost={props.writing.swt}
          answer={props?.writingAnswer?.swt}
          currentPage={props.currentPage}
          setCurrentPage={props.setCurrentPage}
          setCategoryState={setSwt}
          timerCounterDuration={600}
          setDetailDuration={props.setDetailDuration}
          detailDuration={props.detailDuration}
          setDetailAnswer={props.setDetailAnswer}
          detailAnswer={props.detailAnswer}
          setPause={props.setPause}
          pause={props.pause}
          category="swt"
          setSave={props.setSave}
          setCurrentCategory={setCurrentCategory}
          setCurrentIndex={setCurrentIndex}
          passSaveDataState={props.passSaveDataState}
          setPassSaveDataState={props.setPassSaveDataState}
          error={props.error}
          setError={props.setError}
          checkAnswerState={props.checkAnswerState}
        ></ReusableTest>
      )}
      {!swt && we && (
        <ReusableTest
          mockId={data.id}
          mockType={props.mockType}
          testPost={props.writing.we}
          answer={props?.writingAnswer?.we}
          currentPage={props.currentPage}
          setCurrentPage={props.setCurrentPage}
          setCategoryState={setWe}
          setSectionA={props.setSectionA}
          setCounterState={props.setCounterState}
          timerCounterDuration={1200}
          setWritingState={props.setWritingState}
          setDetailDuration={props.setDetailDuration}
          setDetailAnswer={props.setDetailAnswer}
          setPause={props.setPause}
          pause={props.pause}
          category="we"
          setSave={props.setSave}
          setCurrentCategory={setCurrentCategory}
          setCurrentIndex={setCurrentIndex}
          passSaveDataState={props.passSaveDataState}
          setPassSaveDataState={props.setPassSaveDataState}
          error={props.error}
          setError={props.setError}
          checkAnswerState={props.checkAnswerState}
        ></ReusableTest>
      )}
    </>
  );
}

export default Writing;
