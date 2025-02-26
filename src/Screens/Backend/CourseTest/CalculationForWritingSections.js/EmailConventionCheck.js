import checkSentenceGroupsForSimilarity from "./SimilarityBetweenTwoStrings";

const checkOpeningClosingPoints = (sentence_arr, rules) => {
  let i = 0;
  let isGreetingExist = false;
  let checkSentence = sentence_arr;

  while (!isGreetingExist && i < checkSentence.length - 1) {
    let checkString = checkSentence[i].toLowerCase().replace(",", "");
    isGreetingExist = rules
      .toLowerCase()
      .split(",")
      .find((c) => checkString.includes(c.trim()));
    i++;
  }

  if (isGreetingExist) {
    return 0.5;
  } else {
    return 0;
  }
};

const checkIntroOrConclusionPoints = (sentence_arr, rules) => {
  let introductionExit = false;
  let sameExist = null;

  sentence_arr.forEach((s, index) => {
    let isIntroExist = rules
      .toLowerCase()
      .split(",")
      .find((c) => s.toLowerCase().includes(c.trim()));

    if (isIntroExist !== undefined) {
      sameExist = true;
    }
  });

  if (sameExist === null) {
    let checkSentenceArray = sentence_arr;
    let ruleSentenceArray = rules.split(",");

    const results = checkSentenceGroupsForSimilarity(
      checkSentenceArray,
      ruleSentenceArray
    );
    results.forEach((r) => {
      if (r.includes(true)) {
        introductionExit = true;
      }
    });
  }

  if (sameExist || introductionExit) {
    return 0.5;
  } else {
    return 0;
  }
};

export const checkEmailConvention = (
  sentence_arr,
  conventionRules,
  emailType
) => {
  let openingConventionPoint = 0;
  let closingConventionPoint = 0;
  let introConventionPoint = 0;
  let conclusionConventionPoint = 0;

  let openingRules =
    emailType === "formal"
      ? conventionRules.formalOpeningRules
      : conventionRules.informalOpeningRules;

  let closingRules =
    emailType === "formal"
      ? conventionRules.formalClosingRules
      : conventionRules.informalClosingRules;

  let introRules =
    emailType === "formal"
      ? conventionRules.formalIntroductionRules
      : conventionRules.informalIntroductionRules;

  let conclusionRules =
    emailType === "formal"
      ? conventionRules.formalConclusionRules
      : conventionRules.informalConclusionRules;
  //for opening point
  openingConventionPoint = checkOpeningClosingPoints(
    sentence_arr,
    openingRules
  );
  //for closing point
  // checkGreetingPoints(conventionRules.informalOpeningRules,);
  closingConventionPoint = checkOpeningClosingPoints(
    sentence_arr,
    closingRules
  );

  //for introduction point
  // checkGreetingPoints(conventionRules.informalConclusionRules,);

  introConventionPoint = checkIntroOrConclusionPoints(sentence_arr, introRules);

  //for conclusion point
  conclusionConventionPoint = checkIntroOrConclusionPoints(
    sentence_arr,
    conclusionRules
  );

  return {
    openingConventionPoint: openingConventionPoint,
    closingConventionPoint: closingConventionPoint,
    introConventionPoint: introConventionPoint,
    conclusionConventionPoint: conclusionConventionPoint,
  };
};
