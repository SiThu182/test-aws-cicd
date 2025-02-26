import {
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import { PageCard } from "./PageStyle";
import InfoIcon from "@mui/icons-material/Info";

const DetailTextBox = ({ leftText, rightText }) => {
  return (
    <Box sx={{ display: "flex", width: "100%", mx: "auto", my: 1 }}>
      <Typography sx={{ width: "40%" }}>{leftText}</Typography>
      <span style={{ width: "10%" }}>:</span>
      <Typography style={{ width: "50%" }}>{rightText}</Typography>
    </Box>
  );
};

function UserPlanHistory() {
  const { state } = useLocation();
  const history = state?.planHistory;
  const finalPlan = state?.finalPlan;
  const [open, setOpen] = useState(false);
  const [detailPlan, setDetailPlan] = useState();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ minWidth: "75vw", mt: "2rem", mx: "auto" }}>
      <Typography variant="h5">Current Plan </Typography>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "1rem",
          p: 2,
          boxShadow: 3,
          my: 2,
        }}
      >
        <Typography>
          Your Current Plan :{" "}
          {state?.planHistory?.length !== 0
            ? state?.planHistory[state?.planHistory?.length - 1]
                ?.subscription_plan.name
            : state.name}
        </Typography>
        <Typography>
          Practice limited Status -{" "}
          {finalPlan?.check_scoring_date ? "Yes" : "No"}
        </Typography>
        <Typography>
          Mock test unlimited Status -{" "}
          {finalPlan?.check_mt_scoring_date ? "Yes" : "No"}
        </Typography>
        {finalPlan?.check_scoring_date ? (
          <Typography>Expiry Date - {finalPlan?.check_scoring_date}</Typography>
        ) : (
          ""
        )}
        {/* <Typography>
            Payment Status -{" "}
            {state.finalPlan?.subscription_plan_id === 1 &&
            state.finalPlan?.status === 1
              ? "Approved"
              : state.planHistory[state.planHistory.length - 1]
                  ?.payment_status === 1
              ? "Approved"
              : state.planHistory[state.planHistory.length - 1]
                  ?.payment_status === 2
              ? "Reject"
              : "Pending"}
          </Typography> */}
        <Typography></Typography>
      </Box>
      <Typography variant="h5">Subscription History</Typography>

      <Box sx={{ minWidth: "75vw" }}>
        <TableContainer
          component={Paper}
          sx={{
            ...PageCard.mtTable,
            "& .MuiTable-root": {
              overflowX: "auto",
            },
          }}
        >
          <Table
            sx={{
              "& .MuiTableHead-root .MuiTableRow-head": {
                backgroundColor: "cyan",
              },
            }}
          >
            <TableHead
              sx={{
                "& .MuiTableRow-head": {
                  backgroundColor: "cyan",
                  border: 0,
                  m: 0,
                },
              }}
            >
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Subscription Plan </TableCell>
                <TableCell>Fees</TableCell>
                <TableCell>Payment status</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Practice Limited Status</TableCell>
                <TableCell>Mock Test Limited Status</TableCell>
                {/* <TableCell>Practice</TableCell>
                <TableCell>Mock Test</TableCell> */}
                <TableCell>Detail </TableCell>
                {/* <TableCell>Mini Mock Test</TableCell> */}
                {/* <TableCell>Speaking Mock Test</TableCell>
                <TableCell>Reading Mock Test</TableCell>
                <TableCell>Writing Mock Test</TableCell>
                <TableCell>Listening Mock Test</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {history !== "" && history !== undefined ? (
                history.map((h, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                      {index + 1}
                    </TableCell>
                    <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                      {h?.subscription_plan?.name}
                    </TableCell>
                    <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                      {h?.subscription_plan?.fees}
                    </TableCell>
                    <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                      {h?.payment_status === 0
                        ? "pending"
                        : h?.payment_status === 1
                        ? "approved"
                        : "rejected"}
                    </TableCell>
                    <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                      {h?.payment_method === "manual"
                        ? h?.payment_method + "(" + h?.bank + ")"
                        : h?.payment_method}
                    </TableCell>
                    <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                      {h?.subscription_plan?.limited_status === 0
                        ? "limited"
                        : h?.subscription_plan?.limited_status === 1
                        ? "unlimited"
                        : "-"}
                    </TableCell>
                    <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                      {h?.subscription_plan?.mt_limited_status === 0
                        ? "limited"
                        : h?.subscription_plan?.mt_limited_status === 1
                        ? "unlimited"
                        : "-"}
                    </TableCell>
                    {/* <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                      {h?.subscription_plan?.limited_status === 0
                        ? h?.subscription_plan?.scoring_count
                        : "unlimited"}
                    </TableCell>
                    <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                      {h?.subscription_plan?.limited_status === 1
                        ? "unlimited"
                        : h?.subscription_plan?.mocktest_count}
                    </TableCell> */}
                    <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            mr: 3,
                            bgcolor: "#2196f3",
                            "&:hover": {
                              bgcolor: "white",
                            },
                          }}
                          onClick={() => {
                            setOpen(true);
                            setDetailPlan(h);
                          }}
                        >
                          <InfoIcon sx={{ color: "white" }}></InfoIcon>
                        </Button>
                      </Box>
                    </TableCell>
                    {/* <TableCell sx={{ width: "12.5%",minWidth:"1rem" }}>
                      {h?.subscription_plan?.mini_mocktest_count}
                    </TableCell> */}
                    {/* <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                      {h?.subscription_plan?.limited_status === 0
                        ? h?.subscription_plan?.language_type_id?.includes(1)
                          ? JSON.parse(
                              h.subscription_plan.sectional_mocktest_count
                            )[
                              JSON.parse(
                                h?.subscription_plan.language_type_id
                              ).indexOf(1)
                            ]
                          : "-"
                        : "unlimited"}
                      {h?.subscription_plan?.language_type_id?.includes(1)
                        ? JSON.parse(
                            h.subscription_plan.sectional_mocktest_count
                          )[
                            JSON.parse(
                              h?.subscription_plan.language_type_id
                            ).indexOf(1)
                          ]
                        : "-"}
                    </TableCell>
                    <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                      {h?.subscription_plan?.limited_status === 0
                        ? h?.subscription_plan?.language_type_id?.includes(2)
                          ? JSON.parse(
                              h.subscription_plan.sectional_mocktest_count
                            )[
                              JSON.parse(
                                h?.subscription_plan.language_type_id
                              ).indexOf(2)
                            ]
                          : "-"
                        : "unlimited"}
                      {h?.subscription_plan?.language_type_id?.includes(2)
                        ? JSON.parse(
                            h.subscription_plan.sectional_mocktest_count
                          )[
                            JSON.parse(
                              h?.subscription_plan.language_type_id
                            ).indexOf(2)
                          ]
                        : "-"}
                    </TableCell>
                    <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                      {h?.subscription_plan?.limited_status === 0
                        ? h?.subscription_plan?.language_type_id?.includes(4)
                          ? JSON.parse(
                              h.subscription_plan.sectional_mocktest_count
                            )[
                              JSON.parse(
                                h?.subscription_plan.language_type_id
                              ).indexOf(4)
                            ]
                          : "-"
                        : "unlimited"}
                      {h?.subscription_plan?.language_type_id?.includes(4)
                        ? JSON.parse(
                            h.subscription_plan.sectional_mocktest_count
                          )[
                            JSON.parse(
                              h?.subscription_plan.language_type_id
                            ).indexOf(4)
                          ]
                        : "-"}
                    </TableCell>
                    <TableCell sx={{ width: "12.5%", minWidth: "1rem" }}>
                      {h?.subscription_plan?.limited_status === 0
                        ? h?.subscription_plan?.language_type_id?.includes(3)
                          ? JSON.parse(
                              h.subscription_plan.sectional_mocktest_count
                            )[
                              JSON.parse(
                                h?.subscription_plan.language_type_id
                              ).indexOf(3)
                            ]
                          : "-"
                        : "unlimited"}
                      {h?.subscription_plan?.language_type_id?.includes(3)
                        ? JSON.parse(
                            h.subscription_plan.sectional_mocktest_count
                          )[
                            JSON.parse(
                              h?.subscription_plan.language_type_id
                            ).indexOf(3)
                          ]
                        : "-"}
                    </TableCell> */}
                  </TableRow>
                ))
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress></CircularProgress>
                  </Box>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        fullWidth={true}
        sx={{ zIndex: "3000", backdropFilter: "blur(5px)" }}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DialogTitle>Sectional Mock Test </DialogTitle>

          <DialogActions>
            <ButtonBase onClick={handleClose}>
              <CancelIcon></CancelIcon>
            </ButtonBase>
          </DialogActions>
        </Box>
        <DialogContent
          sx={{
            width: "80%",
            p: 1,
            my: 2,
            mx: "auto",
            borderRadius: "1rem",
            boxShadow: 5,
          }}
        >
          <DetailTextBox
            leftText="Practice"
            rightText={
              detailPlan?.subscription_plan?.limited_status === 0
                ? detailPlan?.subscription_plan?.scoring_count
                : detailPlan?.subscription_plan?.limited_status === 1
                ? "unlimited"
                : "-"
            }
          />
          <DetailTextBox
            leftText="Mock Test"
            rightText={
              detailPlan?.subscription_plan?.mt_limited_status === 1
                ? "unlimited"
                : detailPlan?.subscription_plan?.mt_limited_status === 0
                ? detailPlan?.subscription_plan?.mocktest_count
                : "-"
            }
          />
          {detailPlan?.subscription_plan?.limited_status === 0 ? (
            [1, 2, 3, 4].map((l_type, index) => (
              <Box
                key={index}
                sx={{ display: "flex", width: "100%", mx: "auto", my: 1 }}
              >
                <Typography sx={{ width: "50%" }}>
                  {index === 1
                    ? "Speaking Mock Test  "
                    : index === 2
                    ? "Reading Mock Test "
                    : index === 3
                    ? "Listening Mock Test "
                    : "Writing Mock Test "}
                </Typography>
                <span style={{ width: "10%" }}>:</span>
                <Typography>
                  {detailPlan?.subscription_plan?.language_type_id?.includes(
                    l_type
                  )
                    ? JSON.parse(
                        detailPlan.subscription_plan.sectional_mocktest_count
                      )[
                        JSON.parse(
                          detailPlan?.subscription_plan.language_type_id
                        ).indexOf(l_type)
                      ]
                    : "(-)"}
                </Typography>
              </Box>
            ))
          ) : (
            <DetailTextBox
              leftText="Sectional Mock Test"
              rightText="unlimited"
            />
          )}
          <DetailTextBox
            leftText={"Description"}
            rightText={
              detailPlan?.subscription_plan?.description !== undefined
                ? JSON.parse(detailPlan?.subscription_plan?.description)
                : "No description"
            }
          />
        </DialogContent>
      </Dialog>
      {/*        
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            my: 2,
          }}
        >
          {totalPage !== "" && totalPage !== undefined && (
            <Pagination
              size="large"
              count={parseInt(totalPage)}
              color="primary"
              page={page}
              onChange={handleChange}
            />
          )}
        </Box> */}
    </Box>
  );
}

export default UserPlanHistory;
