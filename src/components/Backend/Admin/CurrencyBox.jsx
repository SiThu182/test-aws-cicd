import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";

function CurrencyBox({
  amount = 0,
  color = "black",
  currency = "USD",
  backgroundColor = "white",
}) {
  let currancy = amount;
  let newCurrancy = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    notation: "compact",
    compactDisplay: "short",
    // style: "currency",
    // currency: currency,
  }).format(currancy);

  return (
    <Tooltip title={amount.toString() + currency}>
      <Box
        sx={{
          borderRadius: "1rem",
          border: "2px solid rgba(240 236 242 )",
          boxShadow: 5,
          height: "6rem",
          minWidth: "8rem",
          padding: 2,
          backgroundColor: backgroundColor,
        }}
      >
        <Typography variant="h5" style={{ color: color }}>
          {currency}
        </Typography>
        <Typography variant="h6">
          <span style={{ color: color }}>{newCurrancy} </span>
        </Typography>{" "}
      </Box>
    </Tooltip>
  );
}

export default CurrencyBox;
