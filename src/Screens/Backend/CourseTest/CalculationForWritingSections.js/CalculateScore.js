import {
  grammar_check,
  GrammarCheck,
} from "../Writing/WriteEssay/GrammarCheck";
import { checkEmailConvention } from "./EmailConventionCheck";

let formalOpeningPattern = /FormalOpening\s*:\s*\[/g;
let informalOpeningPattern = /InformalOpening\s*:\s*\[/g;
let formalClosingPattern = /FormalClosing\s*:\s*\[/g;
let informalClosingPattern = /InformalClosing\s*:\s*\[/g;
let formalIntroductionPattern = /FormalIntroduction\s*:\s*\[/g;
let informalIntroductionPattern = /InformalIntroduction\s*:\s*\[/g;
let formalConclusionPattern = /FormalConclusion\s*:\s*\[/g;
let informalConclusionPattern = /InformalConclusion\s*:\s*\[/g;
let linkerPattern = /Linkers\s*:\s*\[/g;

const SplitAndAssignRules = (text, rulePattern) => {
  let matches = text.toString().match(rulePattern);

  let sIndexOfMatch = text.toString().indexOf(matches[0]);
  let startIndex = sIndexOfMatch + matches[0].length;

  let sliceText = text.toString().slice(startIndex);
  let endIndex = sliceText.indexOf("]");

  let rulesText = sliceText.slice(0, endIndex);

  return rulesText;
};

export const fetchTextFile = async () => {
  try {
    const response = await fetch("/EmailConvention.txt");
    if (!response.ok) {
      throw new Error("Failed to fetch text file");
    }
    const text = await response.text();
    let formalOpeningRules = SplitAndAssignRules(text, formalOpeningPattern);
    let informalOpeningRules = SplitAndAssignRules(
      text,
      informalOpeningPattern
    );
    let formalClosingRules = SplitAndAssignRules(text, formalClosingPattern);
    let informalClosingRules = SplitAndAssignRules(
      text,
      informalClosingPattern
    );
    let formalIntroductionRules = SplitAndAssignRules(
      text,
      formalIntroductionPattern
    );
    let informalIntroductionRules = SplitAndAssignRules(
      text,
      informalIntroductionPattern
    );
    let formalConclusionRules = SplitAndAssignRules(
      text,
      formalConclusionPattern
    );
    let informalConclusionRules = SplitAndAssignRules(
      text,
      informalConclusionPattern
    );
    let linkerRules = SplitAndAssignRules(text, linkerPattern);

    return {
      formalOpeningRules: formalOpeningRules,
      informalOpeningRules: informalOpeningRules,
      formalClosingRules: formalClosingRules,
      informalClosingRules: informalClosingRules,
      formalIntroductionRules: formalIntroductionRules,
      informalIntroductionRules: informalIntroductionRules,
      formalConclusionRules: formalConclusionRules,
      informalConclusionRules: informalConclusionRules,
      linkerRules: linkerRules,
    };
  } catch (error) {
    console.error("Error fetching text file:", error);
  }
};

const CalculateScore = async (
  transcript,
  char,
  keywordLength,
  dictionary,
  category,
  originalContent,
  emailType
) => {
  //   let content_arr = content.split(/[ .,]+/);

  const conventionRules = await fetchTextFile();
  const content_arr = transcript
    .replace(/[.,?'()]/g, " ")
    .split(/[(),.,\s]+/)
    .filter(Boolean)
    .map((transcript) => transcript.replace(/\./g, " ").trim());
  let keyword_length = keywordLength;
  let content_kw_length =
    keyword_length > 0 ? keyword_length : content_arr.length;

  //   setContentArr(content_arr);//
  const char_arr = char
    .trim()
    .replace(/\(([^)]*)\)/g, "$1") // Remove only the parentheses while retaining the text inside
    .replace(/[.,?'()]/g, " ") // Remove punctuation characters and any remaining parentheses
    .split(/\s+/)
    .filter((word) => word !== "");

  let overall_point = 0;
  var fullStopCount = char.match(/\./g) === null ? 0 : char.match(/\./g).length;

  char_arr.forEach((check_char) => {
    if (content_arr.includes(check_char)) {
      let indexToRemove = content_arr.indexOf(check_char);
      content_arr.splice(indexToRemove, 1);

      overall_point += 1;
    }
  });

  let content_presentage = parseInt((overall_point / content_kw_length) * 100);

  let cal_content;
  if (category === "we" || category === "wemail") {
    cal_content =
      content_presentage > 80
        ? 3
        : content_presentage <= 80 && content_presentage >= 50
        ? 2
        : content_presentage < 50 && content_presentage >= 20
        ? 1
        : 0;
  } else if (category === "swt" || category === "sst") {
    cal_content =
      content_presentage >= 80
        ? 2
        : content_presentage < 80 && content_presentage >= 40
        ? 1
        : 0;
  }

  let regPattern = /[\d\W]+/;
  const rm_number_from_char_arr = char_arr.filter(
    (item) => !item.match(regPattern)
  );

  const misspelled = rm_number_from_char_arr.filter((word) => {
    return !dictionary.check(word);
  });
  //   setErrorCount(misspelled.length);//
  let spellResult =
    misspelled.length === 0 ? 2 : misspelled.length === 1 ? 1 : 0;
  //  setSpellCount(spellResult);
  // setSpelling(spellResult);

  //calculate form
  let form;
  if (category === "we") {
    form =
      char_arr.length >= 200 && char_arr.length <= 300
        ? 2
        : (char_arr.length >= 120 && char_arr.length <= 199) ||
          (char_arr.length >= 301 && char_arr.length <= 380)
        ? 1
        : 0;
  } else if (category === "swt") {
    if (
      fullStopCount === 1 &&
      char_arr.length >= 5 &&
      char_arr.length <= 75
      // &&
      // misspelled.length === 0
    ) {
      form = 1;
    } else {
      form = 0;
    }
  } else if (category === "sst") {
    form =
      char_arr.length >= 50 && char_arr.length <= 70
        ? 2
        : (char_arr.length >= 40 && char_arr.length <= 49) ||
          (char_arr.length >= 71 && char_arr.length <= 100)
        ? 1
        : 0;

    // else if (char_arr.length !== 0 && fullStopCount === 1) {
    //   form = 1;
  } else if (category === "wemail") {
    form =
      char_arr.length >= 50 && char_arr.length <= 120
        ? 2
        : (char_arr.length >= 30 && char_arr.length <= 49) ||
          (char_arr.length >= 121 && char_arr.length <= 140)
        ? 1
        : 0;
  }
  // }
  let voca_score;
  if (
    fullStopCount === 1 &&
    char_arr.length >= 5 &&
    char_arr.length <= 75
    // &&
    // misspelled.length === 0
  ) {
    voca_score = 2;
  } else if (char_arr.length !== 0 && fullStopCount === 1) {
    voca_score = 1;
  } else {
    voca_score = 0;
  }

  //   setWordForm(form);//
  //   setVocabulary(voca_score);//

  //grammar
  let grammar_point = 0;
  let sentence_arr = char.split(/\.|\n+/).filter((word) => word !== "");

  let dot_with_sentence = null;
  if (sentence_arr.length <= 2) {
    let sentence = [];
    sentence[0] = char.includes(".")
      ? sentence_arr[0].trim() + "."
      : sentence_arr[0].trim();
    if (grammar_check(sentence[0])) {
      grammar_point += 1;
    }
  } else {
    // add full stop each array
    dot_with_sentence = sentence_arr.map((element, index) => {
      if (index == sentence_arr.length - 1) {
        if (char.endsWith(".")) {
          return element.trim() + ".";
        } else {
          return element;
        }
      } else {
        // if (element[element.length - 1] === ",") {
        //   return element.trim();
        // } else {
        return element.trim() + ".";
      }
    });

    for (let i = 0; i < dot_with_sentence.length; i++) {
      if (grammar_check(dot_with_sentence[i])) {
        grammar_point += 1;
      }
    }
  }

  //grammar calculation
  let grammar_percent;
  if (sentence_arr.length <= 2) {
    grammar_percent = (grammar_point / 1) * 100;
  } else {
    grammar_percent = (grammar_point / dot_with_sentence.length) * 100;
  }

  let cal_grammar_mark =
    grammar_percent >= 80
      ? 2
      : grammar_percent < 80 && grammar_percent > 40
      ? 1
      : 0;

  //   setGrammarMark(cal_grammar_mark);//

  // setCount(0);
  // setCheckBg("");
  // for (let i = 0; i < checkArray.length; i++) {
  //   if (checkArray[i].isCorrect === 1) {
  //     setCheckBg(i);
  //   }
  // }

  // let overall_point = 0;

  //vocab calculation

  let language_tool_grammar_points = 2;
  let language_tool_spelling_points = 2;
  let checkResult;
  try {
    checkResult = await GrammarCheck(char, originalContent);

    let mistakeOffsets = [];
    let mistakeLength = [];
    mistakeOffsets = checkResult?.mistakeOffsets;
    mistakeLength = checkResult?.mistakeLength;
    let mistakeDetails = checkResult?.mistakeDetails;
    let replacements = checkResult?.replacements;

    switch (true) {
      case checkResult.grammar_count <= 2 && checkResult.grammar_count !== 0:
        language_tool_grammar_points -= 1;
        break;
      case checkResult.grammar_count > 2:
        language_tool_grammar_points -= 2;
        break;
      default:
        break;
    }

    switch (true) {
      case checkResult.spelling_count <= 2 && checkResult.spelling_count !== 0:
        language_tool_spelling_points -= 1;
        break;
      case checkResult.spelling_count > 2:
        language_tool_spelling_points -= 2;
        break;
      default:
        break;
    }
    let textArrayForErrorDetails = [];
    let textErrorOffset = [];

    if (mistakeOffsets.length !== 0) {
      let currentOffset = 0;

      mistakeOffsets.forEach((offset, index) => {
        let endOffset = offset + mistakeLength[index];
        let textPortion = "";
        let errorPortion = "";

        if (offset !== currentOffset) {
          textPortion = char.slice(currentOffset, offset);

          textArrayForErrorDetails.push(textPortion);
          errorPortion = char.slice(offset, endOffset);
          let currentLength = textArrayForErrorDetails.length;
          textErrorOffset = [...textErrorOffset, currentLength];
          textArrayForErrorDetails.push(errorPortion);
        } else {
          errorPortion = char.slice(offset, endOffset);

          let currentLength = textArrayForErrorDetails.length;
          textErrorOffset = [...textErrorOffset, currentLength];
          textArrayForErrorDetails.push(errorPortion);
        }
        currentOffset = endOffset;
      });

      let lastOffsetEnd = currentOffset;
      if (char.length !== lastOffsetEnd) {
        let textPortion = char.slice(lastOffsetEnd, char.length);
        textArrayForErrorDetails.push(textPortion);
      }
    }

    voca_score = category === "swt" ? (form === 1 ? 2 : form) : form;

    //email convention calculation start
    let emailConventionPoints = 0;

    if (sentence_arr !== null && category === "wemail") {
      let result = checkEmailConvention(
        sentence_arr,
        conventionRules,
        emailType
      );

      emailConventionPoints =
        result?.closingConventionPoint +
        result?.openingConventionPoint +
        result?.introConventionPoint +
        result?.conclusionConventionPoint;
    }
    //email convention calculation end
    let organizationalPoints = 0;
    if (category === "wemail") {
      //email organization calculation

      let newlineSplitArray = char?.split(/\n+/);
      let linkerArray = conventionRules?.linkerRules.toLowerCase();
      let linkerExistCount = 0;
      newlineSplitArray.forEach((n) => {
        let linkerIncludes = linkerArray.split(",").map((l) => {
          return n.toLowerCase().includes(l.trim());
        });

        if (linkerIncludes.includes(true)) {
          let matchCount = linkerIncludes.join(" ").match(true);
          linkerExistCount += matchCount?.length;
        }
      });
      organizationalPoints =
        newlineSplitArray?.length > 0
          ? newlineSplitArray?.length >= 6 && linkerExistCount >= 3
            ? 2
            : 1
          : 0;
    }

    //email organization calculation
    let score;
    if (category === "we") {
      score =
        cal_content +
        form +
        language_tool_grammar_points +
        form +
        language_tool_spelling_points + //spelling is used as form for now needs to confirm in future
        form +
        form;
    } else if (category === "swt") {
      score = cal_content + form + language_tool_grammar_points + voca_score; //content + form +grammar + spelling + vocab
    } else if (category === "sst") {
      score =
        cal_content +
        form +
        language_tool_grammar_points +
        form +
        language_tool_spelling_points;
    } else if (category === "wemail") {
      score =
        cal_content +
        form +
        language_tool_grammar_points +
        form +
        language_tool_spelling_points + //spelling is used as form for now needs to confirm in future
        emailConventionPoints +
        organizationalPoints;
    }

    return {
      score: score,
      cal_content: cal_content,
      form: form,
      cal_grammar_mark: language_tool_grammar_points,
      spellng_language_tool: language_tool_spelling_points,
      voca_score: voca_score,
      mistakeDetails: mistakeDetails,
      mistakeOffsets: mistakeOffsets,
      mistakeLength: mistakeLength,
      misspelled: misspelled,
      spelling: spellResult,
      emailConventionPoints: emailConventionPoints,
      organizationalPoints: organizationalPoints,
      textArrayForErrorDetails: textArrayForErrorDetails,
      textErrorOffset: textErrorOffset,
      replacements: replacements,
    };
  } catch (error) {
    return {
      error: error,
      score: 0,
      cal_content: cal_content,
      form: form,
      cal_grammar_mark: language_tool_grammar_points,
      spellng_language_tool: language_tool_spelling_points,
      voca_score: voca_score,
      mistakeDetails: [],
      mistakeOffsets: [],
      mistakeLength: 0,
      misspelled: misspelled,
      spelling: spellResult,
      emailConventionPoints: 0,
      organizationalPoints: 0,
      textArrayForErrorDetails: [],
      textErrorOffset: [],
      replacements: [],
    };
  }
};

export default CalculateScore;
