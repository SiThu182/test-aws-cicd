export const storeQuestionData = (sectionType, questions) => {
  if (sectionType === "speaking") {
    let storeFunction = (category, data) => {
      let storeData = {
        post: [],
        score: [],
        url: [],
        answer: [],
        points: [],
        question_number: 0,
      };

      const initialNumberArray = Array(data.length).fill(0);
      const initialStringArray = Array(data.length).fill("");
      const initialEmptyArray = [];
      const emptyArray = [""];
      for (let index = 0; index < data.length; index++) {
        initialEmptyArray.push(emptyArray);
      }
      data.map((p) => storeData.post.push(p.id));
      storeData.post = storeData.post.toString();
      storeData.points = JSON.stringify(initialStringArray);
      storeData.question_number = data.length;
      storeData.url = initialStringArray.toString();
      storeData.answer = JSON.stringify(initialEmptyArray);
      storeData.score = initialNumberArray.toString();

      localStorage.setItem(category, JSON.stringify(storeData));
    };
    storeFunction("ra", questions.ra);
    storeFunction("rs", questions.rs);
    storeFunction("di", questions.di);
    storeFunction("rl", questions.rl);
    storeFunction("asq", questions.asq);
  }

  if (sectionType !== "speaking") {
    let storeFunction = (category, data, totalPoint) => {
      let storeData = {
        post: [],
        score: [],
        answer: [],
        question_number: 0,
        points: [],
      };

      const initialNumberArray = Array(data.length).fill(0);
      const emptyArray = [""];
      const initialStringArray = Array(data.length).fill("");

      const initialEmptyArray = [];
      for (let index = 0; index < data.length; index++) {
        initialEmptyArray.push(emptyArray);
      }

      data.map((p) => storeData.post.push(p.id));
      storeData.post = storeData.post.toString();
      storeData.question_number = data.length;
      storeData.answer = JSON.stringify(initialEmptyArray);
      storeData.score = initialNumberArray.toString();
      storeData.points = JSON.stringify(initialStringArray);

      if (
        category === "rsmc" ||
        category === "smc" ||
        category === "hcs" ||
        category === "smw"
      ) {
        const initialStringArray = Array(data.length).fill("");
        storeData.answer = initialStringArray.toString();
      }
      if (totalPoint) {
        storeData.total_point = [];

        if (category === "rmc" || category === "mc") {
          storeData.total_point = [];
          data.forEach((p, i) => {
            let correctCount = 0;
            p.mul_choices.forEach((c) => {
              if (c.isCorrect == 1) {
                correctCount += 1;
              }
            });

            storeData.total_point.push(correctCount);
          });
          storeData.total_point = storeData.total_point.toString();
        }
        if (category === "rfib") {
          storeData.total_point = [];
          data.forEach((p, i) => {
            let correctCount = 0;
            p?.answers.forEach((c) => {
              if (c.is_correct == 1) {
                correctCount += 1;
              }
            });

            storeData.total_point.push(correctCount);
          });
          storeData.total_point = storeData.total_point.toString();
        }
        if (category === "rop") {
          let correctCount = 0;

          data.forEach((p) => {
            correctCount = p.reorders.length - 1;
            storeData.total_point.push(correctCount);
          });

          storeData.total_point = storeData.total_point.toString();
        }
        if (category === "rwfib" || category === "fib" || category === "hiw") {
          let correctCount = 0;

          data.forEach((p) => {
            correctCount = p.answers.length;

            storeData.total_point.push(correctCount);
          });

          storeData.total_point = storeData.total_point.toString();
        }
      }

      localStorage.setItem(category, JSON.stringify(storeData));
    };
    if (sectionType === "writing") {
      storeFunction("we", questions.we, false);
      storeFunction("swt", questions.swt, false);
    }
    if (sectionType === "reading") {
      storeFunction("rsmc", questions.rsmc, false);
      storeFunction("rmc", questions.rmc, true);
      storeFunction("rfib", questions.rfib, true);
      storeFunction("rwfib", questions.rwfib, true);
      storeFunction("rop", questions.rop, true);
    }
    if (sectionType === "listening") {
      storeFunction("smc", questions.smc, false);
      storeFunction("mc", questions.mc, true);
      storeFunction("fib", questions.fib, true);
      storeFunction("hcs", questions.hcs, false);
      storeFunction("hiw", questions.hiw, true);
      storeFunction("smw", questions.smw, false);
      storeFunction("sst", questions.sst, false);
      storeFunction("wfd", questions.wfd, false);
    }
  }
};

//update user data in localstorage
export const updateUserData = (sectionType, category, updateData, mockId) => {
  let updateStoreData = {
    post: null,
    answer: null,
    question_number: null,
    score: null,
    points: null,
  };

  updateStoreData.post = updateData.post;
  updateStoreData.question_number = updateData.question_number;
  updateStoreData.score = updateData.score.toString();
  if (sectionType === "Speaking") {
    updateStoreData.url = updateData.url.toString();
    updateStoreData.answer = JSON.stringify(updateData.answer);
    updateStoreData.points = JSON.stringify(updateData.points);
  } else if (sectionType === "Writing") {
    updateStoreData.answer = JSON.stringify(updateData.answer);
    updateStoreData.points = JSON.stringify(updateData.points);
  } else if (sectionType === "Reading") {
    if (category === "rsmc") {
      updateStoreData.answer = updateData.answer.toString();
    } else {
      updateStoreData.answer = JSON.stringify(updateData.answer);
      updateStoreData.total_point = updateData.total_point;
    }
  } else if (sectionType === "Listening") {
    if (category === "smc" || category === "hcs" || category === "smw") {
      updateStoreData.answer = updateData.answer.toString();
    } else {
      updateStoreData.answer = JSON.stringify(updateData.answer);
    }
    if (category === "fib" || category === "hiw" || category === "mc") {
      updateStoreData.total_point = updateData.total_point;
    }
    if (category === "sst" || category === "wfd") {
      updateStoreData.points = JSON.stringify(updateData.points);
    }
  }

  localStorage.setItem(category, JSON.stringify(updateStoreData));
  let userId = localStorage.getItem("userId");
  localStorage.setItem(
    userId + "saveMt" + mockId + category,
    JSON.stringify(updateStoreData)
  );
};
