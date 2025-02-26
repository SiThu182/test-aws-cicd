import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';
const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div>
      <Button  variant="contained " size="small" onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</Button>
      <Button variant="contained mx-1" size="small"  onClick={handlePause}>Pause</Button>
      <Button variant="contained" size="small" onClick={handleStop}>Stop</Button>
    </div>
  );
};

export default TextToSpeech;