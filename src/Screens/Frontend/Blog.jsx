import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SearchIcon from "@mui/icons-material/Search";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ReadOnlyQuill from "../../components/Backend/Admin/Posts/ReadOnlyQuill";
import Layout from "../../components/Layout/Frontend/Layout";
import { FetchBlogFrontendAsync } from "../../redux/thunk/Blog";
import "./Blog.css";
function Blog() {
   
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogListFrontend, blogListFrontendStatus } = useSelector(
    (state) => state.blog
  );
  useEffect(() => {
    dispatch(FetchBlogFrontendAsync({ path: "blogs-frontend" }));
  }, [dispatch]);

  return (
    <Layout speaking="Blog">
      <Box
        sx={{
          width: "100%",
          // height: "70vh",
          // backgroundImage: `url(${process.env.REACT_APP_FRONTEND_URL}Image/subscription_banner.png)`,
          // backgroundPosition: "center",
          // backgroundSize: "cover",
          // backgroundAttachment: "fixed",
          // backgroundBlendMode: "overlay",
        }}
      >
        <img
          src={`${process.env.REACT_APP_FRONTEND_URL}Image/blog_banner.png`}
          alt="subscription-banner"
          style={{ width: "100%" }}
        />
      </Box>
      <Box sx={{ bgcolor: "rgb(231 239 254)", p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            background: "whitesmoke",
            borderRadius: "1rem",

            width: "90%",
            mx: "auto",
            p: 3,
          }}
        >
          <Box
            sx={{
              width: "60%",
            }}
          >
            {console.log(blogListFrontendStatus,"<<<Status",blogListFrontend.length)}
            {blogListFrontendStatus === "loading" ? (
              <CircularProgress></CircularProgress>
            ) : blogListFrontendStatus === "succeeded" ? (
              <>
                {blogListFrontend.data.length > 0 ? (
                  blogListFrontend.data.map((b, index) => (
                    <Box
                      key={index}
                      sx={{
                        my: 2,
                        backgroundColor: "white",
                        borderRadius: "1rem",
                        boxShadow: 4,
                        p: 2,
                      }}
                    >
                      <Box
                        sx={{
                          backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}storage/blog/${b.image})`,
                          height: "10rem",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      ></Box>

                      <Typography variant="small">
                        Author : admin | {b.publishedAt}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {b.title}
                      </Typography>

                      <ReadOnlyQuill
                        delta={b.content}
                        quillClass={"front-blog"}
                      />
                      <Box sx={{ textAlign: "right" }} className="bloglist-box">
                        <Button
                          onClick={() =>
                            navigate("/blog/details", {
                              state: {
                                blog: b,
                              },
                            })
                          }
                          sx={{
                            "&:hover": {
                              color: "white",
                              backgroundColor: "yellow",
                            },
                          }}
                        >
                          View Detail
                        </Button>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography variant="h5">Coming Soon</Typography>
                )}
              </>
            ) : (
              <Typography variant="h5">Failed to Fetch</Typography>
            )}
          </Box>
          <Box
            sx={{
              width: "40%",
            }}
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                height: "2.5rem",
                width: "80%",
                mb: 1,
                mx: "auto",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                //   value={searchInput}
                //   onChange={({ target: { value } }) => searchFunction(value)}
                placeholder="Search Blog "
                inputProps={{ "aria-label": "search Blog" }}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
            <Box
              sx={{
                width: "80%",
                mx: "auto",
                background: "white",
                borderRadius: "1rem",
                my: 2,
                boxShadow: 5,
                p: 2,
              }}
            >
              <Box>Popular Post</Box>
              <Box>Recent Post</Box>
            </Box>
            <Box
              sx={{
                width: "80%",
                mx: "auto",
                background: "white",
                borderRadius: "1rem",
                my: 2,
                boxShadow: 5,
                p: 2,
              }}
            >
              <img
                src={process.env.REACT_APP_FRONTEND_URL + "Image/AigmaLogo.png"}
                alt="Aigma"
                style={{
                  width: "100%",
                  borderRadius: "1rem",
                  backgroundColor: "whitesmoke",
                  p: 2,
                }}
              />
              <Typography sx={{ textAlign: "center" }}>
                Join Now for <Button sx={{ color: "red" }}>Free</Button>
              </Typography>
            </Box>
            <Box
              sx={{
                width: "80%",
                mx: "auto",
                background: "white",
                borderRadius: "1rem",
                my: 2,
                boxShadow: 5,
                p: 2,
              }}
            >
              <Typography variant="h5">Follow us on Social Media</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                  my: 2,
                }}
              >
                <Button>
                  {" "}
                  <FacebookRoundedIcon></FacebookRoundedIcon>
                </Button>
                <Button>
                  {" "}
                  <LinkedInIcon></LinkedInIcon>
                </Button>
                <Button>
                  {" "}
                  <YouTubeIcon sx={{ color: "red" }}></YouTubeIcon>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default Blog;
