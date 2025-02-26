import { Box, Typography, Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TableListLoadingComponent from "../Posts/TableListLoadingComponent";
import TableListFailedComponent from "../Posts/TableListFailedComponent";
import ActionCellForList from "../../ActionCellForList";
import TableForm from "../../TableForm/TableForm";
import useDebouncedApiCall from "../../../../customHooks/DebounceApi/useDebounceApi";
import { getCookie } from "../../../../Utils/GetCookies";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import "./style.css";

function SpeakingScoreList(props) {
  const { category, fetchScoresAsync, scorePosts, scoreStatus, title } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = getCookie("userToken");

  const [selectedIndexArray, setSelectedIndexArray] = useState([]);
  const [selectedTitleArray, setSelectedTitleArray] = useState([]);
  const [idsArray, setIdsArray] = useState([]);
  const [titlesArray, setTitlesArray] = useState([]);
  let [page, setPage] = useState(1);
  let [searchValue, setSearchValue] = useState("");
  let pagePath = "scores-" + category + "?page=" + page;

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
          "&filter_type=1"
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
  let paging_html = "";

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  //for selecting post to add multiple delete
  const selectHandler = useCallback(
    (id, title) => {
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
      setSelectedTitleArray((prev) => {
        const titleArray = [...prev];
        if (selectedIndexArray.includes(id)) {
          if (titleArray.includes(title)) {
            let titleToRemove = titleArray.indexOf(title);
            titleArray.splice(titleToRemove, 1);
          }
        } else {
          titleArray.push(title);
        }
        return titleArray;
      });
    },
    [selectedIndexArray]
  );

  useEffect(() => {
    if (scoreStatus == "succeeded") {
      let ids = scorePosts?.data.map((item) => item.id);
      let titles = scorePosts?.data.map((item) => item.post_title);
      setIdsArray(ids);
      setTitlesArray(titles);
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
    setSelectedTitleArray((prev) => {
      const titleArray = [...prev];
      idsArray.forEach((id, index) => {
        if (selectedIndexArray.includes(id)) {
          if (titleArray.includes(titlesArray[index])) {
            let titleToRemove = titleArray.indexOf(titlesArray[index]);
            titleArray.splice(titleToRemove, 1);
          }
        }
        titleArray.push(titlesArray[index]);
      });
      return titleArray;
    });
  }, [selectedIndexArray, idsArray, titlesArray]);

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
    setSelectedTitleArray((prev) => {
      const titleArray = [...prev];
      idsArray.forEach((id, index) => {
        if (selectedIndexArray.includes(id)) {
          if (titleArray.includes(titlesArray[index])) {
            let titleToRemove = titleArray.indexOf(titlesArray[index]);
            titleArray.splice(titleToRemove, 1);
          }
        }
      });
      return titleArray;
    });
  }, [selectedIndexArray, idsArray, titlesArray]);

  const postsDeleteBtnHandler = () => {
    if (!token) {
      navigate("/login");
    } else {
      swal({
        title: "Warning Alert",
        text:
          "You are about to delete these " +
          selectedTitleArray.join(",") +
          "Make sure to check before delete .",
        icon: "warning",
        buttons: {
          cancel: {
            text: "Cancel",
            visible: true,
            value: "cancel",
            className: "swal-button-cancel",
            dangerMode: true,
          },
          deny: {
            text: "Audio Only",
            value: "audio",
            className: "swal-button-deny",
          },
          confirm: {
            text: "Audio and record",
            value: "all",
            className: "swal-button-confirm",
          },
        },
      }).then((value) => {
        if (value !== "cancel") {
          try {
            let config = { headers: { Authorization: "Bearer " + token } };
            axios
              .post(
                process.env.REACT_APP_BACKEND_ADMIN +
                  "multiple-delete-score-speaking",
                {
                  ids: selectedIndexArray,
                  deleteStatus: value,
                },
                config
              )
              .then((res) => {
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
                  if (btn !== undefined && btn !== null) {
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
        } else {
          swal({ text: "Score record/s is/are safe!", timer: 1500 });
        }

        // switch (value) {
        //   case "confirm":
        //     swal("Saved!", "", "success");
        //     break;
        //   case "deny":
        //     swal("Changes are not saved", "", "info");
        //     break;
        //   default:
        //     // Do nothing (Cancel was clicked)
        // }
      });

      // swal({
      //   title: "Warning Alert",
      //   text:
      //     "You are about to delete these " +
      //     selectedTitleArray.join(",") +
      //     "Make sure to check before delete .",
      //   icon: "warning",
      //   buttons: true,
      //   confirmButtonText: "Save",

      //   dangerMode: true,
      // }).then((willDelete) => {
      //   if (willDelete) {
      //     try {
      //       let config = { headers: { Authorization: "Bearer " + token } };
      //       axios
      //         .post(
      //           process.env.REACT_APP_BACKEND_ADMIN +
      //             "multiple-delete-score-speaking",
      //           {
      //             ids: selectedIndexArray,
      //           },
      //           config
      //         )
      //         .then((res) => {
      //           // swal({
      //           //   title: "Success Alert",
      //           //   text: "Score record/s deleted successfully",
      //           //   icon: "success",
      //           //   // buttons: true,
      //           //   // dangerMode: true,
      //           //   timer: 2000,
      //           // });

      //           // selectedIndexArray.forEach((id) => {
      //           //   const btn = document.getElementById(id);
      //           //   if (btn !== undefined && btn !== null) {
      //           //     btn.closest("tr").style.display = "none";
      //           //   }
      //           // });
      //           // setSelectedIndexArray([]);
      //         })
      //         .catch((error) => {
      //           swal({
      //             title: "Score record/s deleting error",
      //             text: error.message,
      //             icon: "warning",
      //             buttons: true,
      //             dangerMode: true,
      //           });
      //         });
      //     } catch (error) {
      //       swal({
      //         title: "Error Alert",
      //         text: "Failed to delete Score record/s ",
      //         icon: "error",
      //         buttons: true,
      //         dangerMode: true,
      //       });
      //     }
      //   } else {
      //     swal({ text: "Score record/s is/are safe!", timer: 1500 });
      //   }
      // });
    }
  };
  useEffect(() => {
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
              key={index}
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
                  onClick={() => selectHandler(item.id, item.post_title)}
                />
              </TableCell>
              <TableCell sx={{ ...style.ellipsisStyle, textAlign: "center" }}>
                {new Date(item?.created_at).toDateString()}
              </TableCell>
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.post_title}</TableCell>
              <TableCell>{item.number_of_words_in_post}</TableCell>
              <TableCell>{item.number_of_recognized_words}</TableCell>
              <TableCell>{parseFloat(item.overall_point).toFixed(2)}</TableCell>
              <ActionCellForList
                table="score"
                url={`${backendURL}scores-${category}`}
                item={item}
              />
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
          tableSection="score"
          pagingHtml={paging_html}
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
            count={scorePosts?.last_page}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",

            my: 2,
            gap: 1,
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
              onClick={() => selectAllHandler()}
              style={style.button}
              disabled={selectedIndexArray.length === 0 ? true : false}
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
};
export default SpeakingScoreList;
