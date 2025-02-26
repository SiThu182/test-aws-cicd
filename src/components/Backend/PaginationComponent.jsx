import { Pagination } from "@mui/material";
import React from "react";

function PaginationComponent(props) {
  const { totalPage, handleChange, page, size = "large" } = props;
  return (
    <>
      {totalPage !== "" && totalPage !== undefined && (
        <Pagination
          size={size}
          count={parseInt(totalPage)}
          color="primary"
          page={page}
          onChange={handleChange}
        />
      )}
    </>
  );
}

export default PaginationComponent;
