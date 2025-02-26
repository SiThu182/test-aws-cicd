import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SearchIcon from "@mui/icons-material/Search";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { FormStyle } from "../../components/Backend/Admin/Posts/FormStyle";
import ReadOnlyQuill from "../../components/Backend/Admin/Posts/ReadOnlyQuill";
import Layout from "../../components/Layout/Frontend/Layout";

function BlogDetails() {
  const { state } = useLocation();

  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm({});

  const saveType = (data) => {
  
  };

  const SideBar = () => {
    return (
      <Box
        sx={{
          backgroundColor: "whitesmoke",
          p: 1,
          m: 2,
          borderRadius: "0.5rem",
        }}
      >
        <Paper
          component="form"
          sx={{
            display: "flex",
            my: 2,
            mx: "auto",
            alignItems: "center",
            height: "2.5rem",
            width: "80%",
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
    );
  };

  return (
    <Layout speaking="Blog">
      <Box sx={{ bgcolor: "white", pb: 2 }}>
        {state.blog !== null && state.blog !== undefined && (
          <Box
            sx={{
              width: "100%",
              height: "70vh",
              backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}storage/blog/${state.blog.image}),linear-gradient(rgba(2,0,0,0.5),rgba(201,210,330,0.5))`,

              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundBlendMode: "overlay",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "white",
                textDecoration: "underline",
                textDecorationColor: "black",
                backdropFilter: "blur(2px)",
              }}
            ></Typography>
          </Box>
        )}

        <Grid container spacing={1}>
          <Grid item xs={12} md={8.4}>
            <Box
              sx={{
                m: 2,
                p: 2,
                backgroundColor: "whitesmoke",
                borderRadius: "0.5rem",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {state.blog.title}
              </Typography>
              <Typography variant="small" sx={{ textDecoration: "underline" }}>
                Author : admin | {state.blog.publishedAt}
              </Typography>

              <ReadOnlyQuill
                delta={state.blog.content}
                quillClass="front-blog-detail"
              />

              <br />
            </Box>
          </Grid>
          <Grid item xs={12} md={3.5}>
            <SideBar />
          </Grid>
          <Grid item xs={12} md={8.4}>
            <Box
              sx={{
                m: 2,
                backgroundColor: "whitesmoke",
                borderRadius: "0.5rem",

                p: 2,
              }}
            >
              <form onSubmit={handleSubmit(saveType)}>
                {/* React hook form with material ui */}
                {/* name */}
                <Box sx={{ my: 2 }}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={""} //insert props.title
                    rules={{
                      required: {
                        value: true,
                        message: "*Name is required",
                      },
                    }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        id="name"
                        type="text"
                        fullWidth
                        error={!!errors.name}
                        label="Name"
                        helperText={errors?.name?.message}
                        InputProps={{
                          sx: {
                            ...FormStyle.inputStyle,
                          },
                        }}
                      />
                    )}
                  />
                </Box>
                {/* description */}
                <Box sx={{ my: 2 }}>
                  <Controller
                    name="comment"
                    control={control}
                    defaultValue={""} //insert props.description
                    rules={{
                      required: {
                        value: true,
                        message: "*Comment is required",
                      },
                    }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        id="comment"
                        type="text"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={6}
                        error={!!errors.description}
                        label={<Typography variant="h6">Comment</Typography>}
                        InputProps={{
                          sx: {
                            ...FormStyle.inputStyle,
                          },
                        }}
                        helperText={errors?.comment?.message}
                      />
                    )}
                  />
                </Box>
                <Box display={"flex"} justifyContent="right">
                  <Button
                    id="btnSave"
                    type="submit"
                    variant="contained"
                    sx={{
                      color: "#000",
                      bgcolor: "#2196f3",

                      "&:hover": {
                        bgcolor: "white",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export default BlogDetails;
