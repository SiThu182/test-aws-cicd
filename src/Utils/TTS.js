export const Speak = (text) => {
  if ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
    // Speech synthesis is supported
    let utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  } else {
    // Speech synthesis is not supported
    console.log("Speech synthesis is not supported in this browser.");
  }
};
