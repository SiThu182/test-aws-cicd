import { corruptSaveFileCheck } from "./CorruptSaveFileCheck";
import swal from "sweetalert";
const userId = localStorage.getItem("userId");

export const savedCurrentPost = (category, index) => {
  localStorage.setItem("saveCategory", category);
  localStorage.setItem("saveIndex", index);
};

export const saveData = (
  mtId,
  mtType,
  time,
  page,
  state,
  category,
  index,
  finishedTestData,
  //for writing section in which times are limited and no wifi in deep into the questions can be disrupt the exam flow
  detailAnswer,
  detailDuration,
  currentCategoryData = undefined,
  currentSaveData = undefined
) => {
  let savedMtData = {
    mtId: mtId,
    mtType: mtType,
    time: time,
    page: page,
    speakingState: mtType === 1 || mtType === 3 ? state.speakingState : "",
    readingState: mtType === 1 || mtType === 4 ? state.readingState : "",
    listeningState: mtType === 1 || mtType === 5 ? state.listeningState : "",
    writingState: mtType === 1 || mtType === 6 ? state.writingState : "",
    category: category,
    index: index,
  };

  if (finishedTestData !== null) {
    if (mtType === 1 || mtType === 3) {
      // switch (category) {
      //   case "ra":
      //     savedMtData.ra = finishedTestData["ra"];
      //     break;
      //   case "rs":
      //     savedMtData.ra = finishedTestData["ra"];
      //     savedMtData.rs = finishedTestData["rs"];
      //     break;
      //   case "di":
      //     savedMtData.ra = finishedTestData["ra"];
      //     savedMtData.rs = finishedTestData["rs"];
      //     savedMtData.di = finishedTestData["di"];
      //     break;
      //   case "rl":
      //     savedMtData.ra = finishedTestData["ra"];
      //     savedMtData.rs = finishedTestData["rs"];
      //     savedMtData.di = finishedTestData["di"];
      //     savedMtData.rl = finishedTestData["rl"];
      //     break;
      //   case "asq":
      //     savedMtData.ra = finishedTestData["ra"];
      //     savedMtData.rs = finishedTestData["rs"];
      //     savedMtData.di = finishedTestData["di"];
      //     savedMtData.rl = finishedTestData["rl"];
      //     savedMtData.asq = finishedTestData["asq"];
      //     break;

      //   default:
      //     savedMtData.ra = finishedTestData["ra"];
      //     savedMtData.rs = finishedTestData["rs"];
      //     savedMtData.di = finishedTestData["di"];
      //     savedMtData.rl = finishedTestData["rl"];
      //     savedMtData.asq = finishedTestData["asq"];
      //     break;
      // }
      savedMtData.ra = finishedTestData["ra"];
      savedMtData.rs = finishedTestData["rs"];
      savedMtData.di = finishedTestData["di"];
      savedMtData.rl = finishedTestData["rl"];
      savedMtData.asq = finishedTestData["asq"];
    }

    if (mtType === 1 || mtType === 6) {
      // switch (category) {
      //   case "swt":
      //     savedMtData.swt = finishedTestData["swt"];
      //     break;
      //   case "we":
      //     savedMtData.swt = finishedTestData["swt"];
      //     savedMtData.we = finishedTestData["we"];
      //     break;
      //   default:
      //     savedMtData.swt = finishedTestData["swt"];
      //     savedMtData.we = finishedTestData["we"];
      //     break;
      // }
      console.log(detailAnswer, detailDuration);

      savedMtData.swt = finishedTestData["swt"];
      savedMtData.we = finishedTestData["we"];
      savedMtData.detailAnswer = detailAnswer;
      savedMtData.detailDuration = detailDuration;
    }
    if (mtType === 1 || mtType === 4) {
      // switch (category) {
      //   case "rsmc":
      //     savedMtData.rsmc = finishedTestData["rsmc"];
      //     break;
      //   case "rmc":
      //     savedMtData.rsmc = finishedTestData["rsmc"];
      //     savedMtData.rmc = finishedTestData["rmc"];
      //     break;
      //   case "rop":
      //     savedMtData.rsmc = finishedTestData["rsmc"];
      //     savedMtData.rmc = finishedTestData["rmc"];
      //     savedMtData.rop = finishedTestData["rop"];
      //     break;
      //   case "rfib":
      //     savedMtData.rsmc = finishedTestData["rsmc"];
      //     savedMtData.rmc = finishedTestData["rmc"];
      //     savedMtData.rop = finishedTestData["rop"];
      //     savedMtData.rfib = finishedTestData["rfib"];
      //     break;

      //   default:
      //     savedMtData.rsmc = finishedTestData["rsmc"];
      //     savedMtData.rmc = finishedTestData["rmc"];
      //     savedMtData.rop = finishedTestData["rop"];
      //     savedMtData.rfib = finishedTestData["rfib"];
      //     savedMtData.rwfib = finishedTestData["rwfib"];
      //     break;
      // }
      savedMtData.rsmc = finishedTestData["rsmc"];
      savedMtData.rmc = finishedTestData["rmc"];
      savedMtData.rop = finishedTestData["rop"];
      savedMtData.rfib = finishedTestData["rfib"];
      savedMtData.rwfib = finishedTestData["rwfib"];
    }
    if (mtType === 1 || mtType === 5) {
      // switch (category) {
      //   case "sst":
      //     savedMtData.sst = finishedTestData["sst"];
      //     break;
      //   case "mc":
      //     savedMtData.sst = finishedTestData["sst"];
      //     savedMtData.mc = finishedTestData["mc"];
      //     break;
      //   case "fib":
      //     savedMtData.sst = finishedTestData["sst"];
      //     savedMtData.mc = finishedTestData["mc"];
      //     savedMtData.fib = finishedTestData["fib"];
      //     break;
      //   case "hcs":
      //     savedMtData.sst = finishedTestData["sst"];
      //     savedMtData.mc = finishedTestData["mc"];
      //     savedMtData.fib = finishedTestData["fib"];
      //     savedMtData.hcs = finishedTestData["hcs"];
      //     break;
      //   case "smc":
      //     savedMtData.sst = finishedTestData["sst"];
      //     savedMtData.mc = finishedTestData["mc"];
      //     savedMtData.fib = finishedTestData["fib"];
      //     savedMtData.hcs = finishedTestData["hcs"];
      //     savedMtData.smc = finishedTestData["smc"];
      //     break;
      //   case "smw":
      //     savedMtData.sst = finishedTestData["sst"];
      //     savedMtData.mc = finishedTestData["mc"];
      //     savedMtData.fib = finishedTestData["fib"];
      //     savedMtData.hcs = finishedTestData["hcs"];
      //     savedMtData.smc = finishedTestData["smc"];
      //     savedMtData.smw = finishedTestData["smw"];
      //     break;
      //   case "hiw":
      //     savedMtData.sst = finishedTestData["sst"];
      //     savedMtData.mc = finishedTestData["mc"];
      //     savedMtData.fib = finishedTestData["fib"];
      //     savedMtData.hcs = finishedTestData["hcs"];
      //     savedMtData.smc = finishedTestData["smc"];
      //     savedMtData.smw = finishedTestData["smw"];
      //     savedMtData.hiw = finishedTestData["hiw"];
      //     break;

      //   default:
      //     savedMtData.sst = finishedTestData["sst"];
      //     savedMtData.mc = finishedTestData["mc"];
      //     savedMtData.fib = finishedTestData["fib"];
      //     savedMtData.hcs = finishedTestData["hcs"];
      //     savedMtData.smc = finishedTestData["smc"];
      //     savedMtData.smw = finishedTestData["smw"];
      //     savedMtData.hiw = finishedTestData["hiw"];
      //     savedMtData.wfd = finishedTestData["wfd"];
      //     break;
      // }
      savedMtData.sst = finishedTestData["sst"];
      savedMtData.mc = finishedTestData["mc"];
      savedMtData.fib = finishedTestData["fib"];
      savedMtData.hcs = finishedTestData["hcs"];
      savedMtData.smc = finishedTestData["smc"];
      savedMtData.smw = finishedTestData["smw"];
      savedMtData.hiw = finishedTestData["hiw"];
      savedMtData.wfd = finishedTestData["wfd"];
      savedMtData.detailAnswer = detailAnswer;
      savedMtData.detailDuration = detailDuration;
    }
  }

  const userId = localStorage.getItem("userId");

  console.log(currentSaveData, "currentsave data");
  console.log(currentCategoryData, "currentcategory data");

  if (currentSaveData !== undefined && currentSaveData !== null) {
    let currentData = JSON.parse(currentSaveData);
    let raLocal = JSON.parse(localStorage.getItem("ra"));
    let saveraLocal = JSON.parse(currentData[category]);
    console.log(raLocal, saveraLocal, "save ralocal");

    currentData["time"] = time;
    currentData["page"] = page;
    currentData["detailAnswer"] = detailAnswer;
    currentData["detailDuration"] = detailDuration;
    currentData["speakingState"] =
      mtType === 1 || mtType === 3 ? state.speakingState : "";
    currentData["readingState"] =
      mtType === 1 || mtType === 4 ? state.readingState : "";
    currentData["listeningState"] =
      mtType === 1 || mtType === 5 ? state.listeningState : "";
    currentData["writingState"] =
      mtType === 1 || mtType === 6 ? state.writingState : "";
    currentData["category"] = category;
    currentData["index"] = index;
    currentData[category] = currentCategoryData;

    localStorage.setItem(userId + "saveMt" + mtId, JSON.stringify(currentData));
  } else {
    localStorage.setItem(userId + "saveMt" + mtId, JSON.stringify(savedMtData));
  }
};

export const updateSavedData = (savedData, mtType, setPause) => {
  let data = JSON.parse(savedData);
  let state = {
    speakingState: data.speakingState,
    readingState: data.readingState,
    writingState: data.writingState,
    listeningState: data.listeningState,
  };
  let savedMtData = {
    mtId: data?.mtId,
    mtType: data?.mtType,
    time: data?.time,
    page: data?.page,
    speakingState: mtType === 1 || mtType === 3 ? state.speakingState : "",
    readingState: mtType === 1 || mtType === 4 ? state.readingState : "",
    listeningState: mtType === 1 || mtType === 5 ? state.listeningState : "",
    writingState: mtType === 1 || mtType === 6 ? state.writingState : "",
    category: data?.category,
    index: data?.index,
    detailAnswer: data?.detailAnswer,
    detailDuration: data?.detailDuration,
  };
  let raCheck = corruptSaveFileCheck(localStorage.getItem("ra"), data.ra);
  let rsCheck = corruptSaveFileCheck(localStorage.getItem("rs"), data.rs);
  let diCheck = corruptSaveFileCheck(localStorage.getItem("di"), data.di);
  let rlCheck = corruptSaveFileCheck(localStorage.getItem("rl"), data.rl);
  let asqCheck = corruptSaveFileCheck(localStorage.getItem("asq"), data.asq);
  let swtCheck = corruptSaveFileCheck(localStorage.getItem("swt"), data.swt);
  let weCheck = corruptSaveFileCheck(localStorage.getItem("we"), data.we);
  let rsmcCheck = corruptSaveFileCheck(localStorage.getItem("rsmc"), data.rsmc);
  let rmcCheck = corruptSaveFileCheck(localStorage.getItem("rmc"), data.rmc);
  let ropCheck = corruptSaveFileCheck(localStorage.getItem("rop"), data.rop);
  let rfibCheck = corruptSaveFileCheck(localStorage.getItem("rfib"), data.rfib);
  let rwfibCheck = corruptSaveFileCheck(
    localStorage.getItem("rwfib"),
    data.rwfib
  );
  let sstCheck = corruptSaveFileCheck(localStorage.getItem("sst"), data.sst);
  let mcCheck = corruptSaveFileCheck(localStorage.getItem("mc"), data.mc);

  let fibCheck = corruptSaveFileCheck(localStorage.getItem("fib"), data.fib);
  let hcsCheck = corruptSaveFileCheck(localStorage.getItem("hcs"), data.hcs);
  let smcCheck = corruptSaveFileCheck(localStorage.getItem("smc"), data.smc);
  let smwCheck = corruptSaveFileCheck(localStorage.getItem("smw"), data.smw);
  let hiwCheck = corruptSaveFileCheck(localStorage.getItem("hiw"), data.hiw);
  let wfdCheck = corruptSaveFileCheck(localStorage.getItem("wfd"), data.wfd);

  console.log(rsCheck);

  if (mtType === 1 || mtType === 3) {
    switch (data.category) {
      case "ra":
        localStorage.setItem("ra", data.ra);
        break;
      case "rs":
        localStorage.setItem("ra", data.ra);
        localStorage.setItem("rs", data.rs);
        break;
      case "di":
        localStorage.setItem("ra", data.ra);
        localStorage.setItem("rs", data.rs);
        localStorage.setItem("di", data.di);
        break;
      case "rl":
        localStorage.setItem("ra", data.ra);
        localStorage.setItem("rs", data.rs);
        localStorage.setItem("di", data.di);
        localStorage.setItem("rl", data.rl);
        break;
      case "asq":
        localStorage.setItem("ra", data.ra);
        localStorage.setItem("rs", data.rs);
        localStorage.setItem("di", data.di);
        localStorage.setItem("rl", data.rl);
        localStorage.setItem("asq", data.asq);
        break;

      default:
        localStorage.setItem("ra", data.ra);
        localStorage.setItem("rs", data.rs);
        localStorage.setItem("di", data.di);
        localStorage.setItem("rl", data.rl);
        localStorage.setItem("asq", data.asq);
        break;
    }
  }
  if ((mtType === 1 && data.speakingState === false) || mtType === 6) {
    switch (data.category) {
      case "swt":
        localStorage.setItem("swt", data.swt);
        break;
      case "we":
        localStorage.setItem("swt", data.swt);
        localStorage.setItem("we", data.we);
        break;
      default:
        localStorage.setItem("swt", data.swt);
        localStorage.setItem("we", data.we);

        break;
    }

    localStorage.setItem("detailAnswer", data?.detailAnswer);
    localStorage.setItem("detailDuration", data?.detailDuration);
  }
  if ((mtType === 1 && data.writingState === false) || mtType === 4) {
    switch (data.category) {
      case "rsmc":
        localStorage.setItem("rsmc", data.rsmc);
        break;
      case "rmc":
        localStorage.setItem("rsmc", data.rsmc);
        localStorage.setItem("rmc", data.rmc);
        break;
      case "rop":
        localStorage.setItem("rsmc", data.rsmc);
        localStorage.setItem("rmc", data.rmc);
        localStorage.setItem("rop", data.rop);
        break;
      case "rfib":
        localStorage.setItem("rsmc", data.rsmc);
        localStorage.setItem("rmc", data.rmc);
        localStorage.setItem("rop", data.rop);
        localStorage.setItem("rfib", data.rfib);
        break;
      case "rwfib":
        localStorage.setItem("rsmc", data.rsmc);
        localStorage.setItem("rmc", data.rmc);
        localStorage.setItem("rop", data.rop);
        localStorage.setItem("rfib", data.rfib);
        localStorage.setItem("rwfib", data.rwfib);
        break;
      default:
        localStorage.setItem("rsmc", data.rsmc);
        localStorage.setItem("rmc", data.rmc);
        localStorage.setItem("rop", data.rop);
        localStorage.setItem("rfib", data.rfib);
        localStorage.setItem("rwfib", data.rwfib);

        break;
    }
  }
  if ((mtType === 1 && data.readingState === false) || mtType === 5) {
    switch (data.category) {
      case "sst":
        localStorage.setItem("sst", data.sst);
        break;
      case "mc":
        localStorage.setItem("sst", data.sst);
        localStorage.setItem("mc", data.mc);
        break;
      case "fib":
        localStorage.setItem("sst", data.sst);
        localStorage.setItem("mc", data.mc);
        localStorage.setItem("fib", data.fib);
        break;
      case "hcs":
        localStorage.setItem("sst", data.sst);
        localStorage.setItem("mc", data.mc);
        localStorage.setItem("fib", data.fib);
        localStorage.setItem("hcs", data.hcs);
        break;
      case "smc":
        localStorage.setItem("sst", data.sst);
        localStorage.setItem("mc", data.mc);
        localStorage.setItem("fib", data.fib);
        localStorage.setItem("hcs", data.hcs);
        localStorage.setItem("smc", data.smc);
        break;
      case "smw":
        localStorage.setItem("sst", data.sst);
        localStorage.setItem("mc", data.mc);
        localStorage.setItem("fib", data.fib);
        localStorage.setItem("hcs", data.hcs);
        localStorage.setItem("smc", data.smc);
        localStorage.setItem("smw", data.smw);
        break;
      case "hiw":
        localStorage.setItem("sst", data.sst);
        localStorage.setItem("mc", data.mc);
        localStorage.setItem("fib", data.fib);
        localStorage.setItem("hcs", data.hcs);
        localStorage.setItem("smc", data.smc);
        localStorage.setItem("smw", data.smw);
        localStorage.setItem("hiw", data.hiw);
        break;
      case "wfd":
        localStorage.setItem("sst", data.sst);
        localStorage.setItem("mc", data.mc);
        localStorage.setItem("fib", data.fib);
        localStorage.setItem("hcs", data.hcs);
        localStorage.setItem("smc", data.smc);
        localStorage.setItem("smw", data.smw);
        localStorage.setItem("hiw", data.hiw);
        localStorage.setItem("wfd", data.wfd);
        break;
      default:
        localStorage.setItem("sst", data.sst);
        localStorage.setItem("mc", data.mc);
        localStorage.setItem("fib", data.fib);
        localStorage.setItem("hcs", data.hcs);
        localStorage.setItem("smc", data.smc);
        localStorage.setItem("smw", data.smw);
        localStorage.setItem("hiw", data.hiw);
        localStorage.setItem("wfd", data.wfd);

        break;
    }

    // localStorage.setItem("detailAnswer", data?.detailAnswer);
    // localStorage.setItem("detailDuration", data?.detailDuration);
  }
  localStorage.setItem("saveCategory", data.category);
  localStorage.setItem("saveIndex", data.index);

  if (mtType == 1 || mtType == 3) {
    savedMtData.ra =
      data?.["ra"] != undefined ? data?.["ra"] : localStorage.getItem("ra");
    savedMtData.rs =
      data?.["rs"] != undefined ? data?.["rs"] : localStorage.getItem("rs");
    savedMtData.di =
      data?.["di"] != undefined ? data?.["di"] : localStorage.getItem("di");
    savedMtData.rl =
      data?.["rl"] != undefined ? data?.["rl"] : localStorage.getItem("rl");
    savedMtData.asq =
      data?.["asq"] != undefined ? data?.["asq"] : localStorage.getItem("asq");
  }
  if (mtType == 1 || mtType == 5) {
    savedMtData.sst =
      data?.["sst"] != undefined ? data?.["sst"] : localStorage.getItem("sst");
    savedMtData.mc =
      data?.["mc"] != undefined ? data?.["mc"] : localStorage.getItem("mc");
    savedMtData.fib =
      data?.["fib"] != undefined ? data?.["fib"] : localStorage.getItem("fib");
    savedMtData.hcs =
      data?.["hcs"] != undefined ? data?.["hcs"] : localStorage.getItem("hcs");
    savedMtData.smc =
      data?.["smc"] != undefined ? data?.["smc"] : localStorage.getItem("smc");
    savedMtData.smw =
      data?.["smw"] != undefined ? data?.["smw"] : localStorage.getItem("smw");
    savedMtData.hiw =
      data?.["hiw"] != undefined ? data?.["hiw"] : localStorage.getItem("hiw");
    savedMtData.wfd =
      data?.["wfd"] != undefined ? data?.["wfd"] : localStorage.getItem("wfd");
  }
  if (mtType == 1 || mtType == 6) {
    savedMtData.swt =
      data?.["swt"] != undefined ? data?.["swt"] : localStorage.getItem("swt");
    savedMtData.we =
      data?.["we"] != undefined ? data?.["we"] : localStorage.getItem("we");
  }

  if (mtType == 1 || mtType == 4) {
    savedMtData.rsmc =
      data?.["rsmc"] != undefined
        ? data?.["rsmc"]
        : localStorage.getItem("rsmc");
    savedMtData.rmc =
      data?.["rmc"] != undefined ? data?.["rmc"] : localStorage.getItem("rmc");
    savedMtData.rop =
      data?.["rop"] != undefined ? data?.["rop"] : localStorage.getItem("rop");
    savedMtData.rfib =
      data?.["rfib"] != undefined
        ? data?.["rfib"]
        : localStorage.getItem("rfib");
    savedMtData.rwfib =
      data?.["rwfib"] != undefined
        ? data?.["rwfib"]
        : localStorage.getItem("rwfib");
  }
  if (
    !raCheck ||
    !rsCheck ||
    !diCheck ||
    !rlCheck ||
    !asqCheck ||
    !swtCheck ||
    !weCheck ||
    !rsmcCheck ||
    !rmcCheck ||
    !ropCheck ||
    !rfibCheck ||
    !rwfibCheck ||
    !sstCheck ||
    !mcCheck ||
    !fibCheck ||
    !hcsCheck ||
    !smcCheck ||
    !smwCheck ||
    !hiwCheck ||
    !wfdCheck
  ) {
    setPause(true);
    swal({
      title: "Corrupt save file detected",
      text: "Please restart the current exam without continuing.Facts to prevent corrupt save file: avoid taking exam in parallel in multi tabs and also save & exit the exam in progress before starting next to prevent save file corruption. ",
      icon: "error",
      buttons: true,
      zIndex: 9999,
      preConfirm: () => {
        alert("preconfirm");
      },
    }).then((ok) => {
      if (ok) {
        window.location.href = "/mocktest/tabs";
      } else {
        window.location.reload();
      }
    });
  } else {
    setPause(false);
  }
  localStorage.setItem(
    userId + "saveMt" + data.mtId,
    JSON.stringify(savedMtData)
  );
  let returnData = {
    time: data.time,
    page: data.page,
    state: state,
  };

  return returnData;
};
