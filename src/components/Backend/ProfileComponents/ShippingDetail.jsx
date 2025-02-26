import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, Button, CircularProgress } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";

import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { fetchShippingDetailListAsync } from "../../../redux/thunk/ShippingDetail";
function ShippingDetail({
  shippingDetail,
  setShippingDetailShow,
  setOrderStatus,
}) {
  const [reversedList, setReversedList] = useState([]);
  const backHandler = () => {
    setShippingDetailShow(false);
    setOrderStatus(true);
  };

  const dispatch = useDispatch();
  const { status, shippingDetailList } = useSelector(
    (state) => state.shippingDetails
  );
  let postPath = "order-shipping-detail/" + shippingDetail?.id;

  useEffect(() => {
    dispatch(fetchShippingDetailListAsync(postPath));
  }, [dispatch, postPath]);

  useEffect(() => {
    if (status === "succeeded" && shippingDetailList?.length > 0) {
      const reversed = [...shippingDetailList]?.reverse();
      setReversedList(reversed);
    }
  }, [status, shippingDetailList]);
  return (
    <div>
      <div>
        <Button variant="outlined" onClick={() => backHandler()}>
          <KeyboardBackspaceIcon />
        </Button>
      </div>
      <Box sx={{ background: "white", p: 2, mt: 2 }}>
        <Typography>Invoice no : {shippingDetail?.invoice_no}</Typography>

        <Box sx={{ maxWidth: "1300px" }}>
          {status === "loading" && (
            <>
              <CircularProgress />
            </>
          )}
          {status === "succeeded" && shippingDetailList?.length > 0 ? (
            <Timeline position="alternate">
              {reversedList?.map((d, index) => (
                <TimelineItem>
                  <TimelineOppositeContent
                    color="text.secondary"
                    sx={{ my: "auto" }}
                  >
                    {d.date}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot sx={{}}>
                      <CheckCircleIcon />
                    </TimelineDot>
                    {index !== shippingDetailList?.length - 1 && (
                      <TimelineConnector />
                    )}
                  </TimelineSeparator>
                  <TimelineContent sx={{ my: "auto" }}>
                    <Typography variant="h6">{d.shipping_detail}</Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          ) : (
            status === "succeeded" &&
            shippingDetailList?.length < 1 && (
              <Typography>There is no info yet...</Typography>
            )
          )}
          {status === "failed" && (
            <Typography variant="h5" color={"red"}>
              Failed to fetch info{" "}
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default ShippingDetail;
