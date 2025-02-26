export const CheckStudyPlanProgress = (
  dailyScoreCount,
  dailyMCScoreCount,
  startDate
) => {
  const sdate = new Date(startDate);
  const sday = sdate.getDay();

  const currentDate = new Date();
  const currentDay = currentDate.getDay();

  for (let index = sday; index < currentDay; index++) {}
};

export const GenerateStudyPlan = async (startDate, examDate, targetScore) => {
  let totalPracticeCountsFor30Days = 0;
  //min count must not be less than 150 as we take ceil if it is lower than that there must be inconsistency between total and individual count as lowest by default based on 1 count per category for 5 category to 30 days
  switch (targetScore) {
    case "35-49":
      // totalPracticeCountsFor30Days = 800;
      totalPracticeCountsFor30Days = 30;
      break;
    case "50-64":
      // totalPracticeCountsFor30Days = 1200;
      totalPracticeCountsFor30Days = 40;
      break;
    case "65-78":
      //totalPracticeCountsFor30Days = 1600;
      totalPracticeCountsFor30Days = 50;
      break;
    case "79+":
      //totalPracticeCountsFor30Days = 2400;
      totalPracticeCountsFor30Days = 60;
      break;
    default:
      break;
  }

  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(examDate - startDate);

  // Convert milliseconds to days
  const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

  if (differenceDays < 7 || examDate === undefined) {
    return -1;
  }

  let dailyCount = 0;
  if (differenceDays < 30) {
    dailyCount = (1 / differenceDays) * totalPracticeCountsFor30Days;
  } else {
    let totalCount = (differenceDays / 30) * totalPracticeCountsFor30Days;
    dailyCount = (1 / differenceDays) * totalCount;
  }

  let fourSectionForDays =
    differenceDays < 30 ? Math.floor(differenceDays / 4) : Math.floor(30 / 4);

  //in case of  days greater than 30 times value
  let fourSectionForExtraDays = 0;
  let fourSectionForExtraDaysArray;
  if (differenceDays > 30) {
    let extraDays = differenceDays % 30;
    fourSectionForExtraDays =
      Math.floor(extraDays / 4) >= 1 ? Math.floor(extraDays / 4) : 1;

    let checkRemainingExtraDays = extraDays - fourSectionForExtraDays * 4;

    fourSectionForExtraDaysArray = Array.from(
      { length: 4 },
      () => fourSectionForExtraDays
    );

    let dayArrayIndex = 0;

    while (checkRemainingExtraDays !== 0) {
      if (checkRemainingExtraDays < 0) {
        fourSectionForExtraDaysArray[dayArrayIndex] -= 1;
        checkRemainingExtraDays += 1;
      } else {
        fourSectionForExtraDaysArray[dayArrayIndex] += 1;
        checkRemainingExtraDays -= 1;
      }

      dayArrayIndex++;
    }
  }

  let checkRemainingExtraDays =
    differenceDays < 30
      ? differenceDays - fourSectionForDays * 4
      : 30 - fourSectionForDays * 4;

  let fourSectionDaysArray = Array.from(
    { length: 4 },
    () => fourSectionForDays
  );

  let dayArrayIndex = 0;

  while (checkRemainingExtraDays !== 0) {
    fourSectionDaysArray[dayArrayIndex] += 1;
    checkRemainingExtraDays -= 1;
    dayArrayIndex++;
  }

  let categoryArray = [
    "ra",
    "rs",
    "rl",
    "asq",
    "di",
    "we",
    "swt",
    "rsmc",
    "rmc",
    "rfib",
    "rwfib",
    "rop",
    "sst",
    "mc",
    "smc",
    "hiw",
    "fib",
    "smw",
    "hcs",
    "wfd",
  ];
  let categoryArray1 = [...categoryArray];
  let fourSectionRandomCategory = [[], [], [], []];

  fourSectionRandomCategory.forEach((s, i) => {
    for (let index = 0; index < 5; index++) {
      let writingCategoryExist = false;
      const randomIndex = Math.floor(Math.random() * categoryArray.length);
      if (["we", "swt", "sst"].includes(categoryArray[randomIndex])) {
        if (writingCategoryExist) {
          let increaseIndex = 1;
          while (
            ["we", "swt", "sst"].includes(
              categoryArray[randomIndex + increaseIndex]
            )
          ) {
            increaseIndex++;
          }
          if (categoryArray[randomIndex + increaseIndex] !== undefined) {
            s[index] = categoryArray[randomIndex + increaseIndex];
            categoryArray.splice(randomIndex + increaseIndex, 1);
          } else {
            let tempElement = s[i - 1][0];
            s[i - 1][0] = categoryArray[randomIndex];
            s[index] = tempElement;
            categoryArray.splice(randomIndex, 1);
          }
        } else {
          writingCategoryExist = true;
          s[index] = categoryArray[randomIndex];
          categoryArray.splice(randomIndex, 1);
        }
      } else {
        s[index] = categoryArray[randomIndex];
        categoryArray.splice(randomIndex, 1);
      }
    }
  });

  const generateDailyPlanCount = (days, categoryArray, planArray) => {
    //calculate daily count depending on total category days and base days with count

    if (days !== 0) {
      let divisorDays = differenceDays > 30 ? 30 : differenceDays;
      let totalDaysCountForEachCategory =
        ((days / divisorDays) * totalPracticeCountsFor30Days) / 5;

      let dailyCount = Math.ceil(totalDaysCountForEachCategory / days);

      let max = dailyCount + 10;
      let min = dailyCount - 5 < 0 ? 1 : dailyCount - 5;

      //loop category array and assign each day count
      for (let cIndex = 0; cIndex < categoryArray.length; cIndex++) {
        if (targetScore === "35-49") {
          if (["we", "swt", "sst"].includes(categoryArray[cIndex])) {
            dailyCount = 3;

            max = dailyCount;
            min = 1;
          } else if (["ra", "rs", "mc"].includes(categoryArray[cIndex])) {
            dailyCount = dailyCount + 5;
          }
        } else if (targetScore === "50-64") {
          if (["we", "swt", "sst"].includes(categoryArray[cIndex])) {
            dailyCount = 4;

            max = dailyCount;
            min = 1;
          } else if (["ra", "rs", "mc"].includes(categoryArray[cIndex])) {
            dailyCount = dailyCount + 6;
          }
        } else if (targetScore === "65-78") {
          if (["we", "swt", "sst"].includes(categoryArray[cIndex])) {
            dailyCount = 5;

            max = dailyCount;
            min = 1;
          } else if (["ra", "rs", "mc"].includes(categoryArray[cIndex])) {
            dailyCount = dailyCount + 11;
          }
        } else if (targetScore === "79+") {
          if (["we", "swt", "sst"].includes(categoryArray[cIndex])) {
            dailyCount = 6;

            max = dailyCount;
            min = 1;
          } else if (["ra", "rs", "mc"].includes(categoryArray[cIndex])) {
            dailyCount = dailyCount + 14;
          }
        }
        let countArray = [];
        if (days === 1) {
          countArray.push(dailyCount);
        } else if (days > 1) {
          for (let i = 1; i <= days; i++) {
            // assign each day count random
            let randomCount;
            if (["we", "swt", "sst"].includes(categoryArray[cIndex])) {
              randomCount = max;
            } else {
              randomCount = Math.ceil(Math.random() * (max - min) + min);
            }

            countArray.push(randomCount);
          }
        }

        let total = countArray.reduce((cArray, num) => cArray + num, 0);

        //for finding and adjusting that sum of total number is less or greater than intended daily limit

        while (total !== dailyCount * days) {
          let randomIndex = Math.floor(Math.random() * countArray.length);
          while (countArray[randomIndex] <= 1) {
            randomIndex = Math.floor(Math.random() * countArray.length);
          }
          if (total > dailyCount * days) {
            countArray[randomIndex] -= 1;
            total -= 1;
          } else {
            countArray[randomIndex] += 1;
            total += 1;
          }
        }

        planArray[categoryArray[cIndex]] = [...countArray];
      }
    } else {
      return planArray;
    }
  };

  let dailyPlan = {};
  let extraDailyPlan = {};
  if (differenceDays <= 30) {
    for (let index = 0; index < fourSectionDaysArray.length; index++) {
      generateDailyPlanCount(
        fourSectionDaysArray[index],
        fourSectionRandomCategory[index],
        dailyPlan,
        index === fourSectionDaysArray.length - 1
      );
    }
  } else {
    for (let index = 0; index < fourSectionForExtraDaysArray.length; index++) {
      generateDailyPlanCount(
        fourSectionDaysArray[index],
        fourSectionRandomCategory[index],
        dailyPlan,
        index === fourSectionDaysArray.length - 1
      );
      generateDailyPlanCount(
        fourSectionForExtraDaysArray[index],
        fourSectionRandomCategory[index],
        extraDailyPlan,
        index === fourSectionForExtraDaysArray.length - 1
      );
    }
  }

  // let categoryArray2 = [...categoryArray1];
  function removeStringsNotInObject(obj, array) {
    return array.filter((str) => obj.hasOwnProperty(str));
  }

  let categoryArrayForExtraDays = removeStringsNotInObject(
    extraDailyPlan,
    categoryArray1
  );

  return {
    dailyPlan: dailyPlan,
    daysArray: fourSectionDaysArray,
    categoryArray: categoryArray1,
    categoryArrayForExtraDays: categoryArrayForExtraDays,
    days: differenceDays,
    startDate: startDate,
    examDate: examDate,
    extraDays: differenceDays % 30,
    extraDailyPlan: extraDailyPlan,
  };
};
