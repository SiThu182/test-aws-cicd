import React from "react";
import { useState } from "react";
import RFIBtest from "./Reading/RFIBtest.js";
import ReusableMutlipleAnswerTest from "./Reading/ReusableMutlipleAnswerTest.js.js";
import ROPtest from "./Reading/ROPtest.js";
import ReusableSingleAnswerTest from "./Reading/ReusableSingleAnswerTest.js";
import RWFIBtest from "./Reading/RWFIBtest.js";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Reading(props) {
  const data = useParams();
  
  const [rmc, setRmc] = useState(true);
  const [rsmc, setRsmc] = useState(true);
  const [rfib, setRfib] = useState(true);
  const [rwfib, setRwfib] = useState(true);
  const [rop, setRop] = useState(true);
  const [currentCategory, setCurrentCategory] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  useEffect(() => {
    props.setCategory(currentCategory);
    props.setIndex(currentIndex);
  }, [currentCategory, currentIndex, props]);

  console.log(data.id);

  return (
    <>
      {rsmc && (
        <ReusableSingleAnswerTest
          testPost={props.reading.rsmc}
          currentPage={props.currentPage}
          answer={props?.readingAnswer?.rsmc}
          setCurrentPage={props.setCurrentPage}
          setCategoryState={setRsmc}
          category="rsmc"
          mockId={data.id}
          setSave={props.setSave}
          setCurrentCategory={setCurrentCategory}
          setCurrentIndex={setCurrentIndex}
          setCurrentQuestionStart={props.setCurrentQuestionStart}
          passSaveDataState={props.passSaveDataState}
          setPassSaveDataState={props.setPassSaveDataState}
          error={props.error}
          setPause={props.setPause}
          setError={props.setError}
          checkAnswerState={props.checkAnswerState}
        ></ReusableSingleAnswerTest>
      )}

      {!rsmc && rmc && (
        <ReusableMutlipleAnswerTest
          testPost={props.reading.rmc}
          answer={props?.readingAnswer?.rmc}
          currentPage={props.currentPage}
          setCurrentPage={props.setCurrentPage}
          setCategoryState={setRmc}
          category="rmc"
          mockId={data.id}
          setSave={props.setSave}
          setCurrentCategory={setCurrentCategory}
          setCurrentIndex={setCurrentIndex}
          setCurrentQuestionStart={props.setCurrentQuestionStart}
          passSaveDataState={props.passSaveDataState}
          setPassSaveDataState={props.setPassSaveDataState}
          error={props.error}
          setPause={props.setPause}
          setError={props.setError}
          checkAnswerState={props.checkAnswerState}
        ></ReusableMutlipleAnswerTest>
      )}
      {!rmc && rop && (
        <ROPtest
          testPost={props.reading.rop}
          answer={props?.readingAnswer?.rop}
          currentPage={props.currentPage}
          setCurrentPage={props.setCurrentPage}
          setCategoryState={setRop}
          category="rop"
          mockId={data.id}
          setSave={props.setSave}
          setCurrentCategory={setCurrentCategory}
          setCurrentIndex={setCurrentIndex}
          setCurrentQuestionStart={props.setCurrentQuestionStart}
          passSaveDataState={props.passSaveDataState}
          setPassSaveDataState={props.setPassSaveDataState}
          error={props.error}
          setError={props.setError}
          setPause={props.setPause}
          checkAnswerState={props.checkAnswerState}
        ></ROPtest>
      )}
      {!rop && rfib && (
        <RFIBtest
          testPost={props.reading.rfib}
          answer={props?.readingAnswer?.rfib}
          currentPage={props.currentPage}
          setCurrentPage={props.setCurrentPage}
          setCategoryState={setRfib}
          category="rfib"
          mockId={data.id}
          setSave={props.setSave}
          setCurrentCategory={setCurrentCategory}
          setCurrentIndex={setCurrentIndex}
          setCurrentQuestionStart={props.setCurrentQuestionStart}
          passSaveDataState={props.passSaveDataState}
          setPassSaveDataState={props.setPassSaveDataState}
          error={props.error}
          setError={props.setError}
          setPause={props.setPause}
          checkAnswerState={props.checkAnswerState}
        ></RFIBtest>
      )}
      {!rfib && rwfib && (
        <RWFIBtest
          mockType={props.mockType}
          setCounterState={props.setCounterState}
          setSectionB={props.setSectionB}
          testPost={props.reading.rwfib}
          answer={props?.readingAnswer?.rwfib}
          currentPage={props.currentPage}
          setCurrentPage={props.setCurrentPage}
          setCategoryState={setRwfib}
          category="rwfib"
          mockId={data.id}
          setSave={props.setSave}
          setCurrentCategory={setCurrentCategory}
          setCurrentIndex={setCurrentIndex}
          setCurrentQuestionStart={props.setCurrentQuestionStart}
          passSaveDataState={props.passSaveDataState}
          setPassSaveDataState={props.setPassSaveDataState}
          error={props.error}
          setError={props.setError}
          setPause={props.setPause}
          setReadingState={props.setReadingState}
          checkAnswerState={props.checkAnswerState}
        ></RWFIBtest>
      )}
    </>
  );
}

export default Reading;
