import axios from "axios";

export function grammar_check(str) {
  // var len = str.length;

  // Check that the first character lies in [A-Z].
  // Otherwise return false.
  //

  if (
    str[0].charCodeAt(0) < "A".charCodeAt(0) ||
    str[0].charCodeAt(0) > "Z".charCodeAt(0)
  )
    return false;

  // // If the last character is not a full stop(.)
  // // no need to check further.
  // if (str[len - 1] !== ".") return false;

  // Maintain 2 states. Previous and current state
  // based on which vertex state you are.
  // Initialise both with 0 = start state.
  var prev_state = 0,
    curr_state = 0;

  // Keep the index to the next character in the string.
  var index = 0;

  const charZero = "0";
  const charNine = "9";
  const charCodeZero = charZero.charCodeAt(0);
  const charCodeNine = charNine.charCodeAt(0);
  const specialCharacters = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  // Loop to go over the string.

  while (index < str.length) {
    // Set states according to the input characters
    // in the string and the rule defined in the description.
    // If current character is [A-Z]. Set current state as 0.

    if (
      str[index].charCodeAt(0) >= "A".charCodeAt(0) &&
      str[index].charCodeAt(0) <= "Z".charCodeAt(0)
    )
      curr_state = 0;
    // If current character is a space.
    // Set current state as 1.
    else if (str[index] === " ") curr_state = 1;
    // If current character is [a-z].
    // Set current state as 2.
    else if (
      str[index].charCodeAt(0) >= "a".charCodeAt(0) &&
      str[index].charCodeAt(0) <= "z".charCodeAt(0)
    )
      curr_state = 2;
    // If current state is a dot(.).
    // Set current state as 3.
    else if (str[index] === ".") curr_state = 3;
    // If current character is [0-9].
    // Set current state as 4.
    else if (
      str[index].charCodeAt(0) >= charCodeZero &&
      str[index].charCodeAt(0) <= charCodeNine
    )
      curr_state = 4;
    else if (specialCharacters.includes(str[index])) curr_state = 5;

    // Validates all current state with previous state
    // for the rules in the description of the problem.
    if (
      prev_state === curr_state &&
      curr_state !== 2 &&
      curr_state !== 4 &&
      curr_state !== 0
    )
      return false;

    if (prev_state === 2 && curr_state === 0) return false;

    // If we have reached last state and previous state
    // is not 1, then check next character. If next character
    // is '\0', then return true, else false
    if (curr_state === 3 && prev_state !== 1) return index + 1 == str.length;

    index++;

    // Set previous state as current state
    // before going over to the next character.
    prev_state = curr_state;
  }
  return false;
}
// function countLineBreaks(text) {
//   let extraLineBreak = text
//     .trim()
//     .split("\n")
//     .filter((t) => t === "");

//   console.log(extraLineBreak);
//   console.log("extra line break");
//   return extraLineBreak?.length;
// }

export async function GrammarCheck(test, content) {
  if (test !== null) {
    const encodedText = encodeURIComponent(test);
    try {
      let result = await axios.post(
        `${process.env.REACT_APP_GRAMMAR_CHECK_ENDPOINT}?language=en-US&text=${encodedText}`
      );

      let spellingMistakeCount = 0;
      let grammarMistakeCount = 0;
      let mistakeOffsets = [];
      let mistakeLength = [];
      let mistakeDetails = [];
      let replacements = [];
      result.data.matches.forEach((m) => {
        if (m.shortMessage.includes("Spelling mistake")) {
          let errorPortion = test.slice(m.offset, m.offset + m.length);

          const regex = new RegExp(`\\b${errorPortion}\\b`);
          const containsWholeWord = regex.test(content);
          if (
            !containsWholeWord &&
            !m.shortMessage.includes("British English")
          ) {
            spellingMistakeCount += 1;
            mistakeOffsets.push(m.offset);
            mistakeLength.push(m.length);
            mistakeDetails.push(m.message);
            replacements.push(m.replacements);
          }
        } else {
          grammarMistakeCount += 1;
          mistakeOffsets.push(m.offset);
          mistakeLength.push(m.length);
          mistakeDetails.push(m.message);
          replacements.push(m.replacements);
        }
      });

      // let modifiedMistakeOffsets = mistakeOffsets.map((offset, index) => {
      //   let textPortion = test.slice(0, offset);
      //   let lineBreakAmount = countLineBreaks(textPortion);
      //   return offset + lineBreakAmount;
      // });

      // result.data.matches
      return {
        data: result.data,
        grammar_count: grammarMistakeCount,
        spelling_count: spellingMistakeCount,
        mistakeOffsets: mistakeOffsets,
        mistakeLength: mistakeLength,
        mistakeDetails: mistakeDetails,
        replacements: replacements,
        // spelling_count: result.data.matches.filters,
      };
    } catch (error) {
      return error;
    }
  }
}
