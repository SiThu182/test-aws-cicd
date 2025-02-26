function isAllRemainingCategoryOverlappedWithKey(object, array) {
  return array.every((key) => Object.keys(object).includes(key));
}

function isAllRemainingCategoryOverlappedWithKeyOrWriting(
  object,
  array,
  writingArray
) {
  return array.every(
    (key) => Object.keys(object).includes(key) || writingArray.includes(key)
  );
}

function areObjectKeysNotIncluded(obj, array) {
  // Get the keys of the object
  if (obj === undefined || obj === null) {
    return;
  }
  const keys = Object.keys(obj);

  // Iterate over the keys and check if any key is included in the array
  for (let key of keys) {
    if (array.includes(key)) {
      return false; // Key is included in the array, return false
    }
  }

  // If none of the keys are included in the array, return true
  return true;
}
export const generateDailyPlan = async (days, planArray, categoryArray) => {
  let totalPlan = {};
  for (let index = 1; index <= days; index++) {
    let dailyPlan = {};

    let writingCategoryExist = false;
    for (let cCount = 0; cCount < 5; cCount++) {
      let overlapedWriting = false;

      let randomIndex = Math.floor(Math.random() * categoryArray.length);
      let isRemainingKeyOverlapped = false;

      while (
        (dailyPlan?.[categoryArray[randomIndex]] > 0 ||
          planArray[categoryArray[randomIndex]]?.[0] === undefined ||
          (writingCategoryExist &&
            ["we", "swt", "sst"].includes(categoryArray[randomIndex]))) &&
        // index !== days &&
        !isRemainingKeyOverlapped &&
        !overlapedWriting
      ) {
       
        if (planArray[categoryArray[randomIndex]]?.[0] === undefined) {
          categoryArray.splice(randomIndex, 1);
        }
        isRemainingKeyOverlapped = isAllRemainingCategoryOverlappedWithKey(
          dailyPlan,
          categoryArray
        );

        if (writingCategoryExist) {
         
          overlapedWriting = isAllRemainingCategoryOverlappedWithKeyOrWriting(
            dailyPlan,
            categoryArray,
            ["we", "swt", "sst"]
          );
        }

        let rindex = Math.floor(Math.random() * categoryArray.length);
        randomIndex = rindex;
      }

      let conditionMet = false;
      if (
        (index === days && dailyPlan?.[categoryArray[randomIndex]] > 0) ||
        (index === days &&
          planArray[categoryArray[randomIndex]]?.[0] === undefined) ||
        isRemainingKeyOverlapped ||
        overlapedWriting
      ) {
        while (
          (index === days &&
            !planArray[categoryArray[randomIndex]]?.length > 0) ||
          !planArray[categoryArray[randomIndex]]?.length > 0
        ) {
          categoryArray.splice(randomIndex, 1);
          let rindex = Math.floor(Math.random() * categoryArray.length);
          randomIndex = rindex;
        }

        let rindex = Math.floor(Math.random() * (days - 2)) + 1;

        let writingNotExistInDailyPlan = areObjectKeysNotIncluded(
          totalPlan["day" + rindex],
          ["we", "swt", "sst"]
        );
        let currentCategory = categoryArray[randomIndex];
        while (
          totalPlan["day" + rindex]?.hasOwnProperty(
            categoryArray[randomIndex]
          ) ||
          (!writingNotExistInDailyPlan &&
            ["we", "swt", "sst"].includes(currentCategory))
        ) {
         
          rindex = Math.floor(Math.random() * (days - 2) + 1);
          writingNotExistInDailyPlan = areObjectKeysNotIncluded(
            totalPlan["day" + rindex],
            ["we", "swt", "sst"]
          );
        }

        if (
          writingCategoryExist &&
          ["we", "swt", "sst"].includes(categoryArray[randomIndex])
        ) {
          // return;
        }
     

        for (let key in totalPlan["day" + rindex]) {
         
          if (!dailyPlan.hasOwnProperty(key)) {
            let tempValue = totalPlan["day" + rindex][key];
            dailyPlan[key] = tempValue;

            totalPlan["day" + rindex][categoryArray[randomIndex]] =
              planArray[categoryArray[randomIndex]][0];
            delete totalPlan["day" + rindex][key];

            totalPlan["day" + index] = { ...dailyPlan };
            if (!writingCategoryExist && ["we", "swt", "sst"].includes(key)) {
              writingCategoryExist = true;
            }
            conditionMet = true;
            break;
          }
        }
        if (!planArray[categoryArray[randomIndex]].length - 1 > 0) {
          categoryArray.splice(randomIndex, 1);
        }

        if (conditionMet) {
          planArray[categoryArray[randomIndex]].splice(0, 1);

          continue;
        }
      } else {
        if (!planArray[categoryArray[randomIndex]].length - 1 > 0) {
          categoryArray.splice(randomIndex, 1);
        }
        dailyPlan[categoryArray[randomIndex]] =
          planArray[categoryArray[randomIndex]][0];
        planArray[categoryArray[randomIndex]].splice(0, 1);
      }
      if (["we", "swt", "sst"].includes(categoryArray[randomIndex])) {
        writingCategoryExist = true;
      }

      // if (
      //   writingCategoryExist &&
      //   removeWriting?.length !== 0 &&
      //   cCount < 4 &&
      //   !isRemoved
      // ) {
      //   isRemoved = true;
      //   removeWriting.forEach((w) => {
      //     if (categoryArray.includes(w)) {
      //       let index = categoryArray.indexOf(w);
      //       categoryArray.splice(index, 1);
      //     }
      //   });
      // } else if (
      //   writingCategoryExist &&
      //   removeWriting?.length !== 0 &&
      //   cCount === 4 &&
      //   isRemoved
      // ) {
      //   removeWriting.forEach((w) => {
      //     categoryArray.push(w);
      //   });
      // }
    }

    totalPlan["day" + index] = { ...dailyPlan };
  }
  return totalPlan;
};
