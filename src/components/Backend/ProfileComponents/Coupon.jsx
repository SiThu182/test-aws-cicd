import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import swal from "sweetalert";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BusinessIcon from "@mui/icons-material/Business";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Pagination,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import useDebouncedApiCall from "../../../customHooks/DebounceApi/useDebounceApi";
import {
  fetchAdminOrdersAsync,
  fetchOrdersAsync,
  fetchCouponAsync
  
} from "../../../redux/thunk/Order";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../../Utils/GetCookies";
import { FetchEmailTempAsync } from "../../../redux/thunk/EmailTemplate";
import ReadOnlyQuill from "../Admin/Marketing/ReadOnlyQuill";

 

const Row = React.memo((props) => {
  const { row } = props;
   

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
   const phone = row?.phone;

  
 
  const navigate = useNavigate();
 

 

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "50vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    display: "flex",
    gap: 2,
    p: 4,
  };
 
  

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {row.code}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.expire_date  }
        </TableCell>
        
       
        {/* <TableCell align="right">
          {row.payment_status === 0
            ? "Pending"
            : row.payment_status === 1
            ? "Completed"
            : ""}
        </TableCell> */}
        <TableCell align="right">{row.percentage}</TableCell>
        <TableCell align="right">{row.status}</TableCell>

  
       
      </TableRow>
     
      
     
    </>
  );
});

export default function Coupon() {
  const {  couponList, couponListStatus, status } =
    useSelector((state) => state.order);
  const [page, setPage] = React.useState(1);

  const dispatch = useDispatch();
  let [searchValue, setSearchValue] = React.useState(""); 
  let [dataList, setDataList] = React.useState([]);
  let userId = localStorage.getItem("userId");
  let postPath =   "get-coupon-user/" + userId + "?page=" + page;
   
  

  React.useEffect(() => {
    
       
      dispatch(fetchCouponAsync(postPath));
    
  }, [
    dispatch,
    postPath,
    page,
    searchValue,  
  ]);
  let handleChange = (event, p) => {
    setPage(p);
  };

  React.useEffect(() => {
    if (
      (couponListStatus === "succeeded" ) ||
      status === "succeeded"
    ) {
      setDataList(couponList);
    }
  }, [ status, couponList, couponListStatus]);

  console.log(couponList,"Coupon ",dataList)

  return (
    <Box>
      <TableContainer
        sx={{ my: 2, width: "100%", minWidth: "350px", overflowX: "auto" }}
        component={Paper}
      >
        <Table  >
          <TableHead>
            <TableRow>
              
              <TableCell>Coupon Code  </TableCell>
              <TableCell>Expire Date</TableCell>
              <TableCell align="right">Percentage</TableCell>
 

              <TableCell align="right">Status</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {(dataList?.data?.length >= 0 && dataList?.data) !== undefined &&
              dataList?.data?.map((row) => (
                <Row
                  key={row.id}
                  row={row} 
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
 
    </Box>
  );
}
