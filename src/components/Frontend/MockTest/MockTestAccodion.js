import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import CountryDialog from "../OnlineCourses/CountryDialog";
import swal from "sweetalert";
import axios from "axios";
import { getCookie } from "../../../Utils/GetCookies";

export default function ControlledAccordions(props) {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  const onClickHandler = (id, mtTypeId) => {
    let token = getCookie("userToken");
    const userId = localStorage.getItem("userId");
    let config = { headers: { Authorization: "Bearer " + token } };
    //check save progress and show alert box to pass resume 0 or 1 depending on user interaction
    if (props.saveMtList.includes(id)) {
      swal({
        title: "Notice",
        text: "You did not finish this test last time. Do you want to continue from your saved session?",
        icon: "info",
        confirmButtonText: "Yes",
        denyButtonText: "No",
        showDenyButton: true,

        dangerMode: true,
        buttons: {
          confirm: {
            text: "Continue",
            value: "ok",
            visible: true,
            color: "blue",
            closeModal: true,
          },
          retry: {
            text: "Restart",
            value: "cancel",
            visible: true,
            color: "red",
            className: "btn-danger",
            closeModal: true,
          },
        },
      }).then((ok) => {
        if (ok === "ok") {
          navigate("/mocktest/test/" + id + "/" + mtTypeId + "/1/" + 0);
        } else if (ok === "cancel") {
          try {
            axios
              .post(
                `${backendURL}temp-mt/delete-save-file`,
                {
                  mt_id: id,
                  mt_type_id: mtTypeId,
                  user_id: userId,
                },
                config
              )
              .then((res) => {
                if (res.data.status == 1) {
                  // swal({
                  //   title: "Success  Saving Progress",
                  //   text: "Your progress is saved successfully.",
                  //   icon: "info",
                  //   buttons: true,
                  // }).then(() => {
                  //   checkByAdmin === true
                  //     ? navigate("/admin/mocktestlist")
                  //     : navigate("/mocktest/tabs");
                  // });
                  localStorage.removeItem(userId + "saveMt" + id);
                  navigate("/mocktest/test/" + id + "/" + mtTypeId + "/0/" + 0);
                } else {
                  swal({
                    title: "Failed to delet Save Progress",
                    text: res?.data?.message,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  });
                }
              })
              .catch((error) => {
                swal({
                  title: "Failed to delet Save Progress",
                  text:
                    error.response?.data?.message ??
                    error + ". Please try again.",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                });
              });
          } catch (error) {
            swal({
              title: "Failed to delete Save Progress",
              text: "Please check your internet connection and try again .",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            });
          }
        } else {
          // User clicked outside the modal or pressed the Escape key

          swal.close();
        }
      });
    } else {
      navigate("/mocktest/test/" + id + "/" + mtTypeId + "/0/" + 0);
    }
  };

  
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "1rem",
        width: "80%",
        m: "0 auto",
      }}
    >
      <CountryDialog></CountryDialog>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", borderRadius: "1rem", mb: 1 }}
      >
        {props.title} Mock Test List
      </Typography>
      <Box sx={{ width: "80%", m: "0 auto", boxShadow: 5 }}>
        {props.tests.map((t, index) => (
          <Accordion
            key={index}
            sx={{ backgroundColor: "whitesmoke" }}
            expanded={expanded === "panel" + index}
            onChange={handleChange("panel" + index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {t[0][0]} 
              </Typography>
              {/* <Typography sx={{ color: "text.secondary" }}>
                I am an accordion
              </Typography> */}
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "white",
              }}
            >
              <Typography>2 Hours Test</Typography>
              <Button
                variant="contained"
                onClick={() =>
                  props.userId === null
                    ? navigate("/login")
                    : t[0][2] === 3 || t[0][2] === 2
                    ? onClickHandler(t[0][4], props.mtTypeId)
                    : t[0][2] === 1
                    ? navigate(t[0][3])
                    : ""
                }
              >
                {props.userId === null
                  ? "Take Test"
                  : t[0][2] !== null
                  ? t[0][2] === 1
                    ? "View Result"
                    : t[0][2] === 3
                    ? "Retry"
                    : t[0][2] === 4
                    ? "Pending"
                    : "Take Test"
                  : ""}
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
