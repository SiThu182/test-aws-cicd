import React from "react";
import OrderClient from "../../../../components/Backend/ProfileComponents/OrderClient";
import PageNavTitle from "../../../../components/Backend/PageTitle";
import { Box } from "@mui/material";

function List() {
  return (
    <div style={{ pt: 5, width: "100%" }}>
      <PageNavTitle text={"Shop Order"} />
      <Box
        sx={{
          display: "flex",
          px: 4,
          width: "100%",
        }}
      >
        <OrderClient isAdmin={true}></OrderClient>
      </Box>
    </div>
  );
}

export default List;
