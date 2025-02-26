import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ProductForm from "../../../../components/Backend/Admin/Posts/ProductForm";

const Add = () => {
  return (
    <>
      <Box id="main" sx={{ width: "100%", p: 4 }}>
        <Box
          sx={{
            top: "1rem",

            position: "absolute",
            overflow: "visible",
            zIndex: 1500,
          }}
        ></Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 0 }}>
            Add Product
          </Typography>
          <Box className="container-fluid">
            <div className="card">
              <Link
                to={"/admin/shop-product"}
                style={{
                  textDecoration: "none",

                  display: "flex",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#2196f3",
                    color: "#000",
                    "&:hover": {
                      bgcolor: "white",
                    },
                    mb: 2,
                  }}
                >
                  <ArrowBackIcon></ArrowBackIcon> Back
                </Button>
              </Link>
            </div>
          </Box>
        </Box>
        <ProductForm edit=""></ProductForm>
      </Box>
    </>
  );
};

export default Add;
