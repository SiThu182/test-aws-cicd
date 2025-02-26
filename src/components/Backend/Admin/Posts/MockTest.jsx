import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import axios from "axios";
import PropTypes from "prop-types";
import * as React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import MockAccordion from "../../MockTest/MockAccordion";
import TableForm from "../../MockTest/TableForm";
import { resetLoading } from "../../../../redux/slice/PostSlice";
import { fetchPostsAsync } from "../../../../redux/thunk/Posts";
import { getCookie } from "../../../../Utils/GetCookies";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MockTestTabs(props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [value, setValue] = React.useState(0);

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = React.useState("");
  const searchFunction = (value) => {
    setSearchInput(value);
    setPostPath("search?category=" + currentCategory + "&que=" + searchInput);
  };
  const speakingCategory = [
    "Read Aloud",
    "Repeat Sentence",
    "Retell Lecture",
    "Describe Image",
    "Answer Short Question",
  ];
  const speakingAbbr = ["ra", "rs", "rl", "di", "asq"];
  const readingCategory = [
    "Single Answer",
    "Multiple Answers",
    "Reorder Paragraph",
    "Fill in the Blank",
    "R&W Fill in the Blank",
  ];
  const readingAbbr = ["rsmc", "rmc", "rop", "rfib", "rwfib"];
  const writingCategory = ["Write Essay", "Summarize Wrtten Text"];
  const writingAbbr = ["we", "swt"];
  const listeningCategory = [
    "Single Answer",
    "Multiple Answers",
    "Hightlight Correct Summary",
    "Highlight Incorrect Words",
    "Select Missing Words",
    "Write From Dictation",
    "Summarize Spoken Text",
    "Fill in the Blank",
  ];
  const listeningAbbr = ["smc", "mc", "hcs", "hiw", "smw", "wfd", "sst", "fib"];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //table
  const { posts, status, totalPage } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [post_html_table, setPostHtml] = useState();

  const [page, setPage] = React.useState(1);
  let [postPath, setPostPath] = React.useState("");
  let [currentCategory, setCurrentCategory] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  let [categoryChecked, setCategoryChecked] = React.useState({
    ra: [],
    rs: [],
    rl: [],
    di: [],
    asq: [],
    //speaking
    //reading
    rsmc: [],
    rmc: [],
    rop: [],
    rfib: [],
    rwfib: [],
    //reading
    //listening
    smc: [],
    mc: [],
    hcs: [],
    hiw: [],
    smw: [],
    wfd: [],
    sst: [],
    fib: [],
    //listening
    //writing
    we: [],
    swt: [],
    //writing
  });

  let section = useState([
    ["Speaking", ["ra", "rs", "rl", "di", "asq"]],
    ["Reading", ["rsmc", "rmc", "rop", "rfib", "rwfib"]],
    ["Listening", ["smc", "mc", "hcs", "hiw", "smw", "wfd", "sst", "fib"]],
    ["Writing", ["we", "swt"]],
  ]);

  let [dynamicState, setDynamicState] = useState();

  let [dynamicSection, setDynamicSection] = useState([]);
  React.useEffect(() => {
    if (props.chooseType !== "") {
      setDynamicState(true);
    }
  }, [props.chooseType]);

  React.useEffect(() => {
    if (dynamicState) {
      setDynamicState(false);
      setDynamicSection([]);
      switch (props.chooseType) {
        case 0:
          setDynamicSection("full");

          break;
        case 1:
          setDynamicSection("full");

          break;
        case 2:
          setDynamicSection("full");

          break;
        case 3:
          setDynamicSection((prev) => [...prev, section[0][0]]);
          break;
        case 4:
          setDynamicSection((prev) => [...prev, section[0][1]]);
          break;

        case 5:
          setDynamicSection((prev) => [...prev, section[0][2]]);
          break;
        case 6:
          setDynamicSection((prev) => [...prev, section[0][3]]);
          break;

        default:
          break;
      }
    }
  }, [props.chooseType, section, dynamicState]);

  let [checkedArray, setIsCheckedArray] = React.useState([]);

  //fetch table data
  React.useEffect(() => {
    if (postPath !== "") {
      dispatch(resetLoading());
      dispatch(fetchPostsAsync(postPath));
    }
  }, [dispatch, postPath, page]);

  //page changes with pagination
  let handleChange1 = (event, p) => {
    setPage(p);
    setPostPath(
      "search?category=" +
        currentCategory +
        "&page=" +
        p +
        "&que=" +
        searchInput
    );
  };

  //useEffect for setting table form
  React.useEffect(() => {
    const tableStyle = {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      width: "350px",
      maxWidth: "350px",
    };
    const checkedFunction = (e, id, category) => {
      if (e.target.checked && !checkedArray.includes(id)) {
        setIsCheckedArray((prev) => [...prev, id]);

        categoryChecked[category] = [...categoryChecked[category], id];
        setCategoryChecked(categoryChecked);
      }
      if (!e.target.checked && checkedArray.includes(id)) {
        checkedArray.splice(checkedArray.indexOf(id), 1);
        setIsCheckedArray(checkedArray);

        categoryChecked[category].splice(
          categoryChecked[category].indexOf(id),
          1
        );

        // categoryChecked[category] = [...categoryChecked[category]];
        setCategoryChecked(categoryChecked);
      }
    };
    if (status === "loading") {
      setPostHtml(
        <TableRow>
          <TableCell colSpan="12">
            <Box
              sx={{
                textAlign: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <CircularProgress />
              Loading
            </Box>
          </TableCell>
        </TableRow>
      );
    }
    if (status === "failed") {
      setPostHtml(
        <TableRow>
          <TableCell colSpan="12">
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ py: "20vh", color: "red" }}
            >
              Fail to fetch data
            </Typography>
          </TableCell>
        </TableRow>
      );
    } else {
      if (posts.data !== undefined) {
        setPostHtml(
          posts.data.map((item, index) => {
            return (
              <TableRow
                id={item.id}
                key={item.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  height: "20%",
                  overflow: "hidden",
                }}
                height={"30px"}
              >
                <TableCell sx={{ ...tableStyle, width: "20%" }}>
                  {item.id}
                </TableCell>
                <TableCell sx={{ ...tableStyle, width: "20%" }}>
                  {item.title}
                </TableCell>
                <TableCell sx={{ ...tableStyle, width: "40%" }}>
                  {item.content}
                </TableCell>
                <TableCell
                  sx={{
                    ...tableStyle,
                    width: "40%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: item.isActive ? "yellowgreen" : "red",
                      width: "5rem",
                      height: "2rem",
                      padding: 1,

                      margin: 1,
                      borderRadius: "0.5rem",
                      boxShadow: 3,
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </Box>
                </TableCell>
                <TableCell sx={{ ...tableStyle, width: "20%" }}>
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <input
                      type="checkbox"
                      className="checkRow"
                      style={{ cursor: "pointer", color: "green" }}
                      disabled
                      defaultChecked={item.exist_post}
                    ></input>
                  </Box>
                </TableCell>
                <TableCell sx={{ ...tableStyle, width: "20%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      className="checkRow"
                      style={{ cursor: "pointer" }}
                      defaultChecked={
                        checkedArray.includes(item.id) ? true : false
                      }
                      onClick={(e) =>
                        checkedFunction(e, item.id, item.category)
                      }
                    ></input>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })
        );
      }
    }
  }, [checkedArray, posts.data, status, categoryChecked]);

  let accordionContent = (
    <>
      <Box>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            height: "2.5rem",
            width: 300,
            mb: 1,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={searchInput}
            onChange={({ target: { value } }) => searchFunction(value)}
            placeholder="Search Table "
            inputProps={{ "aria-label": "search table" }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <TableForm postHtmlTable={post_html_table}></TableForm>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            my: 2,
          }}
        >
          <Pagination
            size="large"
            count={totalPage}
            color="primary"
            page={page}
            onChange={handleChange1}
          />
        </Box>
      </Box>
    </>
  );

  //useEffect for edit
  React.useEffect(() => {
    if (props.edit === "edit" && props.editPost !== undefined) {
      if (
        props.editPost.mt_sections !== null &&
        props.editPost.mt_sections !== undefined
      ) {
        setIsCheckedArray([]);
        props.editPost.mt_sections.forEach((ms) => {
          // if (defaultValue[ms.language_type_id - 1] === false) {

          //   defaultValue[ms.language_type_id - 1] = ms.duration;
          // }
          ms.mt_section_details.forEach((mt) => {
            setIsCheckedArray((prev) => [...prev, mt.post_id]);
            if (!categoryChecked[mt.category].includes(mt.post_id)) {
              categoryChecked[mt.category] = [
                ...categoryChecked[mt.category],
                mt.post_id,
              ];
            }

            // setDefaultValue(defaultValue);
            setCategoryChecked(categoryChecked);
          });
        });
      }
    }
  }, [props.edit, props.editPost, categoryChecked]);

  let requestObj;

  //save data and submit
  const saveType = (data) => {
    let categoryObject = (i) => {
      let object = {};
      object["duration"] = data[section[0][i][0]];
      object["language_type"] = i + 1;
      section[0][i][1].forEach((s, index) => {
        if (s !== undefined) {
          object[s] = categoryChecked[s].toString();
        }
      });
      return object;
    };

    switch (props.chooseType) {
      case 0:
        let speakingObj0 = categoryObject(0);
        let readingObj0 = categoryObject(1);
        let writingObj0 = categoryObject(3);
        let listeningObj0 = categoryObject(2);
        requestObj = {
          speaking: speakingObj0,
          reading: readingObj0,
          writing: writingObj0,
          listening: listeningObj0,
          mt_type_id: 0,
          name: data.title,
        };
        break;
      case 1:
        let speakingObj1 = categoryObject(0);
        let readingObj1 = categoryObject(1);
        let writingObj1 = categoryObject(3);
        let listeningObj1 = categoryObject(2);
        requestObj = {
          speaking: speakingObj1,
          reading: readingObj1,
          writing: writingObj1,
          listening: listeningObj1,
          mt_type_id: 1,
          name: data.title,
        };
        break;
      case 2:
        let speakingObj2 = categoryObject(0);
        let readingObj2 = categoryObject(1);
        let writingObj2 = categoryObject(3);
        let listeningObj2 = categoryObject(2);
        requestObj = {
          speaking: speakingObj2,
          reading: readingObj2,
          writing: writingObj2,
          listening: listeningObj2,
          mt_type_id: 2,
          name: data.title,
        };
        break;
      case 3:
        let speakingObj3 = categoryObject(0);
        requestObj = {
          speaking: speakingObj3,
          mt_type_id: 3,
          name: data.title,
        };
        break;
      case 4:
        let readingObj4 = categoryObject(1);
        requestObj = {
          reading: readingObj4,
          mt_type_id: 4,
          name: data.title,
        };
        break;
      case 5:
        let listeningObj5 = categoryObject(2);
        requestObj = {
          listening: listeningObj5,
          mt_type_id: 5,
          name: data.title,
        };
        break;
      case 6:
        let writingObj6 = categoryObject(3);
        requestObj = {
          writing: writingObj6,
          mt_type_id: 6,
          name: data.title,
        };
        break;

      default:
        break;
    }

    props.edit === "edit" ? editPost() : addPost();
  };

  const addPost = async () => {
    setLoading(true);
    let token = getCookie("userToken");

    let config = { headers: { Authorization: "Bearer " + token } };
    try {
      const res = await axios.post(`${backendURL}mocktest`, requestObj, config);

      if (res.data.status === 1) {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          button: "OK!",
          timer: 1500,
        });
        navigate(-1);
      } else {
        swal({
          title: "Warning",
          text: res.data.message,
          icon: "warning",
          button: "OK!",
        });
        setLoading(false);
      }
    } catch (error) {
      swal({
        title: "Warning",
        text: error.message,
        icon: "warning",
        button: "OK!",
      });
      setLoading(false);
    }
  };

  const editPost = async () => {
    setLoading(true);
    let token = getCookie("userToken");
    let id = props.editId;

    let config = { headers: { Authorization: "Bearer " + token } };
    try {
      const res = await axios.put(
        `${backendURL}mocktest/${id}`,
        requestObj,
        config
      );

      if (res.data.status === 1) {
        swal({
          title: "Success",
          text: res.data.message,
          icon: "success",
          button: "OK!",
          timer: 1500,
        });
        navigate(-1);
      } else {
        swal({
          title: "Warning",
          text: res.data.message,
          icon: "warning",
          button: "OK!",
        });
        setLoading(false);
      }
    } catch (error) {
      swal({
        title: "Warning",
        text: error.message,
        icon: "warning",
        button: "OK!",
      });
      setLoading(false);
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          allowScrollButtonsMobile
        >
          <Tab label="Speaking" {...a11yProps(0)} />
          <Tab label="Writing" {...a11yProps(1)} />
          <Tab label="Reading" {...a11yProps(2)} />
          <Tab label="Listening" {...a11yProps(3)} />
          {props.edit === "edit" ? (
            props.editPost !== undefined && (
              <Tab label="Overall MockTest" {...a11yProps(4)} />
            )
          ) : (
            <Tab label="Overall MockTest" {...a11yProps(4)} />
          )}
        </Tabs>
      </Box>
      {(props.chooseType === 0 ||
        props.chooseType === 1 ||
        props.chooseType === 2 ||
        props.chooseType === 3) && (
        <TabPanel value={value} index={0}>
          <MockAccordion
            title={speakingCategory}
            speakingAbbr={speakingAbbr}
            setFunction={setPostPath}
            setSearchInput={setSearchInput}
            page={page}
            setPage={setPage}
            setCurrentCategory={setCurrentCategory}
          >
            {accordionContent}
          </MockAccordion>
        </TabPanel>
      )}
      {(props.chooseType === 0 ||
        props.chooseType === 1 ||
        props.chooseType === 2 ||
        props.chooseType === 6) && (
        <TabPanel value={value} index={1}>
          <MockAccordion
            title={writingCategory}
            speakingAbbr={writingAbbr}
            setFunction={setPostPath}
            setSearchInput={setSearchInput}
            page={page}
            setPage={setPage}
            setCurrentCategory={setCurrentCategory}
          >
            {accordionContent}
          </MockAccordion>
        </TabPanel>
      )}
      {(props.chooseType === 0 ||
        props.chooseType === 1 ||
        props.chooseType === 2 ||
        props.chooseType === 4) && (
        <TabPanel value={value} index={2}>
          <MockAccordion
            title={readingCategory}
            speakingAbbr={readingAbbr}
            setFunction={setPostPath}
            setSearchInput={setSearchInput}
            page={page}
            setPage={setPage}
            setCurrentCategory={setCurrentCategory}
          >
            {accordionContent}
          </MockAccordion>
        </TabPanel>
      )}
      {(props.chooseType === 0 ||
        props.chooseType === 1 ||
        props.chooseType === 2 ||
        props.chooseType === 5) && (
        <TabPanel value={value} index={3}>
          <MockAccordion
            title={listeningCategory}
            speakingAbbr={listeningAbbr}
            setFunction={setPostPath}
            setSearchInput={setSearchInput}
            page={page}
            setPage={setPage}
            setCurrentCategory={setCurrentCategory}
          >
            {accordionContent}
          </MockAccordion>
        </TabPanel>
      )}

      <TabPanel value={value} index={4}>
        <form onSubmit={handleSubmit(saveType)}>
          {(props.edit !== "edit" ||
            ((props.edit === "edit" && props.editPost?.name) !== null &&
              props.editPost?.name !== undefined)) && (
            <Box sx={{ my: 1 }}>
              <Controller
                name="title"
                control={control}
                defaultValue={
                  props.edit === "edit"
                    ? props.name
                    : "Hello there this is title"
                } //insert props.title
                rules={{
                  required: {
                    value: true,
                    message: "*Title is required",
                  },
                }}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    id="title"
                    type="text"
                    variant="outlined"
                    fullWidth
                    error={!!errors.title}
                    label={<Typography variant="h5">Title</Typography>}
                    sx={{ my: 1, bgcolor: "rgb(231 239 254)" }}
                  />
                )}
              />
              {errors.title && (
                <Typography variant="p" color="red" textAlign={"left"}>
                  {errors.title.message}
                </Typography>
              )}
            </Box>
          )}

          {dynamicSection !== "" &&
            dynamicSection !== "full" &&
            dynamicSection.map((c, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    width: "100%",
                    p: 1,
                    borderRadius: "0.5rem",
                    boxShadow: 5,
                  }}
                >
                  {c[1].map((cat, index) => (
                    <Typography key={index}>
                      {cat} Checked Post :{console.log(categoryChecked[cat])}
                      {categoryChecked[cat] !== undefined ? (
                        categoryChecked[cat].length !== 0 ? (
                          categoryChecked[cat].toString()
                        ) : (
                          <span style={{ color: "red" }}>
                            *Please select posts
                          </span>
                        )
                      ) : (
                        ""
                      )}
                    </Typography>
                  ))}
                </Box>
                <Typography variant="h6">{c[0]}</Typography>
                <Controller
                  name={c[0]}
                  control={control}
                  defaultValue={
                    props.edit === "edit"
                      ? props.chooseType === 3
                        ? props.defaultValue[0]
                        : props.chooseType === 4
                        ? props.defaultValue[1]
                        : props.chooseType === 5
                        ? props.defaultValue[2]
                        : props.defaultValue[3]
                      : ""
                  }
                  //insert props.title
                  rules={{
                    required: {
                      value: true,
                      message: "*Duration is required",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      variant="outlined"
                      fullWidth
                      error={errors[c[0]]}
                      label={
                        <Typography variant="h5">{c[0]} duration</Typography>
                      }
                      sx={{ my: 1, bgcolor: "rgb(231 239 254)" }}
                    />
                  )}
                />

                {errors[c[0]] && (
                  <Typography variant="p" color="red" textAlign={"left"}>
                    {errors[c[0]].message}
                  </Typography>
                )}
              </Box>
            ))}

          {dynamicSection === "full" &&
            section[0].map((c, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    width: "100%",
                    p: 1,
                    borderRadius: "0.5rem",
                    boxShadow: 5,
                  }}
                >
                  {c[1].map((cat, index) => (
                    <Typography key={index}>
                      {cat} Checked Post :
                      {categoryChecked[cat] !== undefined
                        ? categoryChecked[cat].toString()
                        : ""}
                    </Typography>
                  ))}
                </Box>
                <Typography variant="h6">{c[0]}</Typography>
                <Controller
                  name={c[0]}
                  control={control}
                  defaultValue={
                    props.edit === "edit" ? props.defaultValue[index] : ""
                  }
                  //insert props.title
                  rules={{
                    required: {
                      value: true,
                      message: "*Duration is required",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      variant="outlined"
                      fullWidth
                      error={errors[c[0]]}
                      label={
                        <Typography variant="h5">{c[0]} duration</Typography>
                      }
                      sx={{ my: 1, bgcolor: "rgb(231 239 254)" }}
                    />
                  )}
                />

                {errors[c[0]] && (
                  <Typography variant="p" color="red" textAlign={"left"}>
                    {errors[c[0]].message}
                  </Typography>
                )}
              </Box>
            ))}
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? (
              <CircularProgress
                sx={{ width: "50%", color: "white", m: "0 auto" }}
              ></CircularProgress>
            ) : props.edit !== "" && props.edit !== undefined ? (
              "Update"
            ) : (
              "Confirm"
            )}
          </Button>
        </form>
      </TabPanel>
    </Box>
  );
}
