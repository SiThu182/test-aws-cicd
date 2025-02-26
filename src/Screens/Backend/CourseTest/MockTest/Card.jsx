import { Box, Pagination, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

// import Loader from "../../../../components/Backend/AnimationLoader/Loader";
// icon
import TestCard from "../../../../components/Backend/CardComponents/TestCard";

// import { MtStyle } from "./MtStyleVariable";

function Card(props) {
  let [tests, setTests] = useState([]);
  let [question, setQuestion] = useState([]);

  useEffect(() => {
    if (props.posts !== undefined && props.posts?.data.length !== 0) {
      if (props.posts.data[0].mt_sections !== undefined) {
        setTests([]);
        setTests((prev) =>
          props.posts.data.map((p) => [
            ...prev,
            [
              p.name,
              "/mocktest/test/" + p.id + "/" + p.mt_type_id,
              p.id,
              p.mt_type_id,
              p.status,
              p?.mt_score_id,
            ],
          ])
        );
        setQuestion([]);

        props.posts.data.map((p) =>
          setQuestion((prev) => [
            ...prev,
            p.mt_sections.map(
              (mt) => mt.mt_section_details.length
              // mt.mt_section_details.length < 0
              //   ? 0
              //   : mt.mt_section_details.length * 1 - 1
            ),
          ])
        );
      }
    }
  }, [props]);

  let handleChange = (event, p) => {
    props.pageHandler(p);
  };
  // const pages = [
  //   ["", "Mock Test 1", "/mocktest/test"],
  //   ["", "Mock Test 2", "/mocktest/test"],
  // ];
  return (
    <>
      {props.posts.data !== undefined && props.posts.data.length !== 0 ? (
        <>
          <TestCard
            pages={tests}
            question={question}
            saveMtListArray={props.saveMtListArray}
          ></TestCard>
          <Box
            sx={{
              width: "100%",
              mt: props.posts.length !== undefined ? "30rem" : "",
            }}
          >
            <Pagination
              size="large"
              count={
                props.posts !== undefined && props.posts.last_page !== undefined
                  ? props.posts.last_page
                  : 0
              }
              color="primary"
              page={props.page}
              onChange={handleChange}
            />
          </Box>
        </>
      ) : (
        props.posts.data !== undefined &&
        props.posts.data.length === 0 && (
          <Typography>No Mock test yet</Typography>
        )
      )}
    </>
  );
}

export default Card;
