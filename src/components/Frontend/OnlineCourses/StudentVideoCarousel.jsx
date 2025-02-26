import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

const VideoCard = ({ s }) => {
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef();
  const [vdSrc, setVdSrc] = useState("");

  useEffect(() => {
    setVdSrc(
      s.vd_file !== undefined && s.vd_file !== null
        ? process.env.REACT_APP_BACKEND_URL + "storage/" + s.vd_file
        : s.url
    );
  }, [s]);
  console.log(videoRef, "videoref");
  const handleCanPlayThrough = () => {
    setLoading(false); // Video is ready to play
  };
  useEffect(() => {
    if (videoRef.current !== null && !loading) {
      if (hovered) {
        try {
          videoRef.current?.play().catch((error) => {
            console.log(error);
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        videoRef.current?.pause();
      }
    }
  }, [hovered, loading]);
  return (
    <Card sx={{ minWidth: "300px", flexGrow: 1, m: 3 }}>
      <CardContent>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            aspectRatio: 16 / 9,
            position: "relative",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {loading && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 5,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
            >
              <CircularProgress sx={{ m: "auto" }} />
            </Box>
          )}
          <img
            src={process.env.REACT_APP_BACKEND_URL + "storage/" + s.thumbnail}
            alt="how-to-buy-plan-img"
            style={{
              display: hovered || loading ? "none" : "block",
              objectFit: "cover",
              width: "100%",
              height: "100%",
              objectPosition: "center",
              overflow: "hidden",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 4,
            }}
          />
          <video
            ref={videoRef}
            src={vdSrc}
            controls
            loop
            preload="auto"
            onCanPlayThrough={handleCanPlayThrough}
            onError={(e) => {
              console.error("Error loading video:", e);
              setLoading(false); // Hide the loading indicator even in case of error
            }}
            style={{
              display: hovered && !loading ? "block" : "none",
              width: "100%",
              height: "100%",
            }}
          ></video>
        </Box>
        <Box sx={{ px: 2 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bolder", color: "#2196f3" }}
          >
            {s.name}
          </Typography>
          <Typography variant="h6" sx={{ color: "#2196f3" }}>
            PTE Success Interview
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const StudentVideoCarousel = React.memo(({ stories, state }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 825 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 825, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  const frontEndURL = process.env.REACT_APP_FRONTEND_URL;
  return (
    <Box sx={{ background: "rgb(231 239 254)", py: "8rem" }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#2196f3",
          fontWeight: "bolder",
          my: "2rem",
        }}
      >
        PTE Student Success <span style={{ color: "red" }}>Stories</span>
      </Typography>
      <Box
        sx={{
          width: {
            sm: "95vw",
            md: "90vw",
          },
          mx: "auto",
        }}
      >
        {state === "succeeded" &&
        stories?.length !== 0 &&
        stories !== undefined ? (
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            //   autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlay={false}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all 1s ease"
            transitionDuration={1000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            //   deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-50-px"
          >
            {stories.map((s) => (
              <Box
                key={s.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItem: "center",
                }}
              >
                <VideoCard s={s} />
              </Box>
            ))}
          </Carousel>
        ) : stories?.length !== 0 ? (
          <Box sx={{ display: "flex", height: "70vh" }}>
            <CircularProgress sx={{ m: "auto" }}></CircularProgress>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              height: "70vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Not exist yet ...</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
});

export default StudentVideoCarousel;
