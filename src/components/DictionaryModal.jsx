import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { SearchDictionary } from "../Utils/DictionarySearch";
import { CircularProgress, Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};

export default function DictionaryModal({ word, open, setOpen }) {
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dictionary, setDictionary] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState("");
  React.useEffect(() => {
    if (open && word !== "") {
      setIsLoading(true);
      const callSearch = async () => {
        let response = await SearchDictionary(word);
        if (response?.partOfSpeech) {
          setDictionary(response);
          setIsLoading(false);
          setIsError("");
        } else {
          setIsError(response);
          setIsLoading(false);
        }
      };
      callSearch();
    } else {
      setIsLoading(false);
      setDictionary(null);
      setIsError("");
    }
  }, [open, word]);
  console.log(dictionary?.partOfSpeech, "partof speech");
  console.log(dictionary);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* {isLoading && <CircularProgress size="3rem" />}
        {isError && (
          <div>
            <Typography>{isError}</Typography>
          </div>
        )} */}
        <Box sx={style}>
          {isLoading && <CircularProgress size="3rem" />}
          {isError !== "" && <Typography variant="h5">{isError}</Typography>}
          {!isLoading && isError == "" && (
            <>
              <Typography variant="h5" sx={{ color: "#0CAFFF" }}>
                {word}
              </Typography>
              <Divider />
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                part of speech -{" "}
                {dictionary?.partOfSpeech.map((m, index) => (
                  <>
                    {m}
                    {index !== dictionary?.partOfSpeech?.length - 1
                      ? " ,"
                      : " "}
                  </>
                ))}
              </Typography>
              {dictionary?.phonetic && (
                <Box>
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    phonetic :{dictionary?.phonetic}
                  </Typography>
                </Box>
              )}
              <Box sx={{ display: "flex", gap: 5, my: 3, flexWrap: "wrap" }}>
                {dictionary?.phonetics.us !== undefined && (
                  <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                    US :
                    <audio src={dictionary?.phonetics.us} controls />
                  </Box>
                )}
                {dictionary?.phonetics.uk !== undefined && (
                  <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                    UK :
                    <audio src={dictionary?.phonetics.uk} controls />
                  </Box>
                )}
              </Box>

              <Typography
                id="transition-modal-description"
                variant="h6"
                sx={{ mt: 2 }}
              >
                Definitions
              </Typography>
              <Typography variant="p" sx={{ lineHeight: "1rem" }}>
                {dictionary?.definitions.map((m) => (
                  <>
                    {m} <br />
                  </>
                ))}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
