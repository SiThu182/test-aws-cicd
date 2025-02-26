import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const TableForm = React.memo((props) => {
  let [searchInput, setSearchInput] = useState("");
  let [searchCategory, setSearchCategory] = useState("");
  let [searchStatus, setSearchStatus] = useState(1);
  // let currentDate = new Date();
  // currentDate = dayjs(currentDate.toISOString());

  const firstDayOfMonth = dayjs().startOf("month");
  const lastDayOfMonth = dayjs().endOf("month");

  let [startDate, setStartDate] = useState(
    props.tableSection == "register" ? firstDayOfMonth : null
  );
  let [endDate, setEndDate] = useState(
    props.tableSection == "register" ? lastDayOfMonth : null
  );

  let category;
  if (
    props.category == "swt,we,wemail" ||
    props.category == "sst,wfd" ||
    props.category == "rmc,rsmc" ||
    props.category == "rfib,rwfib" ||
    props.category == "mc,smc,hcs,smw" ||
    props.category == "fib,hiw"
  ) {
    category = props.category.split(",");
  }

  const searchFunction = (value) => {
    setSearchInput(value);
    props.setPage(1);

    if (
      props.category === "swt,we,wemail" ||
      props.category === "sst,wfd" ||
      props.category === "rmc,rsmc" ||
      props.category === "rfib,rwfib" ||
      props.category === "mc,smc,hcs,smw" ||
      props.category === "fib,hiw"
    ) {
      props.setSearchValue({
        name: value !== "" ? value : "",
        category: searchCategory !== "" ? searchCategory : props.category,
      });
    } else if (
      props.tableSection === "register" ||
      props.tableSection === "mocktest"
    ) {
      if (props.tableSection === "register") {
        props.setSearchValue({
          name: value !== "" ? value : "",
          status: searchStatus !== "" ? searchStatus : "",
          startDate:
            startDate !== "" && startDate !== null && startDate !== undefined
              ? startDate.format("YYYY-MM-DD HH:mm:ss")
              : "",
          endDate:
            endDate !== "" && endDate !== null && endDate !== undefined
              ? endDate.format("YYYY-MM-DD HH:mm:ss")
              : "",
        });
      } else {
        props.setSearchValue({
          name: value !== "" ? value : "",
          status: searchStatus !== "" ? searchStatus : "",
        });
      }
    } else {
      props.setSearchValue(value);
    }

    // setPostPath("search?category=" + currentCategory + "&que=" + searchInput);
  };

  const handleChange = (event) => {
    if (
      props.tableSection === "register" ||
      props.tableSection === "mocktest"
    ) {
      if (event !== undefined) setSearchStatus(event.target.value);
    } else {
      if (event !== undefined) setSearchCategory(event.target.value);
    }

    let search_value = event !== undefined ? event.target.value : searchStatus;
    if (
      props.tableSection === "register" ||
      props.tableSection === "mocktest"
    ) {
      props.setSearchValue({
        name: searchInput !== "" ? searchInput : "",
        status: search_value !== "" ? search_value : "",
        startDate:
          startDate !== "" && startDate !== null && startDate !== undefined
            ? startDate.format("YYYY-MM-DD HH:mm:ss")
            : "",
        endDate:
          endDate !== "" && endDate !== null && endDate !== undefined
            ? endDate.format("YYYY-MM-DD HH:mm:ss")
            : "",
      });
    } else {
      props.setSearchValue({
        name: searchInput !== "" ? searchInput : "",
        category: search_value !== "" ? search_value : props.category,
      });
    }
  };
  return (
    <>
      <Box
        className="container-fluid "
        sx={{
          m: "0 auto",
          minWidth: "75vw",

          overflowX: "auto",
        }}
      >
        <div className="row ">
          <div className="col-md-10 ">
            <Box className="card">
              <Box
                className="card-header"
                sx={{
                  my: 1.5,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h5" color="initial" sx={{ ml: "2rem" }}>
                  {(props.tableSection === "admin" ||
                    props.tableSection === "mocktest" ||
                    props.tableSection === "blog" ||
                    props.tableSection === "email-template" ||
                    props.tableSection === 'recording-course' ) &&
                    "Post List"}
                  {(props.tableSection === "score" ||
                    props.tableSection === "scoremt" ||
                    props.tableSection === "mc") &&
                    "Score List"}
                  {props.tableSection === "student" && "Student List"}
                </Typography>
                {(props.tableSection === "admin" ||
                  props.tableSection === "mocktest" ||
                  (props.tableSection === "plan" &&
                    props.type !== "training" &&
                    props.type !== "trial") ||
                  props.tableSection === "student" ||
                  props.tableSection === "blog" ||
                  props.tableSection === "email-template" ||
                  props.tableSection === "recording-course" ||
                  props.tableSection === "material download" ||
                  props.tableSection === "material type download" ||
                  props.tableSection === "videoRecording" ||
                  props.tableSection === "feedback" ||
                  props.tableSection === "banner" ||
                  props.tableSection === "product" ||
                  props.tableSection === "shipping-detail" ||
                  props.tableSection === "discount" ||
                  props.tableSection === "coupon" ||
                  props.tableSection === "videoRecordingType") && (
                  <Link
                    to={
                      props.tableSection === "videoRecordingType" ||
                      props.tableSection === "material type download"
                        ? "type/add"
                        : "add"
                    }
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        ml: 4,
                        color: "white",
                        bgcolor: "#2196f3",

                        "&:hover": {
                          bgcolor: "white",
                          color: "#000",
                        },
                      }}
                    >
                      Add {props.tableSection === "student" ? "User" : "New"}
                    </Button>
                  </Link>
                )}

                {/* {props.tableSection === "student" && (
                  <Link
                    to={"Add"}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        ml: 4,
                        color: "#000",

                        bgcolor: "#2196f3",

                        "&:hover": {
                          bgcolor: "white",
                        },
                      }}
                    >
                      Add
                    </Button>
                  </Link>
                )} */}
                {props.tableSection === "score" && <></>}
              </Box>
              <Box
                sx={{ display: "flex", gap: 4, alignItems: "center", mb: 2 }}
              >
                {props.searchBar !== false && (
                  <Paper
                    component="form"
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      height: "3rem",
                      // width: 350,
                      mb: 1,
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      value={searchInput}
                      onChange={({ target: { value } }) =>
                        searchFunction(value)
                      }
                      placeholder="Search Table "
                      inputProps={{ "aria-label": "search table" }}
                    />
                    {(props.category == "swt,we,wemail" ||
                      props.category == "sst,wfd" ||
                      props.category == "rmc,rsmc" ||
                      props.category == "rfib,rwfib" ||
                      props.category == "mc,smc,hcs,smw" ||
                      props.category == "fib,hiw") && (
                      <>
                        <Divider
                          sx={{ height: 28, m: 0.5 }}
                          orientation="vertical"
                        />

                        <FormControl
                          variant="standard"
                          sx={{ m: 0.5, minWidth: 120, mb: 2 }}
                        >
                          <InputLabel id="demo-simple-select-standard-label">
                            Category
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={searchCategory}
                            onChange={handleChange}
                            label="category"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {
                              category.map((cat, index) => (
                                <MenuItem key={index} value={cat}>
                                  {cat}
                                </MenuItem>
                              ))

                              // props.category == "sst,wfd" && (
                              //   <>

                              //   <MenuItem value="we">Wirte Essay</MenuItem>
                              //   <MenuItem value="swt">SWT</MenuItem>
                              //   </>
                              // )
                            }
                          </Select>
                        </FormControl>
                      </>
                    )}

                    {(props.tableSection === "register" ||
                      props.tableSection === "mocktest") && (
                      <>
                        <Divider
                          sx={{ height: 28, m: 0.5 }}
                          orientation="vertical"
                        />

                        <FormControl
                          variant="standard"
                          sx={{ m: 0.5, minWidth: 120, mb: 2 }}
                        >
                          <InputLabel id="demo-simple-select-standard-label">
                            {props.filterTitle}
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={searchStatus}
                            onChange={handleChange}
                            label="status"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {
                              props.filterOption.map((status, index) => (
                                <MenuItem key={index} value={status.value}>
                                  {status.name}
                                </MenuItem>
                              ))

                              // props.category == "sst,wfd" && (
                              //   <>

                              //   <MenuItem value="we">Wirte Essay</MenuItem>
                              //   <MenuItem value="swt">SWT</MenuItem>
                              //   </>
                              // )
                            }
                          </Select>
                        </FormControl>
                      </>
                    )}
                    <Divider
                      sx={{ height: 28, m: 0.5 }}
                      orientation="vertical"
                    />
                    {props.tableSection === "register" && (
                      <Box
                        sx={{
                          background: "",
                          height: "100%",
                          display: "flex",
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Start Date"
                            value={startDate || null}
                            onChange={(newValue) => setStartDate(newValue)}
                            // minDate={currentDate}
                            sx={{
                              mr: 2,
                              width: 200,
                              height: 30,
                              "& .MuiInputBase-input": {
                                height: "0.6rem !important",
                              },
                            }}
                          />
                          <DatePicker
                            label="End Date"
                            value={endDate || null}
                            sx={{
                              mr: 2,
                              width: 200,
                              height: 30,
                              "& .MuiInputBase-input": {
                                height: "0.6rem !important",
                              },
                            }}
                            onChange={(newValue) => {
                              setEndDate(newValue);
                              if (startDate !== null && startDate !== "") {
                                handleChange();
                              }
                            }}
                          />
                        </LocalizationProvider>
                        <Tooltip
                          title={
                            "To use in search by other filters without considering date"
                          }
                        >
                          <Button
                            variant="contained"
                            onClick={() => {
                              setStartDate("");
                              setEndDate("");
                            }}
                          >
                            Clear Date
                          </Button>
                        </Tooltip>
                      </Box>
                    )}

                    <Divider
                      sx={{ height: 28, m: 0.5 }}
                      orientation="vertical"
                    />
                    <IconButton
                      color="primary"
                      sx={{ p: "10px" }}
                      aria-label="directions"
                    >
                      <SearchIcon
                        onClick={() =>
                          props.tableSection === "register" && handleChange()
                        }
                      />
                    </IconButton>
                  </Paper>
                )}
              </Box>
              <TableContainer
                component={Paper}
                sx={{
                  //
                  height: "73vh",
                  "& .MuiTable-root": {
                    overflowX: "auto",
                  },
                }}
              >
                <Table
                  aria-label="simple table"
                  sx={{
                    height: "10rem",
                    "& .MuiTableHead-root": {
                      zIndex: 2,
                      color: "white",
                    },
                    "& .MuiTableRow-root": {
                      height: "60px",
                      "& .MuiTableCell-head": {
                        color: "whitesmoke",
                      },
                    },
                  }}
                >
                  {props.tableSection === "admin" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Select Post :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Prediction Post :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{ textAlign: "", width: "120px" }}
                          >
                            Created By &nbsp; (Updated By)
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Post No :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Title
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Content
                          </Typography>
                        </TableCell>
                        {props.audio === "audio" && (
                          <TableCell>
                            <Typography variant="h6" sx={{ textAlign: "" }}>
                              Audio
                            </Typography>
                          </TableCell>
                        )}
                        {props.image === "image" && (
                          <TableCell>
                            <Typography variant="h6" sx={{ textAlign: "" }}>
                              Image
                            </Typography>
                          </TableCell>
                        )}
                        {props.mc === "mc" && (
                          <TableCell>
                            <Typography variant="h6" sx={{ textAlign: "" }}>
                              Question Type
                            </Typography>
                          </TableCell>
                        )}
                        {(props.category == "swt,we,wemail" ||
                          props.category == "sst,wfd") && (
                          <TableCell>
                            <Typography variant="h6" sx={{ textAlign: "" }}>
                              Category
                            </Typography>
                          </TableCell>
                        )}
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Status
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Start Date
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            End Date
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Exist in Mock Test
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Actions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {props.tableSection === "shipping-detail" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            ID
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Order Status
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Date
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Actions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {props.tableSection === "product" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            No
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{ textAlign: "", width: "120px" }}
                          >
                            Product name
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Image
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Category
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            SKUs
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Details
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Actions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {props.tableSection === "plan" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Name
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Description
                          </Typography>
                        </TableCell>
                        {props.type === "training" && (
                          <>
                            <TableCell>
                              <Typography
                                variant="h6"
                                sx={{ textAlign: "center" }}
                              >
                                Type
                              </Typography>
                            </TableCell>
                          </>
                        )}
                        {(props.type === "trial" ||
                          props.type === "promotion") && (
                          <>
                            <TableCell>
                              <Typography
                                variant="h6"
                                sx={{ textAlign: "center" }}
                              >
                                Practice (unlimited)days
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="h6"
                                sx={{ textAlign: "center" }}
                              >
                                Mock Test (unlimited)days
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="h6"
                                sx={{ textAlign: "center" }}
                              >
                                Scoring Count
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="h6"
                                sx={{ textAlign: "center" }}
                              >
                                Mock Test Count
                              </Typography>
                            </TableCell>
                          </>
                        )}
                        {(props.type === "training" ||
                          props.type === "plan") && (
                          <>
                            <TableCell>
                              <Typography
                                variant="h6"
                                sx={{ textAlign: "center" }}
                              >
                                Show order(ltr)
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                variant="h6"
                                sx={{ textAlign: "center" }}
                              >
                                Show Frontend Status
                              </Typography>
                            </TableCell>
                          </>
                        )}

                        {props.type !== "trial" && (
                          <TableCell>
                            <Typography
                              variant="h6"
                              sx={{ textAlign: "center" }}
                            >
                              Fees
                            </Typography>
                          </TableCell>
                        )}

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Actions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {props.tableSection === "discount" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Name
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Percentage
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Days
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Status
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Actions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}

                  {props.tableSection === "coupon" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Coupon Code
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Percentage
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Expired Date
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Coupon Type
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            User
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Actions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}

                  {props.tableSection === "score" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                        "& .MuiTableCell-head": {
                          textAlign: "center",
                        },
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">Check</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Date</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">User Name</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Post Title</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Words in Post</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Recognized Words</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">
                            Points (Scale 90)
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Actions</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {props.tableSection === "student" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                        "& .MuiTableCell-head": {
                          textAlign: "center",
                        },
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">ID</Typography>
                        </TableCell>

                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{ textAlign: "", width: "120px" }}
                          >
                            Created By &nbsp; (Updated By)
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">User Type</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Trial User</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Name</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Email</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Role</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Register Date</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Country</Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6">Detail info</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Actions</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {props.tableSection === "mc" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                        "& .MuiTableCell-head": {
                          textAlign: "center",
                        },
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">Check</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Date</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">User</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Post ID</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Overall Point</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Category</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Actions</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {props.tableSection === "mocktest" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                        "& .MuiTableCell-head": {
                          textAlign: "center",
                        },
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography
                            variant="h6"
                            sx={{ textAlign: "", width: "120px" }}
                          >
                            Created By &nbsp; (Updated By)
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Name</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Mock test type</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Status</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Check </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Actions</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {props.tableSection === "scoremt" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                        "& .MuiTableCell-head": {
                          textAlign: "center",
                        },
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">Date</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Username</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Name</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Mock test type</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Overall Point</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">
                            Delete Audio Files
                          </Typography>
                        </TableCell>
                        {/* <TableCell>
                          <Typography variant="h6">Overall Point</Typography>
                        </TableCell> */}
                        <TableCell>
                          <Typography variant="h6">Actions</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {props.tableSection === "register" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                        "& .MuiTableCell-head": {
                          textAlign: "center",
                        },
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">Name</Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6">
                            {" "}
                            {props.tableHead === "email" ? "Email" : "Course"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">
                            Subscription Plan
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Payment Status</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Fees</Typography>
                        </TableCell>
                        {props.type !== "course" && (
                          <TableCell>
                            <Typography variant="h6">
                              Online course ID
                            </Typography>
                          </TableCell>
                        )}

                        <TableCell>
                          <Typography variant="h6">Subscribed Date</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Actions</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {props.tableSection === "blog" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Author
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Title
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Content
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Image
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Video
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Actions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {props.tableSection === "banner" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            No
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Image
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Platform
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Actions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {props.tableSection === "tempMt" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6">User</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Mock Test</Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6">Mock Test Type</Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6">Check point</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">Current Category</Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Actions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {props.tableSection === "email-template" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Name
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Subject
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Body
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Header Image
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Footer Image
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Preview
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Actions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}

                  {props.tableSection === "recording-course" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Title
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            fees
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            video
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Description
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Requirement
                          </Typography> 
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Course Content
                          </Typography>
                        </TableCell>


                        
                      

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Actions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {props.tableSection === "videoRecording" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Name
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Video link
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Video Recording Type
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Status
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Actions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {props.tableSection === "videoRecordingType" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Name
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Actions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {props.tableSection === "material download" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",

                        top: 0,
                      }}
                    >
                      <TableRow sx={{}}>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Name
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Type
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Target User
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Url
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Status
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Actions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {props.tableSection === "material type download" && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",

                        top: 0,
                      }}
                    >
                      <TableRow sx={{}}>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Name
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "center" }}>
                            Actions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  {(props.tableSection === "feedback" ||
                    props.tableSection === "user-feedback") && (
                    <TableHead
                      sx={{
                        bgcolor: "#2196f3",
                        zIndex: 3,
                        position: "sticky",
                        top: 0,
                      }}
                    >
                      <TableRow>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Description
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Image
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Detail
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" sx={{ textAlign: "" }}>
                            Action
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  )}
                  <TableBody>
                    {props.postHtmlTable !== "" &&
                      props.postHtmlTable !== undefined &&
                      props.postHtmlTable}
                  </TableBody>
                </Table>
                {/* <nav>
                  <ul className="pagination justify-content-end">
                    {props.pagingHtml}
                  </ul>
                </nav> */}
              </TableContainer>
            </Box>
          </div>
        </div>
      </Box>
    </>
  );
});

export default TableForm;
