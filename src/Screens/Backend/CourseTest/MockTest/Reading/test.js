import { Box, Button, Typography } from "@mui/material";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { Draggable } from "../../Reading/FIB/Draggable";
import { Droppable } from "../../Reading/FIB/Droppable";
function RFIBtest(props) {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
  const [timerCounterCount, setTimerCounterCount] = useState(600);

  const [index, setIndex] = useState(0);

  const [storeData, setStoreData] = useState({ post: [], score: [] });

  const [checkArray, setCheckArray] = useState([]);
  const [count, setCount] = useState(0);
  const [ans, setAns] = useState();
  const [minusCount, setMinusCount] = useState(0);
  const [answer, setAnswer] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [dropArray, setDropArray] = useState([]);
  const [dragArray, setDragArray] = useState([]);
  const [content, setContent] = useState();

  const clickHandler = () => {
    setAnswer(true);
  };

  // calculate
  useEffect(() => {
    if (answer) {
      let overall_point = 0;
      let totalPoint = 0;
      let calculate = async () => {
        checkArray.forEach((c, index) => {
          if (c !== "" && c === dropArray[index]) {
            setCount((prev) => prev + 1);
            overall_point += 1;
          }
          if (c !== "") {
           
            setTotalCount((prev) => prev + 1);
            totalPoint += 1;
          }
        });
      };

      calculate();

      storeData.score.push(overall_point < 0 ? 0 : overall_point);
      setStoreData(storeData);

      if (index === props.rfibPost.length - 1) {
        props.setCurrentPage((prev) => prev + 1);
        props.setRfib(false);
      }
      setIndex((prev) => prev + 1);
      props.setCurrentPage((prev) => prev + 1);
      reset();
    }
  }, [
    ans,
    answer,
    count,
    index,
    minusCount,
    props,
    storeData,
    checkArray,
    dropArray,
    totalCount,
  ]);

  const reset = () => {
    setCount(0);

    setAnswer(false);
  };

  useEffect(() => {
    let beginInterval = () => {
      if (timerCounterCount !== 0) {
        const interval = setInterval(() => {
          setTimerCounterCount((prev) => prev - 1);
        }, 1000);
        return interval;
      }
    };
    let interval = beginInterval();
    return () => clearInterval(interval);
  }, [timerCounterCount]);

  useEffect(() => {
    setCheckArray(props.rfibPost[index].mul_choices);
    if (
      props.rfibPost[index].answers !== undefined &&
      props.rfibPost[index].answers.length !== 0
    ) {
      setDragArray([]);
      setCheckArray([]);
      props.rfibPost[index].answers.forEach((ans) => {
        setCheckArray((prev) => [
          ...prev,
          ans.is_correct === "1" ? ans.name : "",
        ]);

        setDragArray((prev) =>
          [...prev, ans.name]
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
        );
        setContent(props.rfibPost[index].content.split("#"));
      });

      setDropArray(new Array(props.rfibPost[index].answers.length - 1).fill(0));
    }
  }, [index, props.rfibPost]);


  //Drag control
  function handleDragEnd({ active, over }) {
    let sid = over === null ? null : over.id;
    let eid = active.id;

    let exist = sid !== null ? sid.toString().indexOf("drag") : "";
    let existArr = eid !== null ? dropArray.includes(eid) : "";

    if (sid !== null && exist === -1 && !existArr) {
   
      // indexArr.splice(sid, 1, index);
      dropArray.splice(sid, 1, eid);
    }
    if (sid === null && existArr) {
      let s = dropArray.indexOf(eid);

      dropArray.splice(s, 1, 0);
    }
    if (sid !== null && existArr) {
     

      let s = dropArray.indexOf(eid);
      dropArray.splice(s, 1, dropArray[sid]);
      dropArray.splice(sid, 1, eid);
    }
  }
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "2rem",
          p: 2,
          boxShadow: 5,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography variant="body5">
            In the texts below some words are missing.Drag word from the box
            below to the appropriate place in the text.To undo an answer
            choice,drag the word back to the box below to the text.
          </Typography>
        </Box>

        <Box sx={{ margin: "0 auto", width: "100%", mb: 4 }}>
          {/* <Box
            sx={{
              p: 1,
              backgroundColor: "whitesmoke",
              borderRadius: "1rem",
              boxShadow: 5,
            }}
          >
            <Typography variant="body5">
              {props.rfibPost[index].content}
            </Typography>
          </Box> */}

          <Box sx={{ margin: "0 auto", width: "100%", py: 2 }}>
            <Box
              sx={{
                width: "100%",
                margin: "0 auto",

                borderRadius: "0.5rem",
                padding: 1,
                boxShadow: 1,
              }}
            >
              {content !== undefined &&
                content !== "" &&
                dropArray.length !== 0 && (
                  <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                    {content.map((c, index) => (
                      <span key={index}>
                        <Typography
                          variant="body5"
                          sx={{
                            my: 5,
                            fontSize: "1.2rem",
                          }}
                        >
                          {c}
                        </Typography>
                        {index !== content.length - 1 && (
                          <span>
                            <Droppable
                              id={index}
                              index={index}
                              key={index}
                              className={
                                answer
                                  ? checkArray[index] !== "" &&
                                    dropArray[index] === checkArray[index]
                                    ? "drop correct"
                                    : "drop false"
                                  : "drop"
                              }
                            >
                              {dropArray[index] !== 0 ? (
                                <Draggable
                                  id={dropArray[index]}
                                  className="inDrop"
                                >
                                  {dropArray[index]}
                                </Draggable>
                              ) : (
                                "Drop here"
                              )}
                            </Droppable>
                          </span>
                        )}
                        {/* {answer && checkArray[index] !== "" && (
                    <Typography
                      variant="span"
                      sx={{
                        color: "yellowgreen",
                        fontSize: "1.2rem",
                      }}
                    >
                      ({checkArray[index]})
                    </Typography>
                  )} */}
                      </span>
                    ))}
                    <Box
                      sx={{
                        width: "90%",
                        margin: "0 auto",

                        borderRadius: "0.5rem",
                        padding: 1,
                        boxShadow: 5,
                      }}
                    >
                      {dragArray.map((d, index) =>
                        !dropArray.includes(d) ? (
                          <Draggable id={d} index={index} key={index}>
                            {d}
                          </Draggable>
                        ) : (
                          ""
                        )
                      )}
                    </Box>
                  </DndContext>
                )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          mt: 5,
          pb: 2,
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" onClick={clickHandler}>
          Next
        </Button>
      </Box>
    </>
  );
}

export default RFIBtest;
