import { Box, Button, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import { CartTotalContext } from "./Cart";
import { useDispatch } from "react-redux";
import { stockDecrease, stockIncrease } from "../../../redux/slice/UserSlice";
function QuantityButtonGroup({
  value,
  setValue,
  price,
  disabledTotalControl,
  max,
  cart = null,
  id = null,
  variant_id = null,
}) {
  // const { totalAmount, setTotalAmount } = useContext(CartTotalContext);
  const dispatch = useDispatch();
  const subAmount = () => {
    if (value !== 0) {
      if (!disabledTotalControl && value !== 1) {
        dispatch(
          stockDecrease({
            price: price,
            cart: cart,
            id: id,
            product_variations_id: variant_id,
          })
        );
      }
      setValue((prev) => (prev > 1 ? prev - 1 : prev));
    }
  };

  const addAmount = () => {
    if (value < max) {
      if (!disabledTotalControl && value < max)
        dispatch(
          stockIncrease({
            price: price,
            cart: cart,
            id: id,
            product_variations_id: variant_id,
          })
        );
      setValue((prev) => prev + 1);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="contained"
          sx={{
            margin: 0,
            background: "white",
            color: "black",
            "&:hover": {
              background: "gray",
            },
          }}
          size="sm"
          onClick={() => subAmount()}
        >
          <RemoveIcon />
        </Button>
        <Typography sx={{ width: "3rem", textAlign: "center" }}>
          {value}
        </Typography>
        <Button
          variant="contained"
          sx={{
            margin: 0,
            background: "white",
            color: "black",
            "&:hover": {
              background: "gray",
            },
          }}
          size="sm"
          onClick={() => addAmount()}
        >
          <AddIcon />
        </Button>
      </Box>
      {value > max && (
        <Typography style={{ color: "red" }}>*exceeds max stocks</Typography>
      )}
    </Box>
  );
}

export default QuantityButtonGroup;
