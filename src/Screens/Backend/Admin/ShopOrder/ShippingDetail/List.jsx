import React, { useEffect, useState } from "react";

import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TableListLoadingComponent from "../../../../../components/Backend/Admin/Posts/TableListLoadingComponent";
import TableListFailedComponent from "../../../../../components/Backend/Admin/Posts/TableListFailedComponent";
import ActionCellForList from "../../../../../components/Backend/ActionCellForList";

import { fetchShippingDetailListAsync } from "../../../../../redux/thunk/ShippingDetail";
import TableForm from "../../../../../components/Backend/TableForm/TableForm";
import PageNavTitle from "../../../../../components/Backend/PageTitle";
function List() {
  const navigate = useNavigate();
  const { id } = useParams();
  // const dispatch = useDispatch();
  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  let [changeStatus, setChangeStatus] = useState(false);

  const { status, shippingDetailList } = useSelector(
    (state) => state.shippingDetails
  );
  const dispatch = useDispatch();

  let postPath = "order-shipping-detail/" + id;

  useEffect(() => {
    dispatch(fetchShippingDetailListAsync(postPath));
    setChangeStatus(false);
  }, [dispatch, postPath, changeStatus]);

  //selected index where mt_check is also true

  var post_html_table = "";
  var paging_html = "";

  //   const backendURL = process.env.REACT_APP_BACKEND_ADMIN + "l-mul-choice";
  // const backendURL = `${process.env.REACT_APP_BACKEND_ADMIN}${props.path}`;


  if (status === "loading") {
    post_html_table = <TableListLoadingComponent />;
  }
  if (status === "failed") {
    post_html_table = <TableListFailedComponent />;
  } else {
    if (status === "succeeded" && shippingDetailList !== undefined) {
      post_html_table =
        shippingDetailList?.length !== 0 ? (
          shippingDetailList?.map((item, index) => {
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
                  {item.shipping_detail}
                </TableCell>
                <TableCell sx={{ ...style.ellipsisStyle }}>
                  {item.date}
                </TableCell>

                {/* <TableCell>
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
                </TableCell> */}
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
                  url={`${backendURL}shipping-detail`}
                  item={item}
                  deleteMessage={"You are going to delete the shipping detail"}
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
                No Shipping status Yet...
              </Typography>
            </TableCell>
          </TableRow>
        );
    }
  }

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <PageNavTitle text={"Shipping Detail"} />

        <TableForm
          tableSection="shipping-detail"
          pagingHtml={paging_html}
          postHtmlTable={post_html_table}
          setPage={() => {}}
        ></TableForm>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            my: 2,
          }}
        ></Box>
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

export default List;
