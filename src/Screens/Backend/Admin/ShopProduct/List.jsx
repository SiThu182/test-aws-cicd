import {
  Box,
  Button,
  Pagination,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductListAsync } from "../../../../redux/thunk/Product";
import PageNavTitle from "../../../../components/Backend/PageTitle";
import TableForm from "../../../../components/Backend/TableForm/TableForm";
import ActionCellForList from "../../../../components/Backend/ActionCellForList";
import TableListLoadingComponent from "../../../../components/Backend/Admin/Posts/TableListLoadingComponent";
import TableListFailedComponent from "../../../../components/Backend/Admin/Posts/TableListFailedComponent";
import { getCookie } from "../../../../Utils/GetCookies";

function ReusableList() {
  // const { lmcPosts, lmcStatus } = useSelector((state) => state.posts);

  const navigate = useNavigate();
  const [statusId, setStatusId] = useState();
  // const dispatch = useDispatch();
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  let [changeStatus, setChangeStatus] = useState(false);
  const [selectedIndexArray, setSelectedIndexArray] = useState([]);
  const { productListStatus, productList } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  let [page, setPage] = useState(1);

  let postPath = "products?page=" + page;

  useEffect(() => {
    dispatch(fetchProductListAsync(postPath));
    setChangeStatus(false);
  }, [dispatch, postPath, page, changeStatus]);

  let handleChange = (event, p) => {
    setPage(p);
  };
  //selected index where mt_check is also true
  const [
    selectedOverlappedCheckIndexArray,
    setSelectedOverlappedCheckIndexArray,
  ] = useState([]);
  let token = getCookie("userToken");
  let config = { headers: { Authorization: "Bearer " + token } };

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

  var post_html_table = "";
  var paging_html = "";

  //   const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "l-mul-choice";
  // const backendURL = `${process.env.REACT_APP_BACKEND_ADMIN}${props.path}`;

  //for selecting post to add prediction or others
  const selectHandler = (id, mt_check, prediction_check) => {
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
  };
  function handleReload(status) {}
  const postsDeleteBtnHandler = () => {
    if (selectedOverlappedCheckIndexArray.length === 0) {
      if (!token) {
        navigate("/login");
      } else {
        try {
          axios
            .post(
              backendURL + "delete-selected-posts",
              {
                ids: selectedIndexArray,
              },
              config
            )
            .then(() => {
              swal({
                title: "Success Alert",
                text: "Selected post/s deleted successfully",
                icon: "success",
                // buttons: true,
                // dangerMode: true,
                timer: 2000,
              });

              handleReload(true);
            })
            .catch((error) => {
              swal({
                title: "Selected post/s deleting error",
                text: error.message,
                icon: "warning",
                buttons: true,
                dangerMode: true,
              });
            });
        } catch (error) {
          swal({
            title: "Error Alert",
            text: "Failed to delete Selected post/s ",
            icon: "error",
            buttons: true,
            dangerMode: true,
          });
        }
      }
    } else {
      swal({
        title: "Error Alert",
        text: "Failed to delete Prediction post/s because selected post/s is/are included in mock test or predictions make sure you uncheck those post/s",
        icon: "error",
        buttons: true,
        dangerMode: true,
      });
    }
  };

  if (productListStatus === "loading") {
    post_html_table = <TableListLoadingComponent />;
  }
  if (productListStatus === "failed") {
    post_html_table = <TableListFailedComponent />;
  } else {
    if (productListStatus === "succeeded" && productList?.data !== undefined) {
      post_html_table =
        productList.data?.length !== 0 ? (
          productList.data.map((item, index) => {
            return (
              <TableRow
                id={item.id}
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  height: "20%",
                  overflow: "scroll",
                }}
                height={"60px"}
              >
                <TableCell sx={{ ...style.ellipsisStyle }}>{item.id}</TableCell>
                <TableCell sx={{ ...style.ellipsisStyle }}>
                  {item.name}
                </TableCell>
                <TableCell sx={{ ...style.ellipsisStyle }}>
                  <img
                    src={
                      process.env.REACT_APP_BACKEND_URL +
                      "storage/" +
                      item.images[0]?.url
                    }
                    alt="Product main "
                    style={{ width: "100%" }}
                  />
                </TableCell>
                <TableCell sx={{ ...style.ellipsisStyle }}>
                  {item.supplier?.name}
                </TableCell>
                <TableCell sx={{ ...style.ellipsisStyle }}>
                  {item?.variations?.map((v, index) =>
                    item?.variations?.length - 1 != index
                      ? v?.sku + " ,"
                      : v?.sku
                  )}
                </TableCell>

                <TableCell>
                  <Link to={`./${item.id}`}>
                    <Tooltip title="Detail Info">
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          mr: 3,
                          bgcolor: "#2196f3",
                          "&:hover": {
                            bgcolor: "white",
                            "& .MuiSvgIcon-root": {
                              color: "black",
                            },
                          },
                        }}
                      >
                        <RemoveRedEyeIcon
                          sx={{ color: "white" }}
                        ></RemoveRedEyeIcon>
                      </Button>
                    </Tooltip>
                  </Link>
                </TableCell>
                {/* {props.image === "image" && (
                  <TableCell sx={{ ...style.ellipsisStyle }}>
                    <img
                      src={
                        item.media_type === "1"
                          ? item.media
                          : `${process.env.REACT_APP_BACKEND_URL}storage/${props.storage}/${item.media}`
                      }
                      alt="diImg"
                      style={{
                        ...style.imageStyle,
                      }}
                    />
                  </TableCell>
                )} */}

                <ActionCellForList
                  url={`${backendURL}products`}
                  item={item}
                  deleteMessage={
                    "You are going to delete the product" +
                    item?.name +
                    ".This will delete all the variant of this product"
                  }
                />
              </TableRow>
            );
          })
        ) : (
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              height: "20%",
              overflow: "scroll",
            }}
            height={"60px"}
          >
            <TableCell sx={{ ...style.ellipsisStyle }}>
              <Typography color={"red"} variant="h5">
                No Product Yet...
              </Typography>
            </TableCell>
          </TableRow>
        );
    }
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <PageNavTitle text={"Product"} />

        <TableForm
          tableSection="product"
          pagingHtml={paging_html}
          postHtmlTable={post_html_table}
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
            count={productList?.last_page}
            color="primary"
            page={page}
            disabled={productListStatus === "loading" ? true : false}
            onChange={handleChange}
          />
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

export default ReusableList;
