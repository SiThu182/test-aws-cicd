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
} from "../../../redux/thunk/Order";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../../Utils/GetCookies";
import { FetchEmailTempAsync } from "../../../redux/thunk/EmailTemplate";
import ReadOnlyQuill from "../Admin/Marketing/ReadOnlyQuill";

const EmailSelectBox = (props) => {
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const { emailTempList, emailTempListStatus } = useSelector(
    (state) => state.emailTemp
  );
  let handleChange = (event, p) => {
    setPage(p);
  };
  const dispatch = useDispatch();
  let postPath = "shop-email-template?page=" + page;
  React.useEffect(() => {
    dispatch(FetchEmailTempAsync({ path: postPath }));
  }, [dispatch, postPath]);

  const handleSendEmail = async (templateId) => {
    const backendURL = process.env.REACT_APP_BACKEND_ADMIN;

    setLoading(true);
    let token = getCookie("userToken");
    let config = { headers: { Authorization: "Bearer " + token } };
    try {
      const result = await axios.get(
        `${backendURL}sent-shop-email/${templateId}/${props.userId}`,
        config
      );

      if (result.status === 200) {
        swal({
          title: "Success",
          text: result.data.message,
          icon: "success",
          button: "OK!",
        });

        setLoading(false);
      } else {
        swal({
          title: "Warning",
          text: result.data.message,
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
    <>
      <Box>
        {emailTempListStatus === "succeeded" &&
          emailTempList?.data.map((e) => (
            <Box
              key={e.id}
              sx={{
                background: "whitesmoke",
                padding: 2,
                borderRadius: "0.5rem",
                boxShadow: 2,
              }}
            >
              <Typography> Template name :{e.name}</Typography>
              <Typography> Subject :{e.subject}</Typography>
              <Box>
                <ReadOnlyQuill
                  delta={e.body_text}
                  quillClass="read-only-quill"
                />
              </Box>
              <Box>
                <Button
                  onClick={() => handleSendEmail(e.id)}
                  disabled={loading}
                >
                  {loading ? <CircularProgress /> : ""}
                  Use this email & send
                </Button>
              </Box>
            </Box>
          ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          my: 2,
        }}
      >
        <Pagination
          size="large"
          count={emailTempList.last_page}
          color="primary"
          page={page}
          onChange={handleChange}
        />
      </Box>
    </>
  );
};

const Row = React.memo((props) => {
  const { row, isAdmin } = props;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const shippingAddress = row?.shipping_address;
  const phone = row?.phone;

  const [modalOpen, setModalOpen] = React.useState();
  const [emailModalOpen, setEmailModalOpen] = React.useState();
  const [contactModalOpen, setContactModalOpen] = React.useState(false);
  const [statusValue, setStatusValue] = React.useState(row.order_status);
  const [paymentType, setPaymentType] = React.useState("stripe");

  const [trackingNumber, setTrackingNumber] = React.useState(
    row.tracking_number
  );

  const navigate = useNavigate();
  const handlePaymentChange = (event) => {
    setPaymentType(event.target.value);
  };

  const statusArray = [
    "Payment Pending",
    "Payment Completed",
    "Order Processing",
    "Shipping",
    "Delivery",
    "Delivery Complete",
    "Order Complete",
    "Order Cancel",
    "Order Failed",
    "Return",
    "Refund",
  ];
  const handlePay = () => {
    setModalOpen(false);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleEmailModalClose = () => {
    setEmailModalOpen(false);
  };

  const handleContactModalClose = () => {
    setContactModalOpen(false);
  };

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
  const handleSelectChange = (event) => {
    setStatusValue(event.target.value);
  };
  const shippingDetailClientHandler = (id) => {
    props.shippingDetailShowHandler(id);
  };

  const backendURL = process.env.REACT_APP_BACKEND_ADMIN;
  const updateHandler = async (id, trackingNumber, orderStatus) => {
    setLoading(true);
    let token = getCookie("userToken");
    let config = { headers: { Authorization: "Bearer " + token } };
    try {
      const result = await axios.put(
        `${backendURL}place-order/${id}`,
        {
          order_status: orderStatus * 1,
          tracking_number: trackingNumber * 1,
        },
        config
      );

      if (result.status === 200) {
        swal({
          title: "Success",
          text: result.data.message,
          icon: "success",
          button: "OK!",
        });

        setLoading(false);
      } else {
        swal({
          title: "Warning",
          text: result.data.message,
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
  let token = getCookie("userToken");
  let userId = localStorage.getItem("userId");
  let config = {
    headers: { Authorization: "Bearer " + token },
  };

  const [removeCoupon, setRemoveCoupon] = React.useState([]);
  const [isRemoving, setIsRemoving] = React.useState(false);
  const backendRemoveURL = `${process.env.REACT_APP_BACKEND_ADMIN}remove-applied-coupon`;
  const clickRemove = async (coupon, orderId) => {
    try {
      setIsRemoving(true);
      let result = await axios.post(
        backendRemoveURL,
        {
          code: coupon,
          user_id: userId * 1,
          order_id: orderId,
        },
        config
      );
      if (result.status === 200) {
        setIsRemoving(false);
        setRemoveCoupon((prev) => [...prev, coupon]);
      }
    } catch (error) {
      swal({
        title: "Success",
        text: error.message,
        icon: "Success",
        button: "OK!",
      });
      setIsRemoving(false);
    }
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.created_at}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.invoice_no}
        </TableCell>
        <TableCell align="right">
          <Box
            sx={{
              p: 1,
              borderRadius: "0.5rem",

              color: "white",
            }}
          >
            <TextField
              id="filled-order-status"
              select
              label="Select"
              value={statusValue}
              variant="filled"
              disabled={!isAdmin || loading}
              onChange={handleSelectChange}
              fullWidth
              sx={{
                bgcolor:
                  statusValue == 0
                    ? "yellow"
                    : statusValue === 1
                    ? "yellowgreen"
                    : statusValue == 2
                    ? "yellow"
                    : statusValue == 3
                    ? "yellow"
                    : statusValue == 4
                    ? "yellow"
                    : statusValue == 5
                    ? "green"
                    : statusValue == 6
                    ? "green"
                    : statusValue == 7
                    ? "red"
                    : statusValue == 8
                    ? "red"
                    : statusValue == 9
                    ? "gray"
                    : "gray",
              }}
            >
              {statusArray.map((option, index) => (
                <MenuItem key={option} value={index}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </TableCell>
        {/* <TableCell align="right">
          {row.payment_status === 0
            ? "Pending"
            : row.payment_status === 1
            ? "Completed"
            : ""}
        </TableCell> */}
        <TableCell align="right">{row.currency}</TableCell>
        <TableCell align="right">{row.transaction_fees}</TableCell>
        {isAdmin && (
          <>
            <TableCell sx={{ minWidth: "160px" }}>
              <TextField
                id="filled-basic"
                label="Tracking Number"
                variant="filled"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </TableCell>
            <TableCell>
              <Button
                variant="outlined"
                disabled={loading}
                onClick={() =>
                  updateHandler(row.id, trackingNumber, statusValue)
                }
              >
                Update
              </Button>
            </TableCell>
            <TableCell>
              <Button
                variant="outlined"
                disabled={loading}
                onClick={() => setEmailModalOpen(true)}
              >
                Send Email
              </Button>
            </TableCell>
          </>
        )}
        <TableCell sx={{ minWidth: "10rem" }}>
          <Button
            variant="outlined"
            disabled={loading}
            onClick={() =>
              !isAdmin
                ? shippingDetailClientHandler(row)
                : navigate("./shipping-detail/" + row.id)
            }
          >
            <LocalShippingIcon />
          </Button>
        </TableCell>

        <TableCell sx={{ minWidth: "10rem" }}>
          <Button
            variant="outlined"
            disabled={loading}
            onClick={() => setContactModalOpen(true)}
          >
            <BusinessIcon />
          </Button>
        </TableCell>
        {!isAdmin && (
          <TableCell>
            <Box>
              {row.payment_status === 0 && (
                <Link to="/pte-shop/check-out" state={row}>
                  <Button variant="outlined">Check Out</Button>
                </Link>
              )}
            </Box>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 1,
                bgcolor: "#fff1d0",
                padding: 1,
                borderRadius: "0.5rem",
              }}
            >
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Coupon</TableCell>
                    <TableCell align="right">Discount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                    {row.payment_status === 0 && (
                      <TableCell align="right">Remove Coupon</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.order_details !== undefined &&
                    row.order_details.map((detailRow) => (
                      <TableRow key={detailRow.id}>
                        <TableCell>{detailRow?.product?.name}</TableCell>
                        <TableCell align="right">
                          {detailRow.unit_price}
                        </TableCell>
                        <TableCell align="right">
                          {detailRow.quantity}
                        </TableCell>
                        <TableCell align="right">
                          {removeCoupon.includes(detailRow?.coupon?.code)
                            ? ""
                            : detailRow?.coupon?.code}
                        </TableCell>
                        <TableCell align="right">
                          {detailRow?.coupon?.percentage}
                        </TableCell>
                        <TableCell align="right">
                          {Math.round(
                            detailRow.unit_price * detailRow.quantity
                          )}
                          {}
                        </TableCell>
                        {row.payment_status === 0 &&
                          detailRow?.coupon?.code && (
                            <TableCell align="right">
                              <Button
                                variant="outlined"
                                disabled={isRemoving}
                                onClick={() => {
                                  clickRemove(detailRow?.coupon?.code, row.id);
                                }}
                              >
                                Remove
                              </Button>
                            </TableCell>
                          )}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Choose Payment Method
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="stripe"
            name="payment-group"
            value={paymentType}
            onChange={handlePaymentChange}
          >
            <FormControlLabel
              value="stripe"
              control={<Radio />}
              label={
                <>
                  <img
                    src={
                      process.env.REACT_APP_FRONTEND_URL +
                      "Image/stripe_payment.png"
                    }
                    style={{ width: "15rem", borderRadius: "2rem" }}
                    alt="stripe_payment"
                  />
                </>
              }
            />
            <FormControlLabel
              value="paypal"
              control={<Radio />}
              label={
                <img
                  src={
                    process.env.REACT_APP_FRONTEND_URL +
                    "Image/paypal_payment.png"
                  }
                  style={{ width: "15rem", borderRadius: "2rem" }}
                  alt="stripe_payment"
                />
              }
            />
          </RadioGroup>
          <Button onClick={() => handlePay()}>Pay Now</Button>
        </Box>
      </Modal>
      <Modal
        open={emailModalOpen}
        onClose={handleEmailModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Choose Email Templates to send
          </Typography>
          <EmailSelectBox userId={row.user_id} />
        </Box>
      </Modal>
      <Modal
        open={contactModalOpen}
        onClose={handleContactModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Contact Details
            </Typography>
            <Typography variant="p">
              {!shippingAddress?.includes("{") && shippingAddress}
              {shippingAddress?.includes("{") && (
                <>
                  <span>
                    house number :{JSON.parse(shippingAddress).house_number}
                  </span>
                  <br />
                  <span>building :{JSON.parse(shippingAddress).building}</span>
                  <br />
                  <span>street :{JSON.parse(shippingAddress).street}</span>
                  <br />
                  <span>district :{JSON.parse(shippingAddress).district}</span>
                  <br />
                  <span>city :{JSON.parse(shippingAddress).city}</span>
                  <br />
                  <span>country :{JSON.parse(shippingAddress).country}</span>
                  <br />
                  <span>
                    postal code: {JSON.parse(shippingAddress).postal_code}
                  </span>
                  <br />
                </>
              )}
            </Typography>
          </Box>
          <Box>
            {" "}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              User Details
            </Typography>
            <Typography variant="p">
              {!shippingAddress?.includes("{") && shippingAddress}
              {shippingAddress?.includes("{") && (
                <>
                  <span>Email :{row?.users?.email}</span>
                  <br />
                  <span>Name :{row?.users?.name}</span>
                  <br />

                  <span>phone : {phone}</span>
                </>
              )}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
});

export default function OrderClient({ isAdmin, shippingDetailShowHandler }) {
  const { orderList, adminOrderList, adminOrderListStatus, status } =
    useSelector((state) => state.order);
  const [page, setPage] = React.useState(1);

  const dispatch = useDispatch();
  let [searchValue, setSearchValue] = React.useState("");
  let [payOrderId, setPayOrderId] = React.useState();
  let [dataList, setDataList] = React.useState([]);
  let userId = localStorage.getItem("userId");
  let postPath = isAdmin
    ? "place-order?page=" + page
    : "get-client-order/" + userId + "?page=" + page;
  let searchPath =
    "search-order-by-name" + userId + "?page=" + page + "&order=" + searchValue;
  const { setDebouncedValue } = useDebouncedApiCall(
    (path) => fetchOrdersAsync(path),
    1000
  );

  React.useEffect(() => {
    if (searchValue !== "") {
      setDebouncedValue(searchPath);
    } else {
      isAdmin
        ? dispatch(fetchAdminOrdersAsync(postPath))
        : dispatch(fetchOrdersAsync(postPath));
    }
  }, [
    dispatch,
    postPath,
    page,
    searchValue,
    searchPath,
    isAdmin,
    setDebouncedValue,
  ]);
  let handleChange = (event, p) => {
    setPage(p);
  };

  React.useEffect(() => {
    if (
      (adminOrderListStatus === "succeeded" && isAdmin) ||
      status === "succeeded"
    ) {
      setDataList(isAdmin ? adminOrderList : orderList);
    }
  }, [adminOrderList, isAdmin, status, orderList, adminOrderListStatus]);

  return (
    <Box>
      <TableContainer
        sx={{ my: 2, width: "100%", minWidth: "350px", overflowX: "auto" }}
        component={Paper}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Date</TableCell>
              <TableCell>Order Invoice</TableCell>
              <TableCell align="right">Order Status</TableCell>

              {/* <TableCell align="right">Payment Status</TableCell> */}
              <TableCell align="right">Currency</TableCell>
              <TableCell align="right">Transaction Fees</TableCell>
              {isAdmin && (
                <>
                  <TableCell align="right">Add tracking Number</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">Send Email</TableCell>
                </>
              )}

              <TableCell align="right">Shipping Details</TableCell>
              <TableCell align="right">Contact Details</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(dataList?.data?.length >= 0 && dataList?.data) !== undefined &&
              dataList?.data?.map((row) => (
                <Row
                  key={row.id}
                  row={row}
                  isAdmin={isAdmin}
                  shippingDetailShowHandler={shippingDetailShowHandler}
                  setPayOrderId={setPayOrderId}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ my: 2, display: "flex", justifyContent: "flex-end" }}>
        <Pagination
          size="large"
          count={dataList?.last_page || 1}
          color="primary"
          page={page}
          // disabled={status === "loading" ? true : false}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}
