import React, { useState } from "react";
import Lightbox from "./LightBox";
import { Box, IconButton, Typography } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
const LightBoxTest = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [imageStyle, setImageStyle] = useState({});

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth > naturalHeight) {
      // Landscape orientation
      setImageStyle({ width: "100%", height: "auto" });
    } else {
      // Portrait orientation
      setImageStyle({ width: "auto", height: "100%" });
    }
  };

  const images = [
    "https://via.placeholder.com/600x400",
    "https://via.placeholder.com/800x600",
    "https://via.placeholder.com/1024x768",
  ];

  return (
    <div>
      <h1>Image Lightbox with Drag and Zoom</h1>
      <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Box>
          <Box
            sx={{
              display: "flex",
              height: "auto",
              gap: 5,
              minWidth: "50%",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              className="vertical-gallery"
              sx={{
                display: "flex",
                position: "relative",
                gap: "10px",
                flexDirection: {
                  xs: "row",
                  md: "column",
                },
                order: {
                  xs: 2,
                  md: 1,
                },
                height: {
                  xs: "20rem",
                  md: "40rem",
                },
              }}
            >
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    cursor: "pointer",
                    width: "10rem",
                    height: "10rem",

                    borderRadius: "0.5rem",
                  }}
                  onClick={() => {
                    setCurrentImage(image);
                    // setLightboxOpen(true);
                  }}
                />
              ))}
            </Box>
            <Box
              sx={{
                width: "35rem",
                maxWidth: "50rem",
                display: "flex",
                height: "35rem",
                maxHeight: "50rem",
                position: "relative",
                justifyContent: "center",
                alignItems: "center",
                background: "red",
                borderRadius: "0.5rem",
                order: {
                  xs: 1,
                  md: 2,
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 3,
                  width: "3rem",
                  height: "3rem",
                }}
              >
                <IconButton onClick={() => setLightboxOpen(true)} color="black">
                  <OpenInFullIcon />
                </IconButton>
              </Box>
              <img
                src={currentImage}
                alt={`Thumbnail ${currentImage + 1}`}
                style={{
                  cursor: "pointer",
                  ...imageStyle,
                }}
                onClick={() => {
                  //   setCurrentImage(currentImage);
                  setLightboxOpen(true);
                }}
                onLoad={handleImageLoad}
              />
            </Box>
          </Box>
          {lightboxOpen && (
            <Lightbox
              image={currentImage}
              onClose={() => setLightboxOpen(false)}
            />
          )}
        </Box>
        <Box>
          <Typography variant="h3">Description</Typography>
          <Box></Box>
        </Box>
      </div>
    </div>
  );
};

export default LightBoxTest;
