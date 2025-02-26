import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { CircularProgress, Toolbar, Typography, Button } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { animationObj } from "../../animationKeyFrames/AnimationKeyFrames";
import ReloadOrBackCard from "../../components/ReloadOrBackCard";
import NoteCard from "../../components/Backend/NoteCard/NoteCard";
import axios from "axios";
import { fetchTextFile } from "./CourseTest/CalculationForWritingSections.js/CalculateScore";
import { Crisp } from "crisp-sdk-web";
import Testimonial from "../Frontend/Testimonial";
// import ScoreCardComponent from "../../components/Backend/MockTest/ScoreCardComponent";
import { useSelector } from "react-redux";
import LightBoxTest from "../../components/Frontend/PTEShop/Product/LightBoxTest";
import { SearchDictionary } from "../../Utils/DictionarySearch";

export default function SwipeableTemporaryDrawer(props) {
  const { testList, testListStatus, testListError } = props;
  const [state, setState] = React.useState(false);
  const [text, setText] = React.useState("");
  const { user } = useSelector((state) => state.user);
  const [word, setWord] = React.useState("");
  Crisp.configure(process.env.REACT_APP_CRISP_ID);
  // Crisp.user.setEmail("john.doe@gmail.com");
  // Crisp.user.setNickname("John Doe");

  const [audioBlob, setAudioBlob] = React.useState();
  const [data, setData] = React.useState();
  const [errors, setErrors] = React.useState([]);
  const audioRef = React.useRef();

  let FormalOpeningPattern = /FormalOpening\s*:\s*\[/g;
  let InformalOpeningPattern = /InFormalOpening\s*:\s*\[/g;
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };
  React.useEffect(() => {
    let assignTextFile = async () => {
      const result = await fetchTextFile();
    };
    assignTextFile();
  }, []);

  const searchHandler = async () => {
    if (word !== "") {
      const response = await SearchDictionary(word);
      console.log(response);
    }
  };
  // result.forEach((element) => {});

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };
  React.useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await fetch(
          "https://ptebackend.aigma.com.au/storage/rl/1688728249.12.mp3"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch audio from source`);
        }

        const audioData = await response.arrayBuffer();
        const audioBlob = new Blob([audioData], {
          type: response.headers.get("content-type"),
        });

        setAudioBlob(audioBlob);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message to the user
      }
    };
    fetchAudio();
  }, []);

  const handleCheckGrammar = async () => {
    const text =
      "Research shows that when people work with a positive mind-set, performance on nearly every level — productivity, creativity, engagement — improves. Yet happiness is perhaps the most misunderstood driver of performance. For one, most people believe that success precedes happiness. “Once I get a promotion, I’ll be happy,” they think. Or, “Once I hit my sales target, I’ll feel great.” But because success is a moving target — as soon al";
    try {
      const apiUrl = "https://api.languagetool.org/v2/check";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          text,
          language: "en-US", // Adjust the language code as needed
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setData(data);
      setErrors(data.matches || []);
    } catch (error) {
      console.error("Error checking grammar:", error);
    }
  };

  const apiUrl = "https://api.languagetool.org/v2/check";

  async function checkGrammar(text) {
    try {
      const response = await axios.post(
        apiUrl,
        {
          language: "en-US",
          text: text,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.matches;
    } catch (error) {
      console.error("Error checking grammar:", error.message);
      return [];
    }
  }

  // Example text to check
  const textToCheck =
    "This is an example sentence with some grammatical errors.";

  // Call the function to check grammar
  const checkGrammarClick = () => {
    checkGrammar(textToCheck)
      .then((matches) => {
        console.log("Grammar errors found:");
        console.log(matches);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const list = () => (
    <Box
      sx={{
        width: 550,
        background: "linear-gradient(180deg, #1A6DFF 0%, #0946BE 100%)",
      }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Toolbar />
      {/* <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider /> */}

      {testListStatus === "succeeded" && (
        <List>
          {testList.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
      {testListStatus === "failed" && (
        <ReloadOrBackCard
          header={
            <Typography>
              Failed to fetch data {testListError} .You can reload or go back
            </Typography>
          }
        />
      )}
      {(testListStatus === "loading" || testListStatus === null) && (
        <Box>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );

  React.useEffect(() => {
    if (audioRef !== null && audioRef.current?.onstalled) {
      audioRef.current.onstalled = () => {
        console.warn(
          "Audio playback stalled. Possibly due to poor connection."
        );
        // Handle the stalled event, e.g., attempt to restart the stream
      };
    }
    if (audioRef !== null && audioRef.current?.pause) {
    }
  }, [audioRef]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        position: "relative",
        background: "linear-gradient(180deg, #1A6DFF 0%, #0946BE 100%)",
      }}
    >
      <div>
        {audioBlob && (
          <audio controls>
            <source
              src={URL.createObjectURL(audioBlob)}
              type={audioBlob.type}
            />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
      <iframe
        src="https://smarteduglobe-my.sharepoint.com/personal/yelminoo_smarteduglobe_com/_layouts/15/embed.aspx?UniqueId=1e0eef6e-cad0-4b5a-9f55-7e8a90d6a515&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create"
        width="640"
        height="360"
        frameborder="0"
        scrolling="no"
        allowfullscreen
        title="Video-2@C.webm"
      ></iframe>
      <Box
        sx={{
          position: "absolute",
          top: "45%",
          width: "2.5rem",
          height: "2.5rem",
          right: "-1rem",
          overflow: "hidden",
          borderTopLeftRadius: "50%",
          borderBottomLeftRadius: "50%",
          zIndex: 1300,
          "@keyframes horizontal-move": animationObj.horizontalSidebarRtl,
          "@keyframes reverse-move": animationObj.reverseHorizontalSidebarRtl,
          animation: state
            ? "0.2s horizontal-move  "
            : "0.2s reverse-move ease",
          animationFillMode: "forwards",
          translation: "3s ease-in",
          // transform: "translate(-250px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: 4,
          border: "1px solid grey",
        }}
        onClick={toggleDrawer(!state)}
      >
        <Box
          sx={{
            overflow: "hidden",
            color: state ? "black" : "white",
          }}
        >
          {state ? <NavigateNextIcon /> : <NavigateBeforeIcon />}
        </Box>
      </Box>

      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/1HnX9d83zx4?si=bC3sfLS_RI_mMDiV"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/1HnX9d83zx4"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      <NoteCard />
      {"This is the test for example grammar checking in there ap."
        .split()
        .map((w, index) => (
          <Typography key={index}>{w}</Typography>
        ))}

      <Button variant="contained" onClick={() => handleCheckGrammar()}>
        Click to check grammar
      </Button>
      <Button variant="contained" onClick={() => checkGrammarClick()}>
        Click to check grammar
      </Button>
      <Testimonial></Testimonial>
      <SwipeableDrawer
        anchor={"right"}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
      <Typography
        onClick={(e) => {
          speak(e.target.innerText);
        }}
      >
        Hello,
      </Typography>

      <textarea spellCheck={true}></textarea>

      <LightBoxTest />
      <Box sx={{ bg: "yellow", p: 10 }}>
        <input type="text" onChange={(e) => setWord(e?.target?.value)} />
        <Button onClick={() => searchHandler()}>Search</Button>
      </Box>
    </Box>
  );
}
