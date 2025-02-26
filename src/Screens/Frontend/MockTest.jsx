import { Pagination } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";

import Loader from "../../components/Backend/AnimationLoader/Loader";
import MockTestAccordion from "../../components/Frontend/MockTest/MockTestAccodion";

function MockTest(props) {
  let userId = localStorage.getItem("userId");
  let [tests, setTests] = useState([]);

  useEffect(() => {
    if (
      props.mockTestFrontendStatus === "succeeded" &&
      props.mockTestFrontend !== undefined
    ) {
      setTests([]);
      setTests((prev) => {
        return props.mockTestFrontend.data.map((p) => [
          ...prev,
          [
            p.name,
            "/mocktest/test/" + p.id + "/" + p.mt_type_id,
            p?.status,
            "/admin/dashboard",
            p.id,
          ],
        ]);
      });
    }
  }, [props.mockTestFrontend, props.mockTestFrontendStatus]);

  useEffect(() => {
    if (
      props.mockTestFrontendStatus === "succeeded" &&
      props.mockTestFrontend !== undefined &&
      props.mockTestFrontend.data.length !== 0
    ) {
      if (
        !props?.mockTestFrontend.data[0]?.hasOwnProperty("status") &&
        userId !== null &&
        userId !== undefined
      ) {
        props.setFetchState();
      }
    }
  }, [props, userId]);

  return (
    <>
      {(props.mockTestFrontendStatus === "loading" ||
        props.fetchState === true) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "50vh",
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

      {props.mockTestFrontendStatus === "succeeded" &&
        props.fetchState === false && (
          <>
            {/* <MockTestComponent tests={tests}></MockTestComponent> */}
            <MockTestAccordion
              tests={tests}
              userId={userId}
              mtTypeId={
                props.title === "Full"
                  ? 1
                  : props.title === "Speaking"
                  ? 3
                  : props.title === "Reading"
                  ? 4
                  : props.title === "Listening"
                  ? 5
                  : 6
              }
              saveMtList={props.saveMtList}
            ></MockTestAccordion>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mb: "1rem",
              }}
            >
              <Pagination
                size="large"
                count={
                  props.mockTestFrontend.last_page !== undefined
                    ? props.mockTestFrontend.last_page
                    : 0
                }
                color="primary"
                page={props.page}
                onChange={props.handleChange}
              />
            </Box>
          </>
        )}
    </>
  );
}

export default MockTest;
