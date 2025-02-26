export let CalculatorScore = (
  transcripts,
  user_data,
  rec_duration,
  category,
  startTime,
  keyword_length = 0
) => {
  // let transcript_arr = transcript.split(/[ .,-)]+/);

  let shortPauseCount = 0;
  let longPauseCount = 0; 
  if (startTime !== null && startTime?.length !== 0) {
    for (let i = 0; i < startTime?.length - 1; i++) {
      let difference = startTime[i + 1] - startTime[i];
      if (i != 0) {
        if (difference >= 1500 && difference < 3000) {
          shortPauseCount += 1;
          console.log(shortPauseCount);
        }
        if (difference >= 3000) {
          // alert("add 1 to long pause count");
          longPauseCount += 1;
          console.log(longPauseCount);
        }
      }
    }
  }

  const transcript_arr = transcripts
    .replace(/(\d),(?=\d)/g, "$1")
    .replaceAll("%", " percent")
    .split(/[\(\),\s]+/)
    .filter(Boolean)

    .map((transcript) => transcript.replace(/\./g, "").trim());
  const user_data_arr = user_data
    .replace(/(\d),(?=\d)/g, "$1")
    .replace("%", " percent")
    .split(/[\(\),\s]+/)
    .filter(Boolean)

    .map((user_rec) => user_rec.replace(/\./g, "").trim());

  // console.log(transcript_arr);
  // console.log(user_data_arr);
  // console.log("long pause");
  // console.log(longPauseCount);
  // console.log("short pause");
  // console.log(shortPauseCount);
  // let user_data_arr = user_data.split(/[ .,-]+/);
  let word_in_post =
    keyword_length > 0 ? keyword_length : transcript_arr.length;

  let recognized_word = 0;
  transcript_arr.forEach((check_char) => {
    if (user_data_arr.includes(check_char)) {
      if (category === "ra" || category === "rs") {
        let indexToRemove = user_data_arr.findIndex((item) =>
          item.includes(check_char)
        );

        user_data_arr.splice(indexToRemove, 1);
      }
      recognized_word += 1;
    }
  });

  let pronunciation_percentage = parseInt(
    (recognized_word / word_in_post) * 100
  );

  let pronunciation;

  switch (true) {
    case pronunciation_percentage > 85:
      pronunciation = 5;

      break;
    case pronunciation_percentage > 70 && pronunciation_percentage <= 85:
      pronunciation = 4;
      break;
    case pronunciation_percentage > 50 && pronunciation_percentage <= 70:
      pronunciation = 3;

      break;
    case pronunciation_percentage > 30 && pronunciation_percentage <= 50:
      pronunciation = 2;
      break;
    case pronunciation_percentage <= 30 && pronunciation_percentage > 10:
      pronunciation = 1;
      break;

    default:
      pronunciation = 0;
      break;
  }

  let recording_duration = category === "rs" || category === "asq" ? 10 : 40;

  let wpm = (recognized_word * recording_duration) / rec_duration;
  let fluency_penesentage = (parseInt(wpm) / word_in_post) * 100;
  // let fluency_penesentage = 50;
  let fluency;
  switch (true) {
    case fluency_penesentage > 85:
      fluency = 5;

      break;
    case fluency_penesentage > 70 && fluency_penesentage <= 85:
      fluency = 4;
      break;
    case fluency_penesentage > 40 && fluency_penesentage <= 60:
      fluency = 3;
      break;
    case fluency_penesentage > 20 && fluency_penesentage <= 40:
      fluency = 2;
      break;
    case fluency_penesentage > 10 && fluency_penesentage <= 20:
      fluency = 1;
      break;
    default:
      fluency = 0;
      break;
  }

  // let wpm = fluency;
  let content;
  let content_presentage = parseInt((recognized_word / word_in_post) * 100);

  // let content_penesentage = parent()
  if (category === "rs") {
    switch (true) {
      case content_presentage >= 100:
        content = 3;
        break;
      case content_presentage > 50 && content_presentage < 100:
        content = 2;
        break;
      case content_presentage <= 50 && content_presentage > 25:
        content = 1;
        break;

      default:
        content = 0;
        break;
    }
  } else if (category === "asq") {
    content = content_presentage >= 50 ? 1 : 0;
  } else {
    switch (true) {
      case content_presentage > 90:
        content = 5;

        break;
      case content_presentage > 60 && content_presentage <= 90:
        content = 4;
        break;
      case content_presentage > 40 && content_presentage <= 60:
        content = 3;

        break;
      case content_presentage > 30 && content_presentage <= 40:
        content = 2;
        break;
      case content_presentage > 20 && content_presentage <= 30:
        content = 1.5;
        break;
      case content_presentage <= 20 && content_presentage > 10:
        content = 1;
        break;

      default:
        content = 0;
        break;
    }
  }

  if (category === "rs") {
    content = (content_presentage * 3) / 100 + 0.2;
    content = content > 3 ? 3 : content;
  }
  if (category !== "asq" && category !== "rs") {
    content = (content_presentage * 5) / 100 + 0.2;
    content = content > 5 ? 5 : content;
  }

  fluency = (fluency_penesentage * 5) / 100;

  let content_max_point = category === "rs" ? 3 : category === "asq" ? 1 : 5;
  // let max_point = category == "rs" ? 3 : 5;

  // if (pronunciation < content) {
  //   switch (pronunciation) {
  //     case content - 1:
  //       fluency += 0.2;
  //       break;
  //     case content - 2:
  //       fluency += 0.5;
  //       break;
  //     case content - 3:
  //       fluency += 0.8;
  //       break;
  //     case content - 4:
  //       fluency += 1;
  //       break;
  //     default:
  //       break;
  //   }
  // }
  fluency = fluency > 5 ? 5 : fluency;

  if (category !== "rs" && fluency > content) {
    switch (true) {
      case fluency >= content + 1 && fluency < content + 1.5:
        fluency -= 0.3;

        break;
      case fluency >= content + 1.5 && fluency < content + 2:
        fluency -= 0.8;

        break;
      case fluency >= content + 2 && fluency < content + 2.5:
        fluency -= 1.2;

        break;
      case fluency >= content + 2.5 && fluency < content + 3:
        fluency -= 1.8;

        break;
      case fluency >= content + 3 && fluency < content + 3.5:
        fluency -= 2.0;
        break;
      case fluency >= content + 3.5 && fluency < content + 4:
        fluency -= 2.5;

        break;
      case fluency >= content + 4:
        fluency -= 3;

        break;
      default:
        break;
    }
  }

  if (category === "rs" && fluency > content) {
    switch (true) {
      case fluency >= content + 3 && fluency < content + 3.5:
        fluency -= 1;
        break;
      case fluency >= content + 3.5 && fluency < content + 4:
        fluency -= 1.5;
        break;
      case fluency >= content + 4:
        fluency -= 2;
        break;
      default:
        break;
    }
  }

  //fluency based on pause count

  if (shortPauseCount >= 1 || longPauseCount >= 1) {
    let minusShortPausePoint = shortPauseCount * 0.3;
    let minusLongPausePoint = longPauseCount * 0.6;
    fluency = fluency - (minusLongPausePoint + minusShortPausePoint);
    fluency = fluency < 0 ? 0 : fluency;
  }

  // console.log("fluency after pause");
  // console.log(fluency);
  // pronunciation = Math.round(pronunciation);
  // content = Math.round(content);
  // fluency = Math.round(fluency);
  let pronunciation_ninety =
    (pronunciation / 5) * 90 < 10 ? 10 : (pronunciation / 5) * 90;
  let content_ninety =
    category === "asq"
      ? content
      : (content / content_max_point) * 90 < 10
      ? 10
      : (content / content_max_point) * 90;

  fluency = fluency > 5 ? 5 : fluency;
  let fluency_ninety = (fluency / 5) * 90 < 10 ? 10 : (fluency / 5) * 90;

  let overall_points = pronunciation + content + fluency;

  // let check_min_ten_mark =
  let overall_points_ninety =
    (pronunciation_ninety + content_ninety + fluency_ninety) / 3;

  let scores = {
    pronunciation: pronunciation,
    fluency: fluency,
    content: content,
    overall_points: Math.round(overall_points),
    number_of_recognized_words: recognized_word,
    number_of_words_in_post: word_in_post,
    length_of_recording_in_sec: rec_duration,
    fluency_ninety: Math.round(fluency_ninety),
    pronunciation_ninety: Math.round(pronunciation_ninety),
    content_ninety: Math.round(content_ninety),
    overall_points_ninety: Math.round(overall_points_ninety),
  };

  return scores;
};
