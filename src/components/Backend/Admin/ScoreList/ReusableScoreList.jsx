import { Box, Typography, Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableListLoadingComponent from "../Posts/TableListLoadingComponent";
import TableListFailedComponent from "../Posts/TableListFailedComponent";
import ActionCellForList from "../../ActionCellForList";
import TableForm from "../../TableForm/TableForm";
import useDebouncedApiCall from "../../../../customHooks/DebounceApi/useDebounceApi";
import axios from "axios";
import swal from "sweetalert";
import { getCookie } from "../../../../Utils/GetCookies";
import Checkbox from "@mui/material/Checkbox";
function ReusableScoreList(props) {
  const { category, path, fetchScoresAsync, scorePosts, scoreStatus, title } =
    props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedIndexArray, setSelectedIndexArray] = useState([]);
  const [idsArray, setIdsArray] = useState([]);
  // const [titlesArray, setTitlesArray] = useState([]);
  let [page, setPage] = useState(1);
  let [searchValue, setSearchValue] = useState("");
  let token = getCookie("userToken");

  let pagePath =
    path !== null && path !== undefined
      ? path + page
      : "r-score?category=" + category + "&page=" + page;

  const { setDebouncedValue } = useDebouncedApiCall(
    (path) => fetchScoresAsync(path),
    1000
  );

  useEffect(() => {
    if (searchValue !== "") {
      setDebouncedValue(
        "search-score-by-name?page=" +
          page +
          "&q=" +
          searchValue +
          "&category=" +
          category +
          "&filter_type=2"
      );
    } else {
      dispatch(fetchScoresAsync(pagePath));
    }
  }, [
    dispatch,
    pagePath,
    page,
    setDebouncedValue,
    searchValue,
    fetchScoresAsync,
    category,
  ]);

  //pagination
  let handleChange = (event, p) => {
    setPage(p);
  };

  let [post_html_table, setPostHTMLTable] = useState();

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "s-mul-choice";
  useEffect(() => {
    if (scoreStatus == "succeeded") {
      let ids = scorePosts?.data.map((item) => item.id);
      // let titles = scorePosts?.data.map((item) => item.post_title);
      setIdsArray(ids);
      // setTitlesArray(titles);
    }
  }, [scorePosts, scoreStatus]);

  const selectAllHandler = useCallback(() => {
    setSelectedIndexArray((prev) => {
      const indexArray = [...prev];
      idsArray.forEach((id) => {
        if (indexArray.includes(id)) {
          let indexToRemove = indexArray.indexOf(id);
          indexArray.splice(indexToRemove, 1);
        }
        indexArray.push(id);
      });

      return indexArray;
    });
    // setSelectedTitleArray((prev) => {
    //   const titleArray = [...prev];
    //   idsArray.forEach((id, index) => {
    //     if (selectedIndexArray.includes(id)) {
    //       if (titleArray.includes(titlesArray[index])) {
    //         let titleToRemove = titleArray.indexOf(titlesArray[index]);
    //         titleArray.splice(titleToRemove, 1);
    //       }
    //     }
    //     titleArray.push(titlesArray[index]);
    //   });
    //   return titleArray;
    // });
  }, [idsArray]);

  const unSelectAllHandler = useCallback(() => {
    setSelectedIndexArray((prev) => {
      const indexArray = [...prev];
      idsArray.forEach((id) => {
        if (indexArray.includes(id)) {
          let indexToRemove = indexArray.indexOf(id);
          indexArray.splice(indexToRemove, 1);
        }
      });

      return indexArray;
    });
    // setSelectedTitleArray((prev) => {
    //   const titleArray = [...prev];
    //   idsArray.forEach((id, index) => {
    //     if (selectedIndexArray.includes(id)) {
    //       if (titleArray.includes(titlesArray[index])) {
    //         let titleToRemove = titleArray.indexOf(titlesArray[index]);
    //         titleArray.splice(titleToRemove, 1);
    //       }
    //     }
    //   });
    //   return titleArray;
    // });
  }, [idsArray]);

  //for selecting post to add multiple delete
  const selectHandler = useCallback((id) => {
    //if selected index's mt_check is also true

    setSelectedIndexArray((prev) => {
      const indexArray = [...prev];
      if (indexArray.includes(id)) {
        let indexToRemove = indexArray.indexOf(id);
        indexArray.splice(indexToRemove, 1);
      } else {
        indexArray.push(id);
      }
      return indexArray;
    });
  }, []);

  useEffect(() => {
    const ellipsisStyle = {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      width: "350px",
      maxWidth: "350px",
    };
    if (scoreStatus === "loading") {
      setPostHTMLTable(<TableListLoadingComponent />);
    } else if (scoreStatus === "failed") {
      setPostHTMLTable(<TableListFailedComponent />);
    } else if (scoreStatus === "succeeded") {
      if (scorePosts.data !== undefined) {
        let table = scorePosts.data.map((item, index) => {
          return (
            <TableRow
              id={item.id}
              key={item.id}
              sx={{
                borderBottom: 2,
                "& .MuiTableCell-root": {
                  textAlign: "center",
                },

                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell sx={{ ...style.ellipsisStyle }}>
                <Checkbox
                  checked={selectedIndexArray.includes(item.id)}
                  inputProps={{ "aria-label": "controlled" }}
                  onClick={() => selectHandler(item.id)}
                />
              </TableCell>
              <TableCell sx={{ ...ellipsisStyle, textAlign: "center" }}>
                {new Date(item?.created_at).toDateString()}
              </TableCell>
              <TableCell sx={{ ...ellipsisStyle }}>{item.username}</TableCell>
              <TableCell sx={{ ...ellipsisStyle }}>{item.post_title}</TableCell>
              <TableCell sx={{ ...ellipsisStyle }}>
                {item.overall_point}
              </TableCell>
              <TableCell sx={{ ...ellipsisStyle }}>
                {item.category === "rmc"
                  ? "Multiple Answers"
                  : item.category === "rsmc"
                  ? "Single Answer"
                  : item.category === "rfib"
                  ? "Fill in the Blank"
                  : item.category === "rwfib"
                  ? "R&W Fill in the Blank"
                  : item.category === "rop"
                  ? "Reorder Paragraph"
                  : item.category === "we"
                  ? "Write Essay"
                  : item.category === "wemail"
                  ? "Write Email"
                  : item.category === "swt"
                  ? "Summarized written text"
                  : item.category === "mc"
                  ? "Multiple Answers"
                  : item.category === "smc"
                  ? "Single Answer"
                  : item.category === "hcs"
                  ? "Highlight correct summary"
                  : item.category === "smw"
                  ? "Select Missing Word"
                  : item.category === "hiw"
                  ? "Highlight Incorrect Words"
                  : item.category === "fib"
                  ? "Fill In the Blank"
                  : item.category === "wfd"
                  ? "Write from Dictation"
                  : item.category === "sst"
                  ? "Summarize Spoken Text"
                  : ""}
              </TableCell>
              <ActionCellForList table="score" url={backendURL} item={item} />
            </TableRow>
          );
        });
        setPostHTMLTable(table);
      }
    }
  }, [
    scoreStatus,
    backendURL,
    scorePosts,
    selectHandler,
    selectedIndexArray,
    category,
  ]);

  const postsDeleteBtnHandler = () => {
    if (!token) {
      navigate("/login");
    } else {
      try {
        let config = { headers: { Authorization: "Bearer " + token } };
        axios
          .post(
            process.env.REACT_APP_BACKEND_ADMIN +
              "multiple-delete-s-mul-choice",
            {
              ids: selectedIndexArray,
            },
            config
          )
          .then(() => {
            swal({
              title: "Success Alert",
              text: "Score record/s deleted successfully",
              icon: "success",
              // buttons: true,
              // dangerMode: true,
              timer: 2000,
            });

            selectedIndexArray.forEach((id) => {
              const btn = document.getElementById(id);

              if (btn !== null && btn !== undefined) {
                btn.closest("tr").style.display = "none";
              }
            });
            setSelectedIndexArray([]);
          })
          .catch((error) => {
            swal({
              title: "Score record/s deleting error",
              text: error.message,
              icon: "warning",
              buttons: true,
              dangerMode: true,
            });
          });
      } catch (error) {
        swal({
          title: "Error Alert",
          text: "Failed to delete Score record/s ",
          icon: "error",
          buttons: true,
          dangerMode: true,
        });
      }
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            ml: "2rem",
            top: "1rem",

            position: "absolute",
            overflow: "visible",
            zIndex: 1500,
          }}
        >
          <Typography variant="h5">{title}</Typography>
        </Box>
        <TableForm
          tableSection="mc"
          postHtmlTable={post_html_table}
          setSearchValue={setSearchValue}
          setPage={setPage}
        ></TableForm>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            my: 2,
          }}
        >
          <Pagination
            size="large"
            disabled={scoreStatus === "loading" ? true : false}
            count={scorePosts.last_page}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",

            my: 2,
          }}
        >
          <Box sx={(style.predictionBtn, { display: "flex", gap: 1 })}>
            <Button
              variant="contained"
              onClick={() => selectAllHandler()}
              style={style.button}
              disabled={idsArray.length === 0 ? true : false}
            >
              Select all
            </Button>
            <Button
              variant="contained"
              onClick={() => unSelectAllHandler()}
              style={style.button}
              disabled={selectedIndexArray.length === 0 ? true : false}
            >
              Unselect all
            </Button>
            <Button
              variant="contained"
              onClick={() => postsDeleteBtnHandler()}
              style={style.button}
              disabled={selectedIndexArray.length === 0 ? true : false}
            >
              Delete Selected Posts
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

const style = {
  predictionBtn: {
    display: "flex",
    alignItems: "center",
    mx: "2rem",
  },
  audioStyle: {
    width: "100%",
    minWidth: "10rem",
    marginTop: "1rem",
    height: "2rem",
  },
  imageStyle: {
    width: "100%",
    minHeight: "5rem",
    minWidth: "5rem",
    marginTop: "1rem",
    height: "2rem",
  },
  button: {},
  ellipsisStyle: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "250px",
    maxWidth: "250px",
  },
};

export default ReusableScoreList;
