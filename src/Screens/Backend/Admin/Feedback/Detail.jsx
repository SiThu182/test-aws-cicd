import { Box, Button, TextareaAutosize, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetcheditPostsAsync } from "../../../../redux/thunk/Posts";
import BackButton from "../../../../components/Backend/BackButton";

const Edit = () => {
  const { editPost, editStatus } = useSelector((state) => state.posts);
  const postId = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetcheditPostsAsync({ path: "student-feedbacks", id: postId.id }));
  }, [dispatch, postId.id]);

  const downloadImage = async (url) => {
    // Replace "your-image.jpg" with the actual URL or file path of the image.
    // saveAs(url, "feedback.png");

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a Blob from the response and generate a URL for it
        const blobUrl = URL.createObjectURL(blob);

        // Create a hidden link for the download
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "downloaded-image.jpg"; // Specify the desired filename
        link.style.display = "none";

        // Append the link to the document
        document.body.appendChild(link);

        // Trigger the click event on the link to initiate the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);

        // Revoke the Blob URL to release memory
        URL.revokeObjectURL(blobUrl);
      });
  };


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
        >
          <Typography variant="h5">Feedback Detail</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ my: 2 }}>
            User's Feedback
          </Typography>
          <BackButton />
        </Box>
        {(editStatus === "loading" || editStatus === "failed") && (
          <Box>
            <Typography variant="h5">{editStatus}</Typography>
          </Box>
        )}

        {editStatus === "succeeded" && (
          <>
            <Box>
              <TextareaAutosize
                value={editPost?.name}
                disabled={true}
                spellCheck={false}
                style={{
                  width: "100%",
                  boxShadow: 2,
                  borderRadius: "1rem",
                  padding: 3,
                  background: "white",
                  fontSize: "1.2rem",
                }}
                minRows={10}
              />
              <Box sx={{ display: "flex" }}>
                {JSON.parse(editPost?.image)?.map((i, index) => (
                  <Box key={index} sx={{ m: 2 }}>
                    <img
                      src={process.env.REACT_APP_BACKEND_URL + "storage/" + i}
                      alt="feedback"
                      style={{ width: "10rem" }}
                    />
                    <Box>
                      <Button
                        onClick={() =>
                          downloadImage(
                            process.env.REACT_APP_BACKEND_URL + "storage/" + i
                          )
                        }
                      >
                        Download
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Edit;
