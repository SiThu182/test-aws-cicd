// import ImageIcon from "@mui/icons-material/Image";

import {
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Typography,
} from "@mui/material";
import swal from "sweetalert";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAddressesAsync } from "../../../redux/thunk/Users";
import { ProfileStyle } from "./ProfileStyle";
import AddressForm from "../../Frontend/PTEShop/AddressForm";
import axios from "axios";
import { getCookie } from "../../../Utils/GetCookies";
import { validateFullAddress } from "../../../Utils/AddressValidation";

function ShopUserInfo() {
  const dispatch = useDispatch();

  const [shippingAdderss, setShippingAddress] = useState({});
  // const [billingAdderss, setBillingAddress] = useState({});
  // const [checked, setChecked] = React.useState(true);
  const [updatedShippingAddress, setUpdatedShippingAddress] = useState("");
  // const [updatedBillingAddress, setUpdatedBillingAddress] = useState("");
  const { userAddresses, userAddressesStatus } = useSelector(
    (state) => state.user
  );

  // const file = watch("file");

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    dispatch(fetchUserAddressesAsync(userId));
  }, [dispatch]);

  useEffect(() => {
    if (userAddressesStatus === "succeeded") {
      setShippingAddress(
        userAddresses?.data?.length > 1
          ? userAddresses?.data?.filter((a) => a.address_type == 0)
          : userAddresses?.data
      );
      // setBillingAddress(
      //   userAddresses?.data?.length >= 1
      //     ? userAddresses?.data?.filter((a) => a.address_type == 1)
      //     : userAddresses?.data
      // );
    }
  }, [userAddresses, userAddressesStatus]);
  // const handleClickCheckBox = (event) => {
  //   setChecked(event.target.checked);
  // };

  const apiKey = process.env.REACT_APP_MAP_API_KEY;

  const validateAddress = async (address) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: address,
            key: apiKey,
          },
        }
      );
      let allowedCountry = ["Singapore", "Thailand", "Australia"];
      const { results, status } = response.data;

      if (
        status === "OK" &&
        results.length > 0 &&
        allowedCountry.includes(updatedShippingAddress.country)
      ) {
        const location = results[0].geometry.location;

        return {
          valid: true,
          address: results[0].formatted_address,
          location,
        };
      } else {
        return {
          valid: false,
          message: "Invalid address or not included in allowed country",
        };
      }
    } catch (error) {
      return { valid: false, message: "Error validating address" };
    }
  };

  const backendURL = `${process.env.REACT_APP_BACKEND_ADMIN}set-address`;

  const submitUserDetail = async () => {
    // let string = "hello there";
    // let encryptedData = encryptData(string);

    let userId = localStorage.getItem("userId");
    let validateResult = await await validateFullAddress(
      updatedShippingAddress.house_number,
      updatedShippingAddress.street,
      updatedShippingAddress.city,
      updatedShippingAddress.state,
      updatedShippingAddress.postal_code,
      updatedShippingAddress.country
    );

    if (!validateResult?.valid) {
      return swal({
        title: "Warning",
        text: "Invalid address",
        icon: "warning",
        button: "OK!",
      });
    }
    const request = {
      user_id: userId,
      postal_code: updatedShippingAddress.postal_code,
      district: updatedShippingAddress.district,
      city: updatedShippingAddress.city,
      address: updatedShippingAddress.address,
      street: updatedShippingAddress.street,
      house_number: updatedShippingAddress.house_number,
      building: updatedShippingAddress.building,
      address_type: 0,
      country: updatedShippingAddress.country,
      // same_address: checked,
    };
    let token = getCookie("userToken");
    let config = {
      headers: { Authorization: "Bearer " + token },
    };
    try {
      const res = await axios.post(`${backendURL}`, request, config);

      if (res.status === 200) {
        if (res.data.errors) {
          swal({
            title: "Warning",
            text: res.data.errors[0],
            icon: "warning",
            button: "OK!",
          });
          return { status: "error" };
        } else {
          swal({
            title: "Success",
            text: res.data.message,
            icon: "success",
            button: "OK!",
          });
          return { status: "ok" };
        }
      } else {
        swal({
          title: "Warning",
          text: res.data.message,
          icon: "warning",
          button: "OK!",
        });
        return { status: "error" };
      }
    } catch (error) {
      swal({
        title: "Warning",
        text: error.message,
        icon: "warning",
        button: "OK!",
      });
      return { status: "error" };
    }
  };
  return (
    <div>
      <Card
        sx={{
          mb: 2,
          backdropFilter: "blur(50px)",
        }}
      >
        <CardHeader title="Shop User Detail"></CardHeader>
      </Card>
      {userAddresses !== null && (
        <Box
          sx={{
            ...ProfileStyle.cardBox,
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              padding: "2rem",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
            >
              <Box
                sx={{
                  bgcolor: "#fff0d1",
                  width: "45%",
                  padding: 2,

                  borderRadius: "0.5rem",
                }}
              >
                <Typography variant="h5">Update Shipping Address</Typography>
                {shippingAdderss?.length == 0 ? (
                  <>No address added yet.</>
                ) : (
                  <Box>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Address</span> :{" "}
                      {shippingAdderss[0]?.address}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Country</span> :{" "}
                      {shippingAdderss[0]?.country}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>House Number</span> :{" "}
                      {shippingAdderss[0]?.house_number}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Building</span> :{" "}
                      {shippingAdderss[0]?.building}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Street</span> :{" "}
                      {shippingAdderss[0]?.street}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>District</span> :{" "}
                      {shippingAdderss[0]?.district}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>City</span> :{" "}
                      {shippingAdderss[0]?.city}
                    </Typography>

                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Postal Code</span> :{" "}
                      {shippingAdderss[0]?.postal_code}
                    </Typography>
                  </Box>
                )}
              </Box>
              {/* <Box
                sx={{
                  bgcolor: "#fff0d1",
                  width: "45%",
                  padding: 2,

                  borderRadius: "0.5rem",
                }}
              >
                <Typography variant="h5">Billing Address</Typography>
                {billingAdderss?.length == 0 ? (
                  <>No address added yet.</>
                ) : (
                  <Box>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Address</span> :{" "}
                      {billingAdderss[0]?.address}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Country</span> :{" "}
                      {billingAdderss[0]?.country}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>State</span> :{" "}
                      {billingAdderss[0]?.state}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>City</span> :{" "}
                      {billingAdderss[0]?.city}
                    </Typography>

                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Postal Code</span> :{" "}
                      {billingAdderss[0]?.postal_code}
                    </Typography>
                  </Box>
                )}
              </Box> */}
            </Box>
            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "70%",
                },
                background: "white",
                borderRadius: "0.5rem",
                padding: 2,
              }}
            >
              <AddressForm
                title={"Shipping Address"}
                setAddressData={setUpdatedShippingAddress}
                defaultAddress={null}
              />
              {/* <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={handleClickCheckBox}
                    />
                  }
                  label="Use the same adress for billing address"
                />
              </FormGroup>

              {!checked && (
                <>
                  <AddressForm
                    title={"Billing Address"}
                    setAddressData={setUpdatedBillingAddress}
                    defaultAddress={null}
                  />
                </>
              )} */}
              <Box sx={{}}>
                <Button onClick={() => submitUserDetail()}>Save Address</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {userAddressesStatus === "loading" ? (
        <>
          <CircularProgress></CircularProgress>
        </>
      ) : userAddressesStatus === "failed" ? (
        <Typography>Failed .Try reloading</Typography>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ShopUserInfo;
